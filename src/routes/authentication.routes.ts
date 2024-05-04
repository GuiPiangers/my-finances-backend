import { FastifyInstance } from "fastify";
import { handleGoogleLogin } from "../core/authentication/controllers/login";
import { handleLogout } from "../core/authentication/controllers/logout";
import { handleRefreshToken } from "../core/authentication/controllers/refreshToken";

export async function authenticationRoutes(fastify: FastifyInstance) {
  fastify.post("/login/google", handleGoogleLogin);
  fastify.post("/logout", handleLogout);
  fastify.post("/refreshToken", handleRefreshToken);
}
