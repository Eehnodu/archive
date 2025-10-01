import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} from "@/core/httpError";
import { findUserByUserId } from "@/modules/users/users.repository";
import { comparePassword } from "@/utils/crypto";
import { signAccessToken, signRefreshToken, decodeToken } from "@/utils/jwt";
import {
  createUserToken,
  findUserTokenByJti,
  revokeAllTokensByUserId,
} from "./auth.repository";
import { config } from "@/core/config";
import { sha256 } from "@/utils/crypto";
import { token_dto } from "./auth.schema";
import {
  login_input,
  logout_input,
  refresh_input,
  token_parsed,
  login_ctx,
} from "./auth.types";
import { logger } from "@/core/logger";

// 리프레시 토큰 파싱/검증
function parseAndValidateRefresh(refresh_token: string): token_parsed {
  if (!refresh_token) throw new UnauthorizedError("No refresh token");
  const decoded = decodeToken<unknown>(refresh_token);
  const parsed = token_dto.safeParse(decoded);
  if (!parsed.success || parsed.data.type !== "refresh") {
    throw new UnauthorizedError("Invalid refresh token");
  }
  logger.info(`Parsed: ${parsed}`);
  return parsed.data;
}

// 로그인
export async function loginService(input: login_input, ctx: login_ctx = {}) {
  const user = await findUserByUserId(input.user_id);
  logger.info(`User found: ${user?.user_name}`);
  if (!user) throw new NotFoundError("User not found");

  const ok = await comparePassword(input.user_password, user.user_password);
  logger.info(`Password compared: ${ok}`);
  if (!ok) throw new UnauthorizedError("Password is incorrect");

  const tokens = await createTokens({
    id: user.id,
    role: user.user_role,
    user_agent: ctx.user_agent ?? null,
    ip: ctx.ip ?? null,
  });
  logger.info(`Tokens created: ${tokens}`);
  return { user_id: user.id, role: user.user_role, ...tokens };
}

// 토큰 생성
async function createTokens(input: refresh_input) {
  const { id, role, user_agent, ip } = input;

  const payload = { sub: String(id), role };
  const access_token = signAccessToken(payload);
  const refresh_token = signRefreshToken(payload);

  const decoded = decodeToken<{ jti: string }>(refresh_token);
  logger.info(`Decoded: ${decoded}`);
  if (!decoded?.jti) throw new InternalServerError("Token creation failed");

  const refreshExpiresAt = new Date(Date.now() + config.REFRESH_TTL_SEC * 1000);
  await createUserToken({
    jti: decoded.jti,
    token_hash: sha256(refresh_token),
    user_id: id,
    user_agent: user_agent ?? null,
    ip: ip ?? null,
    expires_at: refreshExpiresAt,
  });
  logger.info(`User token created: ${decoded.jti}`);
  return {
    access_token,
    refresh_token,
    refreshJti: decoded.jti,
    refreshExpiresAt,
  };
}

// 리프레시 토큰 갱신
export async function rotateRefreshTokenService(refresh_token: string) {
  const parsed = parseAndValidateRefresh(refresh_token);
  const userToken = await findUserTokenByJti(parsed.jti);
  logger.info(`User token found: ${userToken}`);
  if (!userToken) throw new UnauthorizedError("refresh token not found");
  if (userToken.revoked)
    throw new UnauthorizedError("refresh token is revoked");
  if (userToken.expires_at <= new Date())
    throw new UnauthorizedError("refresh token is expired");
  if (sha256(refresh_token) !== userToken.token_hash)
    throw new UnauthorizedError("refresh token hash mismatch");
  const tokens = await createTokens({
    id: Number(parsed.sub),
    role: parsed.role,
  });
  logger.info(`Tokens created: ${tokens}`);
  await revokeAllTokensByUserId(Number(parsed.sub));

  return { user_id: Number(parsed.sub), role: parsed.role, ...tokens };
}

// 리프레시 토큰 로그아웃
export async function logoutWithRefreshService(refresh_token: string) {
  const parsed = parseAndValidateRefresh(refresh_token);
  logger.info(`Parsed: ${parsed}`);
  await logoutService({ jti: parsed.jti, user_id: Number(parsed.sub) });
  return { message: "Logout successful" };
}

// 로그아웃
export async function logoutService(input: logout_input) {
  const { jti, user_id } = input;
  if (!jti || !user_id) throw new BadRequestError("Invalid token payload");
  await revokeAllTokensByUserId(user_id);
  logger.info(`Logout successful: ${jti}`);
  return { message: "Logout successful" };
}
