export class ApiError extends Error {
  status?: number;
  validationErrors?: Record<string, string[]>;

  constructor(message: string, status?: number, validationErrors?: Record<string, string[]>) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.validationErrors = validationErrors;
  }
}
