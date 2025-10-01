// src/core/config.ts
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config(); // dotenv-expand 없이, 치환은 안 쓴다

const Base = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(8000),

  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().default(3306),
  DB_NAME: z.string(),

  JWT_SECRET: z.string(),
  ACCESS_TTL_SEC: z.coerce.number().default(3600),
  REFRESH_TTL_SEC: z.coerce.number().default(604800),
});

const base = Base.parse(process.env);

const DB_URL = `mysql://${encodeURIComponent(base.DB_USER)}:${encodeURIComponent(
  base.DB_PASS
)}@${base.DB_HOST}:${base.DB_PORT}/${base.DB_NAME}`;

const Final = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  PORT: z.number(),
  DB_URL: z.string().url(),

  JWT_SECRET: z.string(),
  ACCESS_TTL_SEC: z.coerce.number(),
  REFRESH_TTL_SEC: z.coerce.number(),
});

export const config = Final.parse({
  NODE_ENV: base.NODE_ENV,
  PORT: base.PORT,
  DB_URL,
  JWT_SECRET: base.JWT_SECRET,
  ACCESS_TTL_SEC: base.ACCESS_TTL_SEC,
  REFRESH_TTL_SEC: base.REFRESH_TTL_SEC,
});
