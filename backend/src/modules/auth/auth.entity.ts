import type { UserToken as PrismaUserToken } from "@prisma/client";

export type user_token_entity = PrismaUserToken;

export interface create_user_token_input {
  jti: string;
  token_hash: string;
  user_id: number;
  user_agent: string | null;
  ip: string | null;
  expires_at: Date;
}
