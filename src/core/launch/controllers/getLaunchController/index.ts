import { FastifyReply, FastifyRequest } from "fastify";
import { inMemoryLaunchRepository } from "../../../../repository/launch/InMemory.LaunchRepository";
import { GetLaunchUseCase } from "../../useCases/getLaunch.useCase";
import { GetLaunchController } from "./getLaunch.controller";

export const handleGetLaunch = (req: FastifyRequest, reply: FastifyReply) => {
  const getLaunchUseCase = new GetLaunchUseCase(inMemoryLaunchRepository);
  const getLaunchController = new GetLaunchController(getLaunchUseCase);
  return getLaunchController.handle(req, reply);
};
