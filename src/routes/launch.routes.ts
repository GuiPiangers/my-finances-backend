import { FastifyInstance } from "fastify";
import { handleCreateLaunch } from "../core/launch/controllers/createLaunchController";
import { handleListLaunches } from "../core/launch/controllers/listLauncController";
import { handleGetLaunch } from "../core/launch/controllers/getLaunchController";
import { handleDeleteLaunch } from "../core/launch/controllers/deleteLaunchController";
import { handleUpdateLaunch } from "../core/launch/controllers/updateLaunchController";
import { authenticationPreHandler } from "./preHandler/authentication";

export async function launchRoutes(fastify: FastifyInstance) {
  fastify.post("/", authenticationPreHandler, handleCreateLaunch);
  fastify.delete("/", authenticationPreHandler, handleDeleteLaunch);
  fastify.get("/", authenticationPreHandler, handleListLaunches);
  fastify.get("/:id/:userId", authenticationPreHandler, handleGetLaunch);
  fastify.patch("/:id/:userId", authenticationPreHandler, handleUpdateLaunch);
}
