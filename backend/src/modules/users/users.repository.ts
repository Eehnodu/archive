import { User } from "@prisma/client";
import { prisma } from "@/database/prisma";
import { user_list_repo_input } from "./users.types";

// 단건 조회
export async function findUserById(id: number): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

export async function findUserByUserId(user_id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { user_id } });
}

// 목록 조회: 레포는 DB 스키마 그대로 반환
export async function findUserList(input: user_list_repo_input): Promise<{
  rows: Array<
    Pick<User, "id" | "created_at" | "user_name" | "user_email" | "image_count">
  >;
  total: number;
}> {
  const [rows, total] = await prisma.$transaction([
    prisma.user.findMany({
      where: input.where,
      orderBy: input.order_by,
      skip: input.skip,
      take: input.take,
      select: {
        id: true,
        created_at: true,
        user_name: true,
        user_email: true,
        image_count: true,
      },
    }),
    prisma.user.count({ where: input.where }),
  ]);

  return { rows, total };
}

export async function deleteUserById(id: number) {
  await prisma.user.delete({ where: { id } });
}
