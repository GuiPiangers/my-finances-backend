import { FastifyInstance } from "fastify";
import { handleCreateLaunch } from "../core/launch/controllers/createLaunchController";
import { handleListLaunches } from "../core/launch/controllers/listLauncController";

export async function launchRoutes(fastify: FastifyInstance) {
  fastify.post("/", handleCreateLaunch);
  fastify.get("/", handleListLaunches);
}
