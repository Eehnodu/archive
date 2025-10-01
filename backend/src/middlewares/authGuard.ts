import { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";
import { HttpError } from "../core/httpError";
import { UserRole } from "@prisma/client";

export const authGuard: RequestHandler = (req, res, next) => {
  try {
    const token = req.cookies?.access_token;
    if (!token)
      throw new HttpError(401, "UNAUTHORIZED", "액세스 토큰이 없습니다.");

    const payload = verifyToken(token);
    req.user = {
      id: Number(payload.sub),
      role: payload.role as UserRole,
      type: payload.type,
      iat: payload.iat,
      exp: payload.exp,
      jti: payload.jti,
    };
    next();
  } catch (err: any) {
    if (err?.name === "TokenExpiredError") {
      return next(
        new HttpError(401, "TOKEN_EXPIRED", "액세스 토큰이 만료되었습니다.")
      );
    }
    return next(
      new HttpError(401, "INVALID_TOKEN", "유효하지 않은 토큰입니다.")
    );
  }
};
