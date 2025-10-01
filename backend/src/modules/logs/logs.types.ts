import { z } from "zod";
import {
  logs_list_dto,
  logs_list_item_dto,
  logs_list_item_view_dto,
  logs_list_view_dto,
  setting_dto,
} from "./logs.schema";
import { Prisma } from "@prisma/client";

export type logs_list_query = z.infer<typeof logs_list_dto>;
export type logs_list_item = z.infer<typeof logs_list_item_dto>;
export type logs_setting_item = z.infer<typeof setting_dto>;
export type logs_list_item_view = z.infer<typeof logs_list_item_view_dto>;
export type logs_list_view = z.infer<typeof logs_list_view_dto>;
export interface logs_list_repo_input {
  where: Prisma.LogsWhereInput;
  order_by: Prisma.LogsOrderByWithRelationInput[];
  skip: number;
  take: number;
}
