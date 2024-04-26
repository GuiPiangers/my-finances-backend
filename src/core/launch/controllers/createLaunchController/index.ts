import { FastifyReply, FastifyRequest } from "fastify";
import { InMemoryLaunchRepository } from "../../../../repository/launchRepository/InMemory.LaunchRepository";
import { CreateLaunchUseCase } from "../../useCases/createLuanch.useCase";
import { CreateLaunchController } from "./CreateLaunch.controller";

export const handleCreateLaunch = (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const inMemoryLaunchRepository = new InMemoryLaunchRepository();
  const createLaunchUseCase = new CreateLaunchUseCase(inMemoryLaunchRepository);
  const createLaunchController = new CreateLaunchController(
    createLaunchUseCase,
  );
  return createLaunchController.handle(req, reply);
};
