import type { RequestHandler } from "express";
import type { ZodTypeAny, TypeOf } from "zod";

type Schemas<
  B extends ZodTypeAny | undefined,
  P extends ZodTypeAny | undefined,
  Q extends ZodTypeAny | undefined,
  C extends ZodTypeAny | undefined,
> = {
  body?: B;
  params?: P;
  query?: Q;
  cookies?: C;
};

export function validateAll<
  B extends ZodTypeAny | undefined,
  P extends ZodTypeAny | undefined,
  Q extends ZodTypeAny | undefined,
  C extends ZodTypeAny | undefined,
>(schemas: Schemas<B, P, Q, C>): RequestHandler {
  return (req, res, next) => {
    // 1) 저장소 초기화
    req.validated ??= {};

    // 2) 액세서 주입: 컨트롤러에서 req.getValidated<T>("query") 사용
    req.getValidated = function <T>(
      key: "query" | "body" | "params" | "cookies"
    ) {
      return (req.validated?.[key] ?? undefined) as T;
    };

    // 3) 각 스키마 검증 및 저장
    if (schemas.body) {
      const r = schemas.body.safeParse(req.body);
      if (!r.success) return res.status(400).json(r.error.flatten());
      req.validated.body = r.data as B extends ZodTypeAny
        ? TypeOf<NonNullable<B>>
        : unknown;
    }

    if (schemas.params) {
      const r = schemas.params.safeParse(req.params);
      if (!r.success) return res.status(400).json(r.error.flatten());
      req.validated.params = r.data as P extends ZodTypeAny
        ? TypeOf<NonNullable<P>>
        : unknown;
    }

    if (schemas.query) {
      const r = schemas.query.safeParse(req.query);
      if (!r.success) return res.status(400).json(r.error.flatten());
      req.validated.query = r.data as Q extends ZodTypeAny
        ? TypeOf<NonNullable<Q>>
        : unknown;
    }

    if (schemas.cookies) {
      const r = schemas.cookies.safeParse(req.cookies);
      if (!r.success) return res.status(400).json(r.error.flatten());
      req.validated.cookies = r.data as C extends ZodTypeAny
        ? TypeOf<NonNullable<C>>
        : unknown;
    }

    next();
  };
}
