import { Request, Response, NextFunction } from "express";
import { HttpError } from "../core/httpError";

const isProduction = process.env.NODE_ENV === "production";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const isHttpError = err instanceof HttpError;
  const status = isHttpError ? err.status : 500;
  const message = err instanceof Error ? err.message : "Internal Server Error";
  const code = isHttpError ? err.code : "INTERNAL_SERVER_ERROR";

  console.error("[ERROR HANDLER]", err);

  res.status(status).json({
    status, // 에러 상태 코드 (예: 404, 500)
    code, // 에러 식별 코드 (예: NOT_FOUND, INTERNAL_SERVER_ERROR)
    error: message, // 에러 메시지 (사람이 읽을 수 있는 설명)
    stack: isProduction
      ? undefined
      : err instanceof Error
        ? err.stack
        : undefined,
    // 에러가 발생한 위치와 호출 경로(콜스택). 디버깅용, 운영환경에서는 노출하지 않음
  });
}
