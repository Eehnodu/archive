import { RequestHandler } from "express";
import { HttpError } from "../core/httpError";
import { UserRole } from "@prisma/client";

export function roleGuard(...roles: UserRole[]): RequestHandler {
  return (req, _res, next) => {
    const role = req.user?.role;
    if (!role) {
      return next(new HttpError(401, "UNAUTHORIZED", "로그인이 필요합니다."));
    }
    if (!roles.includes(role)) {
      return next(new HttpError(403, "FORBIDDEN", "권한이 없습니다."));
    }
    next();
  };
}
