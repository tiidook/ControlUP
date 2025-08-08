export const ErrorCode = {
  INTERNAL_ERROR: 500,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
};

export class ApiError extends Error {
  constructor(code = ErrorCode.INTERNAL_ERROR, message) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}