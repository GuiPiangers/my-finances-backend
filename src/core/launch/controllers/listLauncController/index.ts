import { FastifyReply, FastifyRequest } from "fastify";
import { inMemoryLaunchRepository } from "../../../../repository/launch/InMemory.LaunchRepository";
import { ListLaunchesUseCase } from "../../useCases/listLaunches.useCase";
import { ListLaunchesController } from "./listLaunches.controller";

export const handleListLaunches = (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const listLaunchesUseCase = new ListLaunchesUseCase(inMemoryLaunchRepository);
  const listLaunchesController = new ListLaunchesController(
    listLaunchesUseCase,
  );
  return listLaunchesController.handle(req, reply);
};
