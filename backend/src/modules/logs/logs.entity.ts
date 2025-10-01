import {
  Angle,
  Camera,
  FOV,
  Height,
  Location,
  Logs as PrismaLogs,
  Sequence,
} from "@prisma/client";

export type logs_entity = PrismaLogs;

export interface setting_entity {
  location: Location;
  sequence: Sequence;
  camera: Camera;
  height: Height;
  angle: Angle;
  fov: FOV;
}

export interface logs_item_entity {
  id: number;
  created_at: Date;
  user_name: string;
  upload_url: string;
  create_url: string;
  setting: setting_entity;
}
