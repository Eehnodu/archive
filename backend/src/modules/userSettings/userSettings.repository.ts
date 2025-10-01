import { UserSetting } from "@prisma/client";
import { prisma } from "@/database/prisma";
import { user_settings_request } from "./userSettings.type";

import { Location, Sequence, Camera, Height, Angle, FOV } from "@prisma/client";

// Enums 매핑?
const locationMap: Record<string, Location> = {
  산업현장: Location.산업현장,
  건설현장: Location.건설현장,
  도심빌딩: Location.도심빌딩,
  무인매장: Location.무인매장,
};

const sequenceMap: Record<string, Sequence> = {
  사고: Sequence.사고,
  도난: Sequence.도난,
  쓰러짐: Sequence.쓰러짐,
};

const cameraMap: Record<string, Camera> = {
  RGB: Camera.RGB,
  IR: Camera.IR,
  Depth: Camera.Depth,
};

const heightMap: Record<string, Height> = {
  "3m 미만": Height.THREE_M,
  "3m~5m": Height.THREE_TO_FIVE_M,
  "5m 초과": Height.OVER_FIVE_M,
};

const angleMap: Record<string, Angle> = {
  "30º": Angle.DEG_30,
  "45º": Angle.DEG_45,
  "90º": Angle.DEG_90,
};

const fovMap: Record<string, FOV> = {
  UltraWide: FOV.Ultrawide,
  Wide: FOV.Wide,
  Linear: FOV.Linear,
};

export async function createUserSetting(
  input: user_settings_request,
): Promise<UserSetting | null> {
  return prisma.userSetting.upsert({
    where: { user_id: input.user_id },
    create: {
      user_id: input.user_id,
      location: locationMap[input.location],
      sequence: sequenceMap[input.sequence],
      camera: cameraMap[input.camera],
      height: heightMap[input.height],
      angle: angleMap[input.angle],
      fov: fovMap[input.fov],
    },
    update: {
      location: locationMap[input.location],
      sequence: sequenceMap[input.sequence],
      camera: cameraMap[input.camera],
      height: heightMap[input.height],
      angle: angleMap[input.angle],
      fov: fovMap[input.fov],
    },
  });
}

export async function findUserSettingByUserId(
  user_id: number,
): Promise<UserSetting | null> {
  return prisma.userSetting.findUnique({ where: { user_id } });
}
