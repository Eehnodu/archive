import { findLogsList } from "./logs.repository";
import type { logs_list_query, logs_list_item_view } from "./logs.types";
import {
  location_label_from_enum,
  sequence_label_from_enum,
  camera_label_from_enum,
  height_label_from_enum,
  angle_label_from_enum,
  fov_label_from_enum,
} from "@/utils/enums-map";

type Order = "asc" | "desc";

export async function logsListService(query: logs_list_query) {
  const page = Math.max(1, query.page ?? 1);
  const take = Math.min(Math.max(query.row_count ?? 10, 1), 100);
  const skip = (page - 1) * take;

  const where: any = {};

  // search_type이 없으면 user_name으로만 검색 (요구사항)
  if (query.search_value) {
    where.user_name = {
      contains: query.search_value,
      mode: "insensitive" as const,
    };
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
    query.sort === "latest"
      ? [{ created_at: "desc" as Order }, { id: "desc" as Order }]
      : [{ user_name: "desc" as Order }, { id: "desc" as Order }];

  const { rows, total } = await findLogsList({ where, order_by, skip, take });

  const data: logs_list_item_view[] = rows.map((r) => ({
    id: r.id,
    created_at: r.created_at,
    user_name: r.user_name,
    upload_url: r.upload_url,
    create_url: r.create_url,
    upload_title: r.upload_title,
    create_title: r.create_title,
    settings: {
      location: location_label_from_enum[r.location],
      sequence: sequence_label_from_enum[r.sequence],
      camera: camera_label_from_enum[r.camera],
      height: height_label_from_enum[r.height],
      angle: angle_label_from_enum[r.angle],
      fov: fov_label_from_enum[r.fov],
    },
  }));

  const totalPages = Math.max(1, Math.ceil(total / take));
  return { data, total, totalPages, page, pageSize: take };
}
