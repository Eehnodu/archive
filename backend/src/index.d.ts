import "express-serve-static-core";
import { UserRole } from "@prisma/client";

declare module "express-serve-static-core" {
  interface Request {
    validated?: {
      body?: unknown;
      params?: unknown;
      query?: unknown;
      cookies?: unknown;
    };
    getValidated: <T>(key: "query" | "body" | "params" | "cookies") => T;

    user?: {
      id: number;
      role: UserRole;
      type: "access" | "refresh";
      iat: number;
      exp: number;
      jti: string;
    };
  }
}
