import { z } from "zod";

const empty_to_undef = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(
    (v) => (v === "" || v == null ? undefined : v),
    schema.optional(),
  );

export const UserSettingsRequestDto = z.object({
  location: z.string(),
  sequence: z.string(),
  camera: z.string(),
  height: z.string(),
  angle: z.string(),
  fov: z.string(),
});

export const UserSettingResponseDto = z.object({
  location: z.string(),
  sequence: z.string(),
  camera: z.string(),
  height: z.string(),
  angle: z.string(),
  fov: z.string(),
});
