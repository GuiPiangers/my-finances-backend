import { FastifyReply, FastifyRequest } from "fastify";
import { InMemoryLaunchRepository } from "../../../../repository/launchRepository/InMemory.LaunchRepository";
import { ListLaunchesUseCase } from "../../useCases/listLaunches.useCase";
import { ListLaunchesController } from "./listLaunches.controller";

export const handleListLaunches = (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const inMemoryLaunchRepository = new InMemoryLaunchRepository();
  const listLaunchesUseCase = new ListLaunchesUseCase(inMemoryLaunchRepository);
  const listLaunchesController = new ListLaunchesController(
    listLaunchesUseCase,
  );
  return listLaunchesController.handle(req, reply);
};
