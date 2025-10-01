import { z } from "zod";

const empty_to_undef = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(
    (v) => (v === "" || v == null ? undefined : v),
    schema.optional()
  );

export const user_list_dto = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    row_count: z.coerce.number().int().min(1).max(100).default(10),

    // 전체는 "all"로 옴
    search_type: z.enum(["all", "user_name", "user_email"]).default("all"),
    search_value: empty_to_undef(z.string().min(1)),

    start: empty_to_undef(z.string()),
    end: empty_to_undef(z.string()),

    // 실제 사용: 최신순 / 이미지카운트순
    sort: z.enum(["latest", "image_count"]).default("latest"),
  })
  .superRefine((v, ctx) => {
    if (v.search_type !== "all" && !v.search_value) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["search_value"],
        message: "search_type과 search_value는 함께 전달해야 합니다.",
      });
    }
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

export const user_list_item_dto = z.object({
  id: z.number(),
  created_at: z.date(),
  user_name: z.string(),
  user_email: z.string(),
  user_image_count: z.number(),
});

export const user_delete_dto = z.object({
  id: z.number(),
});
