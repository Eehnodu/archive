import { z } from "zod";
import { Location, Sequence, Camera, Height, Angle, FOV } from "@prisma/client";
import {
  location_label_from_enum,
  sequence_label_from_enum,
  camera_label_from_enum,
  height_label_from_enum,
  angle_label_from_enum,
  fov_label_from_enum,
} from "@/utils/enums-map";

const empty_to_undef = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(
    (v) => (v === "" || v == null ? undefined : v),
    schema.optional()
  );

export const logs_list_dto = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    row_count: z.coerce.number().int().min(1).max(100).default(10),

    search_value: empty_to_undef(z.string().min(1)),

    start: empty_to_undef(z.string()),
    end: empty_to_undef(z.string()),

    sort: z.enum(["latest", "name"]).default("latest"),
  })
  .superRefine((v, ctx) => {
    if (v.start && v.end) {
      const s = new Date(v.start).getTime();
      const e = new Date(v.end).getTime();
      if (!Number.isFinite(s) || !Number.isFinite(e) || s > e) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["end"],
          message: "날짜 범위가 올바르지 않습니다.",
        });
      }
    }
  });

const location_list = Object.values(Location) as [Location, ...Location[]];
const sequence_list = Object.values(Sequence) as [Sequence, ...Sequence[]];
const camera_list = Object.values(Camera) as [Camera, ...Camera[]];
const height_list = Object.values(Height) as [Height, ...Height[]];
const angle_list = Object.values(Angle) as [Angle, ...Angle[]];
const fov_list = Object.values(FOV) as [FOV, ...FOV[]];

export const setting_dto = z.object({
  location: z.enum(location_list),
  sequence: z.enum(sequence_list),
  camera: z.enum(camera_list),
  height: z.enum(height_list),
  angle: z.enum(angle_list),
  fov: z.enum(fov_list),
});

export const logs_list_item_dto = z.object({
  id: z.number(),
  created_at: z.date(),
  user_name: z.string(),
  upload_url: z.string(),
  settings: setting_dto,
  create_url: z.string(),
  upload_title: z.string(),
  create_title: z.string(),
});

// 응답용(라벨 문자열)
export const setting_view_dto = z.object({
  location: z.enum(location_label_from_enum),
  sequence: z.enum(sequence_label_from_enum),
  camera: z.enum(camera_label_from_enum),
  height: z.enum(height_label_from_enum),
  angle: z.enum(angle_label_from_enum),
  fov: z.enum(fov_label_from_enum),
});

export const logs_list_item_view_dto = z.object({
  id: z.number(),
  created_at: z.preprocess(
    (v) => (v instanceof Date ? v : new Date(String(v))),
    z.date()
  ),
  user_name: z.string(),
  upload_url: z.string(),
  create_url: z.string(),
  upload_title: z.string(),
  create_title: z.string(),
  settings: setting_view_dto,
});

// 목록 응답 전체 스키마(선택)
export const logs_list_view_dto = z.object({
  data: z.array(logs_list_item_view_dto),
  total: z.number(),
  totalPages: z.number(),
  page: z.number(),
  pageSize: z.number(),
});
