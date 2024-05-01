export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly type: string | undefined;

  constructor(
    message: string,
    config?: { statusCode?: number; title?: string },
  ) {
    super(message);
    this.statusCode = config?.statusCode || 400;
    this.type = config?.title;
  }
}
