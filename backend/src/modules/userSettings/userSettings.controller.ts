// src/modules/userSettings/userSettings.controller.ts
import { Request, Response, NextFunction } from "express";
import { user_settings_request } from "./userSettings.type";
import {
  userSettingSavedService,
  userSettingSaveService,
} from "./userSettings.service";
import { HttpError } from "@/core/httpError";

export async function userSettingSaveController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const q = req.getValidated<user_settings_request>("body");
    // const user_id = req.user?.id;
    // if (!user_id)
    //   throw new HttpError(401, "UNAUTHORIZED", "유효하지 않은 사용자입니다.");

    const user_id = 1;
    const result = await userSettingSaveService(q, user_id);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function userSettingsSavedController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // const user_id = req.user?.id;
    // if (!user_id)
    //   throw new HttpError(401, "UNAUTHORIZED", "유효하지 않은 사용자입니다.");

    const user_id = 1;
    const result = await userSettingSavedService(user_id);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
