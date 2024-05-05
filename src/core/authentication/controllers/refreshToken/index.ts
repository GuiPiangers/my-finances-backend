import { FastifyReply, FastifyRequest } from "fastify";
import { InMemoryRefreshToken } from "../../../../repository/token/RefreshTokenProvider";
import { RefreshTokenUseCase } from "../../useCases/refreshToken/refreshToken.useCase";
import { TokenProvider } from "../../../../repository/token/TokenProvider";
import { RefreshTokenController } from "./refreshToken.controller";
import { AuthTokenFacade } from "../../../../repository/token/AuthTokenFacade/AuthTokenFacade";

export const handleRefreshToken = (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const refreshTokenProvider = new InMemoryRefreshToken();
  const tokenProvider = new TokenProvider();
  const authTokenFacade = new AuthTokenFacade(
    tokenProvider,
    refreshTokenProvider,
  );
  const refreshTokenUseCase = new RefreshTokenUseCase(authTokenFacade);
  const refreshTokenController = new RefreshTokenController(
    refreshTokenUseCase,
  );

  return refreshTokenController.handle(req, reply);
};
