export type apiOk = { status: number; message: string };
export type apiError = { status: number; message: string };

export type userResponseRow = {
  id: number;
  created_at: string;
  user_name: string;
  user_email: string;
  user_image_count: number;
};

export type userListResponse = {
  data: userResponseRow[];
  total: number;
  totalPages: number;
  totalItems: number;
  currentPage: number;
};

export type logResponseRow = {
  id: number;
  created_at: string;
  user_name: string;
  upload_url: string;
  settings: setting_entity;
  create_url: string;
  upload_title: string;
  create_title: string;
};

export type logListResponse = {
  data: logResponseRow[];
  total: number;
  totalPages: number;
  totalItems: number;
  currentPage: number;
};

export type setting_entity = {
  location: string;
  sequence: string;
  camera: string;
  height: string;
  angle: string;
  fov: string;
};

export type media_item = {
  id: number;
  upload_url?: string;
  create_url?: string;
  create_title?: string;
  upload_title?: string;
};
