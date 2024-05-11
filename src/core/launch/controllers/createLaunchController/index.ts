import { FastifyReply, FastifyRequest } from "fastify";
import { inMemoryLaunchRepository } from "../../../../repository/launch/InMemory.LaunchRepository";
import { CreateLaunchUseCase } from "../../useCases/createLaunch.useCase";
import { CreateLaunchController } from "./CreateLaunch.controller";

export const handleCreateLaunch = (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const createLaunchUseCase = new CreateLaunchUseCase(inMemoryLaunchRepository);
  const createLaunchController = new CreateLaunchController(
    createLaunchUseCase,
  );
  return createLaunchController.handle(req, reply);
};
