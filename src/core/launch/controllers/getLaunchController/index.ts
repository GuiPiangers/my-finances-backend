import { FastifyReply, FastifyRequest } from "fastify";
import { InMemoryLaunchRepository } from "../../../../repository/launchRepository/InMemory.LaunchRepository";
import { GetLaunchUseCase } from "../../useCases/getLaunch.useCase";
import { GetLaunchController } from "./getLaunch.controller";

export const handleGetLaunch = (req: FastifyRequest, reply: FastifyReply) => {
  const inMemoryLaunchRepository = new InMemoryLaunchRepository();
  const getLaunchUseCase = new GetLaunchUseCase(inMemoryLaunchRepository);
  const getLaunchController = new GetLaunchController(getLaunchUseCase);
  return getLaunchController.handle(req, reply);
};
