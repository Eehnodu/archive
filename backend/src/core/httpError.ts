export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string // 에러 식별용 코드 (선택)
  ) {
    super(message);
    this.name = new.target.name;
  }
}

// 4xx Client Errors
export class BadRequestError extends HttpError {
  constructor(msg = "Bad Request", code = "BAD_REQUEST") {
    super(400, msg, code);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(msg = "Unauthorized", code = "UNAUTHORIZED") {
    super(401, msg, code);
  }
}

export class ForbiddenError extends HttpError {
  constructor(msg = "Forbidden", code = "FORBIDDEN") {
    super(403, msg, code);
  }
}

export class NotFoundError extends HttpError {
  constructor(msg = "Not Found", code = "NOT_FOUND") {
    super(404, msg, code);
  }
}

export class MethodNotAllowedError extends HttpError {
  constructor(msg = "Method Not Allowed", code = "METHOD_NOT_ALLOWED") {
    super(405, msg, code);
  }
}

export class ConflictError extends HttpError {
  constructor(msg = "Conflict", code = "CONFLICT") {
    super(409, msg, code);
  }
}

export class GoneError extends HttpError {
  constructor(msg = "Gone", code = "GONE") {
    super(410, msg, code);
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(msg = "Unprocessable Entity", code = "UNPROCESSABLE_ENTITY") {
    super(422, msg, code);
  }
}

// 5xx Server Errors
export class InternalServerError extends HttpError {
  constructor(msg = "Internal Server Error", code = "INTERNAL_SERVER_ERROR") {
    super(500, msg, code);
  }
}

export class NotImplementedError extends HttpError {
  constructor(msg = "Not Implemented", code = "NOT_IMPLEMENTED") {
    super(501, msg, code);
  }
}

export class BadGatewayError extends HttpError {
  constructor(msg = "Bad Gateway", code = "BAD_GATEWAY") {
    super(502, msg, code);
  }
}

export class ServiceUnavailableError extends HttpError {
  constructor(msg = "Service Unavailable", code = "SERVICE_UNAVAILABLE") {
    super(503, msg, code);
  }
}

export class GatewayTimeoutError extends HttpError {
  constructor(msg = "Gateway Timeout", code = "GATEWAY_TIMEOUT") {
    super(504, msg, code);
  }
}
