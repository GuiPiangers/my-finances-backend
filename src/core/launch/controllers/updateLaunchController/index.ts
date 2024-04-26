import { FastifyReply, FastifyRequest } from "fastify";
import { InMemoryLaunchRepository } from "../../../../repository/launchRepository/InMemory.LaunchRepository";
import { UpdateLaunchUseCase } from "../../useCases/updateLaunch.useCase";
import { UpdateLaunchController } from "./updateLaunch.controller";

export const handleUpdateLaunch = (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const inMemoryLaunchRepository = new InMemoryLaunchRepository();
  const updateLaunchUseCase = new UpdateLaunchUseCase(inMemoryLaunchRepository);
  const updateLaunchController = new UpdateLaunchController(
    updateLaunchUseCase,
  );
  return updateLaunchController.handle(req, reply);
};
