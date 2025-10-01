// src/utils/jwt.ts
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { config } from "@/core/config";
import { token_parsed } from "@/modules/auth/auth.types";

const accessTokenTTL = config.ACCESS_TTL_SEC; // 초 단위
const refreshTokenTTL = config.REFRESH_TTL_SEC;

export function signAccessToken(payload: object) {
  return jwt.sign({ ...payload, type: "access" }, config.JWT_SECRET, {
    expiresIn: accessTokenTTL,
    jwtid: randomUUID(),
  });
}

export function signRefreshToken(payload: object) {
  return jwt.sign({ ...payload, type: "refresh" }, config.JWT_SECRET, {
    expiresIn: refreshTokenTTL,
    jwtid: randomUUID(),
  });
}

export function verifyToken<T = token_parsed>(token: string): T {
  return jwt.verify(token, config.JWT_SECRET) as T;
}

export function decodeToken<T = token_parsed>(token: string): T | null {
  return jwt.decode(token) as T | null;
}
