import { FastifyInstance } from "fastify";
import { handleCreateLaunch } from "../core/launch/controllers/createLaunchController";
import { handleListLaunches } from "../core/launch/controllers/listLauncController";
import { handleGetLaunch } from "../core/launch/controllers/getLaunchController";
import { handleDeleteLaunch } from "../core/launch/controllers/deleteLaunchController";
import { handleUpdateLaunch } from "../core/launch/controllers/updateLaunchController";
// import { authentication } from "../server";

export async function launchRoutes(fastify: FastifyInstance) {
  fastify.post("/", handleCreateLaunch);
  fastify.delete("/", handleDeleteLaunch);
  fastify.get("/", handleListLaunches);
  fastify.get("/:id/:userId", handleGetLaunch);
  fastify.patch("/:id/:userId", handleUpdateLaunch);
}
