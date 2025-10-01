import { Router } from "express";
import { validateAll } from "@/middlewares/validateAll";
import {
  loginController,
  rotateRefreshTokenController,
  logoutController,
} from "./auth.controller";
import { auth_cookie_dto, login_dto } from "./auth.schema";
import { COOKIE_KEYS } from "@/utils/cookies";

const router = Router();

// POST /auth/login
router.post("/login", validateAll({ body: login_dto }), loginController);

// POST /auth/refresh
router.post(
  "/refresh",
  validateAll({
    cookies: auth_cookie_dto.pick({ [COOKIE_KEYS.REFRESH]: true }),
  }),
  rotateRefreshTokenController
);

// POST /auth/logout
router.post(
  "/logout",
  validateAll({
    cookies: auth_cookie_dto.pick({ [COOKIE_KEYS.REFRESH]: true }),
  }),
  logoutController
);

export default router;
