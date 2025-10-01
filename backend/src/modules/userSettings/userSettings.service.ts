import { NotFoundError } from "@/core/httpError";
import { logger } from "@/core/logger";
import { findUserById } from "../users/users.repository";
import {
  user_settings_request,
  user_settings_response,
} from "./userSettings.type";
import {
  createUserSetting,
  findUserSettingByUserId,
} from "./userSettings.repository";

export async function userSettingSaveService(
  input: user_settings_request,
  user_id: number,
) {
  const user = await findUserById(user_id);
  logger.info(`User found: ${user?.user_name}`);
  if (!user) throw new NotFoundError("User not found");
  return await createUserSetting(input);
}

export async function userSettingSavedService(
  user_id: number,
): Promise<user_settings_response | null> {
  const user = await findUserById(user_id);
  logger.info(`User found: ${user?.user_name}`);
  if (!user) throw new NotFoundError("User not found");
  const settings = await findUserSettingByUserId(user_id);

  if (!settings) {
    return null; 
  }

  // DTO 형태로 매핑
  return {
    location: settings.location,
    sequence: settings.sequence,
    camera: settings.camera,
    height: settings.height,
    angle: settings.angle,
    fov: settings.fov,
  };
}
