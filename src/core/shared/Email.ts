import { ApiError } from "../../utils/ApiError";

export class Email {
  constructor(readonly value: string) {
    if (!value.includes("@"))
      throw new ApiError("email inválido", {
        statusCode: 400,
        title: "email",
      });
    const [, domain] = value.split("@");
    if (!domain.includes("."))
      throw new ApiError("email inválido", {
        statusCode: 400,
        title: "email",
      });
  }
}
