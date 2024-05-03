import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { launchRoutes } from "./routes/launch.routes";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { authenticationRoutes } from "./routes/authentication.routes";

declare module "fastify" {
  interface FastifyRequest {
    user: TokenPayload | undefined;
  }
}

export const client = new OAuth2Client();

const app: FastifyInstance = fastify({ logger: false });

export const authentication = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const token = req.headers.authorization?.replace(/^Bearer /, "");
    if (!token) return reply.status(401).send({ message: "Token is required" });

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.AUDIENCE,
    });

    const payload = ticket.getPayload();
    const timestamp = payload?.exp;
    const expirationDate = new Date(timestamp! * 1000);
    const now = new Date();

    if (expirationDate < now)
      return reply.status(401).send({ message: "Expired token" });

    req.user = payload;
  } catch (err) {
    reply.status(500).send(err);
  }
};

const PORT = 3333;

app.register(launchRoutes);
app.register(authenticationRoutes);

app.listen(
  {
    port: PORT,
  },
  () => console.log("Server is running in domain http://localhost:" + PORT),
);
