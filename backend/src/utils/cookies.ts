// src/utils/cookies.ts
import type { Response, Request, CookieOptions } from "express";
import { config } from "@/core/config";

export const COOKIE_KEYS = {
  ACCESS: "access_token",
  REFRESH: "refresh_token",
  USER_INFO: "user_info",
} as const;

const isProd = config.NODE_ENV === "production";
const accessTokenMaxAgeMs = (config.ACCESS_TTL_SEC ?? 60 * 60) * 1000;
const refreshTokenMaxAgeMs =
  (config.REFRESH_TTL_SEC ?? 60 * 60 * 24 * 7) * 1000;

/** 공통 쿠키 옵션 빌더 */
export function buildCookieOptions(opts?: {
  httpOnly?: boolean;
  maxAgeMs?: number;
  path?: string;
}): CookieOptions {
  return {
    httpOnly: opts?.httpOnly ?? true,
    secure: isProd,
    sameSite: (isProd ? "none" : "lax") as "none" | "lax",
    path: opts?.path ?? "/",
    ...(opts?.maxAgeMs ? { maxAge: opts.maxAgeMs } : {}),
  };
}

/** 액세스/리프레시 토큰 쿠키 세팅 (httpOnly) */
export function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken?: string
) {
  res.cookie(
    COOKIE_KEYS.ACCESS,
    accessToken,
    buildCookieOptions({ maxAgeMs: accessTokenMaxAgeMs })
  );

  if (refreshToken) {
    res.cookie(
      COOKIE_KEYS.REFRESH,
      refreshToken,
      buildCookieOptions({ maxAgeMs: refreshTokenMaxAgeMs })
    );
  }
}

/** 액세스/리프레시 토큰 쿠키 제거 */
export function clearAuthCookies(res: Response) {
  // clear 시에도 sameSite/secure/path 일치
  res.clearCookie(COOKIE_KEYS.ACCESS, buildCookieOptions());
  res.clearCookie(COOKIE_KEYS.REFRESH, buildCookieOptions());
}

/** user_info Base64 직렬화/역직렬화 */
export function encodeUserInfo<T extends object>(info: T): string {
  return Buffer.from(JSON.stringify(info), "utf8").toString("base64");
}
export function decodeUserInfo<T = unknown>(b64: string): T | null {
  try {
    const json = Buffer.from(b64, "base64").toString("utf8");
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

/** user_info 쿠키 세팅 */
export function setUserInfoCookie<T extends object>(res: Response, info: T) {
  res.cookie(
    COOKIE_KEYS.USER_INFO,
    encodeUserInfo(info),
    buildCookieOptions({ httpOnly: false, maxAgeMs: accessTokenMaxAgeMs })
  );
}

/** user_info 쿠키 제거 */
export function clearUserInfoCookie(res: Response) {
  res.clearCookie(
    COOKIE_KEYS.USER_INFO,
    buildCookieOptions({ httpOnly: false })
  );
}

/** UA/IP 추출 */
export function getClientMeta(req: Request) {
  const user_agent = req.get("user-agent") ?? null;
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ??
    req.ip ??
    null;
  return { user_agent, ip };
}
