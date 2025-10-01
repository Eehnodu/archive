import { Router } from "express";
import { validateAll } from "@/middlewares/validateAll";
import { logsListController } from "./logs.controller";
import { logs_list_dto } from "./logs.schema";
import { authGuard } from "@/middlewares/authGuard";
import { roleGuard } from "@/middlewares/roleGuard";
import { UserRole } from "@prisma/client";

const router = Router();

// get /logs/logList
router.get(
  "/logsList",
  authGuard,
  roleGuard(UserRole.ADMIN),
  validateAll({ query: logs_list_dto }),
  logsListController
);

export default router;
