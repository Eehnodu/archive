import { prisma } from "@/database/prisma";
import { create_user_token_input, user_token_entity } from "./auth.entity";

// JTI로 단건 조회
export async function findUserTokenByJti(
  jti: string
): Promise<user_token_entity | null> {
  return prisma.userToken.findUnique({ where: { jti } });
}

// 유저의 모든 활성 토큰 revoke (전체 로그아웃 등)
export async function revokeAllTokensByUserId(user_id: number): Promise<void> {
  await prisma.userToken.updateMany({
    where: { user_id, revoked: false },
    data: { revoked: true },
  });
}

// 토큰 생성
export async function createUserToken(
  data: create_user_token_input
): Promise<user_token_entity> {
  return prisma.userToken.create({
    data: {
      jti: data.jti,
      token_hash: data.token_hash,
      user_id: data.user_id,
      user_agent: data.user_agent ?? null,
      ip: data.ip ?? null,
      expires_at: data.expires_at,
    },
  });
}
