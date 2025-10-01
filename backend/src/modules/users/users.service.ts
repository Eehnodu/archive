import { NotFoundError } from "@/core/httpError";
import { findUserList, deleteUserById, findUserById } from "./users.repository";
import type {
  user_list_query,
  user_list_item,
  user_delete_input,
} from "./users.types";
import { logger } from "@/core/logger";

type Order = "asc" | "desc";

export async function userListService(query: user_list_query) {
  const page = Math.max(1, query.page ?? 1);
  const take = Math.min(query.row_count ?? 10, 100);
  const skip = (page - 1) * take;

  const where: any = {};
  if (query.search_type !== "all" && query.search_value) {
    const key = query.search_type === "user_name" ? "user_name" : "user_email";
    where[key] = { contains: query.search_value };
  }
  if (query.start || query.end) {
    const range: any = {};
    if (query.start) range.gte = new Date(query.start);
    if (query.end) {
      const end = new Date(query.end);
      end.setHours(23, 59, 59, 999);
      range.lte = end;
    }
    where.created_at = range;
  }

  const order_by =
    query.sort === "image_count"
      ? [{ image_count: "desc" as Order }, { id: "desc" as Order }]
      : [{ created_at: "desc" as Order }, { id: "desc" as Order }];

  const { rows, total } = await findUserList({ where, order_by, skip, take });

  const data: user_list_item[] = rows.map((r) => ({
    id: r.id,
    created_at: r.created_at,
    user_name: r.user_name,
    user_email: r.user_email,
    user_image_count: r.image_count,
  }));

  const totalPages = Math.max(1, Math.ceil(total / take));
  return { data, total, totalPages, page, pageSize: take };
}

export async function userDeleteService(input: user_delete_input) {
  const user = await findUserById(input.id);
  logger.info(`User found: ${user?.user_name}`);
  if (!user) throw new NotFoundError("User not found");
  await deleteUserById(input.id);
  logger.info(`User deleted: ${input.id}`);
}
