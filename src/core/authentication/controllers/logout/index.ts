import { FastifyReply, FastifyRequest } from "fastify";
import { InMemoryRefreshToken } from "../../../../repository/token/RefreshTokenProvider";
import { LogoutUseCase } from "../../useCases/logout/logout.useCase";
import { LogoutController } from "./logout.controller";

export const handleLogout = (req: FastifyRequest, reply: FastifyReply) => {
  const tokenProvider = new InMemoryRefreshToken();
  const logoutUseCase = new LogoutUseCase(tokenProvider);
  const logoutController = new LogoutController(logoutUseCase);

  return logoutController.handle(req, reply);
};
