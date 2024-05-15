import fastify, { FastifyInstance } from "fastify";

import { launchRoutes } from "./routes/launch/launch.routes";
import { OAuth2Client } from "google-auth-library";
import { authenticationRoutes } from "./routes/authentication/authentication.routes";
import { JwtPayload } from "./repository/token/ITokenProvider";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

declare module "fastify" {
  interface FastifyRequest {
    user: JwtPayload | undefined;
  }
}
export const client = new OAuth2Client();

const app: FastifyInstance = fastify({ logger: false });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.withTypeProvider<ZodTypeProvider>();

app.register(launchRoutes, { prefix: "launch" });
app.register(authenticationRoutes);
app.setErrorHandler(function (error, request, reply) {
  if (error.code === "FST_ERR_VALIDATION") {
    const jsonMessage = JSON.parse(error.message);
    reply.status(500).send(jsonMessage);
  } else {
    const statusCode = error.statusCode ?? 500;

    console.log(error.message);

    reply.status(statusCode).send({
      message: error.message || "Unexpected error.",
      statusCode,
      name: error.name,
    });
  }
});

const PORT = 3333;

app.get("/", (res, reply) => {
  reply.send("ok");
});

app.listen(
  {
    port: PORT,
  },
  () => console.log("Server is running in domain http://localhost:" + PORT),
);
