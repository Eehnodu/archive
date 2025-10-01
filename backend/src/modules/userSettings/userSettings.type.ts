// src/modules/userSettings/userSettings.types.ts
import type { z } from "zod";
import { UserSettingResponseDto, UserSettingsRequestDto } from "./userSettings.schema";

export type user_settings_request = z.infer<typeof UserSettingsRequestDto>;
export type user_settings_response = z.infer<typeof UserSettingResponseDto>;
