import { FastifyReply, FastifyRequest } from "fastify";
import { InMemoryRefreshToken } from "../../../../repository/token/RefreshTokenProvider";
import { LogoutUseCase } from "../../useCases/logout/logout.useCase";
import { LogoutController } from "./logout.controller";
import { AuthTokenFacade } from "../../../../repository/token/AuthTokenFacade/AuthTokenFacade";
import { TokenProvider } from "../../../../repository/token/TokenProvider";

export const handleLogout = (req: FastifyRequest, reply: FastifyReply) => {
  const tokenProvider = new TokenProvider();
  const refreshTokenProvider = new InMemoryRefreshToken();

  const authTokenFacade = new AuthTokenFacade(
    tokenProvider,
    refreshTokenProvider,
  );
  const logoutUseCase = new LogoutUseCase(authTokenFacade);
  const logoutController = new LogoutController(logoutUseCase);

  return logoutController.handle(req, reply);
};
