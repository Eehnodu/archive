import { COOKIE_KEYS } from "@/utils/cookies";
import { UserRole } from "@prisma/client";
import { z } from "zod";

export const login_dto = z.object({
  user_id: z.string().min(1, "아이디는 1자 이상"),
  user_password: z.string().min(1, "비밀번호는 1자 이상"),
});

export const logout_dto = z.object({
  user_id: z.number(),
  jti: z.string(),
});

export const refresh_dto = z.object({
  id: z.number(),
  role: z.string(),
  user_agent: z.string().nullable().optional(),
  ip: z.string().nullable().optional(),
});

export const token_dto = z.object({
  sub: z.string(), // 유저 ID
  role: z.enum(UserRole),
  type: z.enum(["access", "refresh"]), // 커스텀: 토큰 구분
  iat: z.number(), // 발급 시각 (자동)
  exp: z.number(), // 만료 시각 (자동)
  jti: z.string(), // 토큰 식별자
});

export const auth_cookie_dto = z.object({
  [COOKIE_KEYS.ACCESS]: z.string().min(1),
  [COOKIE_KEYS.REFRESH]: z.string().min(1),
});
