import { Router } from "express";
import { validateAll } from "@/middlewares/validateAll";
import { UserSettingsDto } from "./userSettings.schema";
import { authGuard } from "@/middlewares/authGuard";
import { roleGuard } from "@/middlewares/roleGuard";
import { UserRole } from "@prisma/client";
import { userSettingSaveController, userSettingsSavedController } from "./userSettings.controller";

const router = Router();

router.post(
  "/saveSettings",
  // authGuard,
  // roleGuard(UserRole.USER),
  validateAll({ body: UserSettingsDto }),
  userSettingSaveController,
);

router.get(
  "/savedSettings",
  // authGuard,
  // roleGuard(UserRole.USER),
  userSettingsSavedController,
);

export default router;
