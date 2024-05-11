import { FastifyInstance } from "fastify";
import { handleGoogleLogin } from "../../core/authentication/controllers/login";
import { handleLogout } from "../../core/authentication/controllers/logout";
import { handleRefreshToken } from "../../core/authentication/controllers/refreshToken";
import { refreshTokenBodySchema } from "./schemas/refreshToken.schema";
import { googleLoginBodySchema } from "./schemas/googleLogin.schema";

export async function authenticationRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/login/google",
    { schema: { body: googleLoginBodySchema } },
    handleGoogleLogin,
  );
  fastify.post("/logout", handleLogout);
  fastify.post(
    "/refreshToken",
    { schema: { body: refreshTokenBodySchema } },
    handleRefreshToken,
  );
}
