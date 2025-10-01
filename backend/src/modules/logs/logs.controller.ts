// src/modules/users/users.controller.ts
import { Request, Response, NextFunction } from "express";
import { logsListService } from "./logs.service";
import { logs_list_query } from "./logs.types";

export async function logsListController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const q = req.getValidated<logs_list_query>("query");
    const result = await logsListService(q);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
