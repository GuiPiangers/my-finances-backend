export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly name: string;

  constructor(
    message: string,
    config?: { statusCode?: number; title?: string },
  ) {
    super(message);
    this.statusCode = config?.statusCode || 400;
    this.name = config?.title || "Error";
  }
}
