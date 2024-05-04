import fastify, { FastifyInstance } from "fastify";

import { launchRoutes } from "./routes/launch.routes";
import { OAuth2Client } from "google-auth-library";
import { authenticationRoutes } from "./routes/authentication.routes";
import { JwtPayload } from "./repository/token/ITokenProvider";

declare module "fastify" {
  interface FastifyRequest {
    user: JwtPayload | undefined;
  }
}
export const client = new OAuth2Client();

const app: FastifyInstance = fastify({ logger: false });

const PORT = 3333;

app.register(launchRoutes, { prefix: "launch" });
app.register(authenticationRoutes);

app.listen(
  {
    port: PORT,
  },
  () => console.log("Server is running in domain http://localhost:" + PORT),
);
