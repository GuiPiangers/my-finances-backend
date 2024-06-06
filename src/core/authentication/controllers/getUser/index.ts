import { FastifyReply, FastifyRequest } from "fastify";
import { InMemoryUserRepository } from "../../../../repository/user/inMemoryUserRepository";
import { GetUserController } from "./getUser.controller";
import { GetUserUseCase } from "../../useCases/getUser/getUser.useCase";

export const handleGetUser = (req: FastifyRequest, reply: FastifyReply) => {
  const userRepository = new InMemoryUserRepository();

  const getUserUseCase = new GetUserUseCase(userRepository);
  const getUserController = new GetUserController(getUserUseCase);

  return getUserController.handle(req, reply);
};
