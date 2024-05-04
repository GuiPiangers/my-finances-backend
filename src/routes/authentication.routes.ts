import { FastifyInstance } from "fastify";
import { handleGoogleLogin } from "../core/authentication/controllers/login";

export async function authenticationRoutes(fastify: FastifyInstance) {
  fastify.post("/google", handleGoogleLogin);
}
