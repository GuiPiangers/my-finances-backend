import { FastifyReply, FastifyRequest } from "fastify";
import { InMemoryLaunchRepository } from "../../../../repository/launch/InMemory.LaunchRepository";
import { DeleteLaunchUseCase } from "../../useCases/deleteLaunch.useCase";
import { DeleteLaunchController } from "./deleteLaunch.controller";

export const handleDeleteLaunch = (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const inMemoryLaunchRepository = new InMemoryLaunchRepository();
  const deleteLaunchUseCase = new DeleteLaunchUseCase(inMemoryLaunchRepository);
  const deleteLaunchController = new DeleteLaunchController(
    deleteLaunchUseCase,
  );
  return deleteLaunchController.handle(req, reply);
};
