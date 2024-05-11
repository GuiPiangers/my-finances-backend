import { FastifyReply, FastifyRequest } from "fastify";
import { inMemoryLaunchRepository } from "../../../../repository/launch/InMemory.LaunchRepository";
import { UpdateLaunchUseCase } from "../../useCases/updateLaunch.useCase";
import { UpdateLaunchController } from "./updateLaunch.controller";

export const handleUpdateLaunch = (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const updateLaunchUseCase = new UpdateLaunchUseCase(inMemoryLaunchRepository);
  const updateLaunchController = new UpdateLaunchController(
    updateLaunchUseCase,
  );
  return updateLaunchController.handle(req, reply);
};
