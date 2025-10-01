// src/modules/users/users.controller.ts
import { Request, Response, NextFunction } from "express";
import { userListService, userDeleteService } from "./users.service";
import { user_delete_input, user_list_query } from "./users.types";

export async function userListController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const q = req.getValidated<user_list_query>("query");
    const result = await userListService(q);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function userDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const b = req.getValidated<user_delete_input>("body");
    await userDeleteService(b);
    return res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
}
