// src/modules/auth/auth.controller.ts
import { Request, Response, NextFunction } from "express";
import {
  loginService,
  rotateRefreshTokenService,
  logoutWithRefreshService,
} from "./auth.service";
import { getClientMeta } from "@/utils/cookies";
import {
  COOKIE_KEYS,
  setAuthCookies,
  clearAuthCookies,
  setUserInfoCookie,
  clearUserInfoCookie,
} from "@/utils/cookies";
import { login_input } from "./auth.types";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user_agent, ip } = getClientMeta(req);
    const result = await loginService(req.getValidated<login_input>("body"), {
      user_agent,
      ip,
    });

    setAuthCookies(res, result.access_token, result.refresh_token);
    setUserInfoCookie(res, { id: result.user_id, role: result.role });

    return res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
}

export async function rotateRefreshTokenController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const refresh_token = req.cookies?.[COOKIE_KEYS.REFRESH] ?? "";
    const tokens = await rotateRefreshTokenService(refresh_token);

    setAuthCookies(res, tokens.access_token, tokens.refresh_token);
    setUserInfoCookie(res, { id: tokens.user_id, role: tokens.role });

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ success: true });
  } catch (err: any) {
    if (err?.status === 401 || err?.status === 403) {
      clearAuthCookies(res);
    }
    next(err);
  }
}

export async function logoutController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const refresh_token = req.cookies?.[COOKIE_KEYS.REFRESH] ?? "";
    await logoutWithRefreshService(refresh_token);

    clearAuthCookies(res);
    clearUserInfoCookie(res);
    return res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
}
