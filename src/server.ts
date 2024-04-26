import fastify, { FastifyInstance } from "fastify";
import { launchRoutes } from "./routes/launch.routes";

const app: FastifyInstance = fastify({ logger: false });

const PORT = 3333;

app.register(launchRoutes);

app.listen(
  {
    port: PORT,
  },
  () => console.log("Server is running in domain http://localhost:" + PORT),
);
