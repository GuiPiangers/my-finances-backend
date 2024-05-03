import { FastifyInstance } from "fastify";
import { handleGoogleLogin } from "../core/authentication/controllers";

export async function authenticationRoutes(fastify: FastifyInstance) {
  fastify.post("/login", handleGoogleLogin);
}
