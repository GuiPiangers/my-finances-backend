import { FastifyInstance } from "fastify";
import { createLaunchController } from "../core/launch/controllers/createLaunchController";
import { listLaunchesController } from "../core/launch/controllers/listLauncController";

export async function launchRoutes(fastify: FastifyInstance) {
  fastify.post("/", (req, reply) => {
    createLaunchController.handle(req, reply);
  });
  fastify.get("/", (req, reply) => {
    listLaunchesController.handle(req, reply);
  });
}
