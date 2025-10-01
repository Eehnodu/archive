import { Height, Angle, Sequence, Location, FOV, Camera } from "@prisma/client";

const HEIGHT_LABELS = ["3m", "3m~5m", "5m 초과"] as const;
type HeightLabel = (typeof HEIGHT_LABELS)[number];

const ANGLE_LABELS = ["30º", "45º", "90º"] as const;
type AngleLabel = (typeof ANGLE_LABELS)[number];

const LOCATION_LABELS = [
  "산업현장",
  "건설현장",
  "도심빌딩",
  "무인매장",
] as const;
type LocationLabel = (typeof LOCATION_LABELS)[number];

const SEQUENCE_LABELS = ["사고", "도난", "쓰러짐"] as const;
type SequenceLabel = (typeof SEQUENCE_LABELS)[number];

const CAMERA_LABELS = ["RGB", "IR", "Depth"] as const;
type CameraLabel = (typeof CAMERA_LABELS)[number];

const FOV_LABELS = ["Ultrawide", "Wide", "Linear"] as const;
type FovLabel = (typeof FOV_LABELS)[number];

// ✅ Enum -> 라벨
export const location_label_from_enum = {
  [Location.산업현장]: "산업현장",
  [Location.건설현장]: "건설현장",
  [Location.도심빌딩]: "도심빌딩",
  [Location.무인매장]: "무인매장",
} as const satisfies Record<Location, LocationLabel>;

export const sequence_label_from_enum = {
  [Sequence.사고]: "사고",
  [Sequence.도난]: "도난",
  [Sequence.쓰러짐]: "쓰러짐",
} as const satisfies Record<Sequence, SequenceLabel>;

export const camera_label_from_enum = {
  [Camera.RGB]: "RGB",
  [Camera.IR]: "IR",
  [Camera.Depth]: "Depth",
} as const satisfies Record<Camera, CameraLabel>;

export const height_label_from_enum = {
  [Height.THREE_M]: "3m",
  [Height.THREE_TO_FIVE_M]: "3m~5m",
  [Height.OVER_FIVE_M]: "5m 초과",
} as const satisfies Record<Height, HeightLabel>;

export const angle_label_from_enum = {
  [Angle.DEG_30]: "30º",
  [Angle.DEG_45]: "45º",
  [Angle.DEG_90]: "90º",
} as const satisfies Record<Angle, AngleLabel>;

export const fov_label_from_enum = {
  [FOV.Ultrawide]: "Ultrawide",
  [FOV.Wide]: "Wide",
  [FOV.Linear]: "Linear",
} as const satisfies Record<FOV, FovLabel>;
