import { prisma } from "@/database/prisma";
import { logs_list_repo_input } from "./logs.types";
import { Logs } from "@prisma/client";

// 목록 조회: 레포는 DB 스키마 그대로 반환
export async function findLogsList(input: logs_list_repo_input): Promise<{
  rows: Array<
    Pick<
      Logs,
      | "id"
      | "created_at"
      | "user_name"
      | "location"
      | "sequence"
      | "camera"
      | "height"
      | "angle"
      | "fov"
      | "upload_url"
      | "create_url"
      | "upload_title"
      | "create_title"
    >
  >;
  total: number;
}> {
  const [rows, total] = await prisma.$transaction([
    prisma.logs.findMany({
      where: input.where,
      orderBy: input.order_by,
      skip: input.skip,
      take: input.take,
      select: {
        id: true,
        created_at: true,
        user_name: true,
        location: true,
        sequence: true,
        camera: true,
        height: true,
        angle: true,
        fov: true,
        upload_url: true,
        create_url: true,
        upload_title: true,
        create_title: true,
      },
    }),
    prisma.logs.count({ where: input.where }),
  ]);

  return { rows, total };
}
