import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import authRouter from "./modules/auth/auth.router";
import usersRouter from "./modules/users/users.router";
import userSettingsRouter from "./modules/userSettings/userSettings.router";
import logsRouter from "./modules/logs/logs.router";

export const createApp = () => {
  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      origin: ["http://localhost:3000", "https://your-frontend.example"], // 프론트 도메인
      credentials: true, // 쿠키 포함 허용
    })
  );
  app.use(express.json());
  // health
  app.get("/health", (_req, res) => res.json({ ok: true }));
  // modules
  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/logs", logsRouter);
  app.use("/api/userSettings", userSettingsRouter);
  // common middlewares
  app.use(errorHandler);

  return app;
};
