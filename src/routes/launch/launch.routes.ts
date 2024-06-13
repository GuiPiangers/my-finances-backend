import { FastifyInstance } from "fastify";
import { handleCreateLaunch } from "../../core/launch/controllers/createLaunchController";
import { handleListLaunches } from "../../core/launch/controllers/listLauncController";
import { handleGetLaunch } from "../../core/launch/controllers/getLaunchController";
import { handleDeleteLaunch } from "../../core/launch/controllers/deleteLaunchController";
import { handleUpdateLaunch } from "../../core/launch/controllers/updateLaunchController";
import { authenticationPreHandler } from "../preHandler/authentication";
import { createLaunchBodySchema } from "./schemas/createLaunch.schema";
import { deleteLaunchParamsSchema } from "./schemas/deleteLaunch.schema";
import { getLaunchParamsSchema } from "./schemas/getLaunch.schema";
import {
  updateLaunchBodySchema,
  updateLaunchParamsSchema,
} from "./schemas/updateLaunch.schema";
import { listLaunchQuerySchema } from "./schemas/listLaunch.schema";

export async function launchRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/",
    {
      preHandler: authenticationPreHandler,
      schema: { body: createLaunchBodySchema },
    },
    handleCreateLaunch,
  );
  fastify.delete(
    "/:id",
    {
      preHandler: authenticationPreHandler,
      schema: { params: deleteLaunchParamsSchema },
    },
    handleDeleteLaunch,
  );
  fastify.get(
    "/",
    {
      preHandler: authenticationPreHandler,
      schema: {
        querystring: listLaunchQuerySchema,
      },
    },
    handleListLaunches,
  );
  fastify.get(
    "/:id",
    {
      preHandler: authenticationPreHandler,
      schema: { params: getLaunchParamsSchema },
    },

    handleGetLaunch,
  );
  fastify.patch(
    "/:id",
    {
      preHandler: authenticationPreHandler,
      schema: {
        params: updateLaunchParamsSchema,
        body: updateLaunchBodySchema,
      },
    },
    handleUpdateLaunch,
  );
}
