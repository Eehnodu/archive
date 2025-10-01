// src/modules/users/users.types.ts
import type { z } from "zod";
import {
  user_delete_dto,
  user_list_dto,
  user_list_item_dto,
} from "./users.schema";
import { Prisma } from "@prisma/client";

export type user_list_query = z.infer<typeof user_list_dto>;
export type user_list_item = z.infer<typeof user_list_item_dto>;
export type user_delete_input = z.infer<typeof user_delete_dto>;
export interface user_list_repo_input {
  where: Prisma.UserWhereInput;
  order_by: Prisma.UserOrderByWithRelationInput[];
  skip: number;
  take: number;
}
