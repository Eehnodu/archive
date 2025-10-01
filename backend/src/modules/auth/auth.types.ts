import type { z } from "zod";
import { login_dto, logout_dto, refresh_dto, token_dto } from "./auth.schema";

export type login_input = z.infer<typeof login_dto>;
export type logout_input = z.infer<typeof logout_dto>;
export type refresh_input = z.infer<typeof refresh_dto>;
export type token_parsed = z.infer<typeof token_dto>;

export interface login_ctx {
  user_agent?: string | null;
  ip?: string | null;
}
