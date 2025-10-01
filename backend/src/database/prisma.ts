import { PrismaClient } from "@prisma/client";
import { config } from "@/core/config";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: config.DB_URL, // zod로 검증된 DB_URL 사용
      },
    },
    // log: ["query", "info", "warn", "error"], // 로그 찍을때
    log: ["warn", "error"], // 로그 찍을때
  });

if (config.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
