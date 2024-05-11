import { FastifyReply } from "fastify";
import { ApiError } from "./ApiError";

export const responseError = (response: FastifyReply, err: ApiError) => {
  const statusCode = err.statusCode ?? 500;
  return response.status(statusCode).send({
    message: err.message || "Unexpected error.",
    statusCode,
    type: err.name,
    error: true,
  });
};
