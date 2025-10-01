// src/utils/validated.ts
import type { Response } from "express";

export function getValidated<T>(
  res: Response,
  key: "query" | "body" | "params" | "cookies"
) {
  return res.locals.validated?.[key] as T;
}
