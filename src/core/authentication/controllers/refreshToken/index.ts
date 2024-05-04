import { FastifyReply, FastifyRequest } from "fastify";
import { InMemoryRefreshToken } from "../../../../repository/token/RefreshTokenProvider";
import { RefreshTokenUseCase } from "../../useCases/refreshToken/refreshToken.useCase";
import { TokenProvider } from "../../../../repository/token/TokenProvider";
import { RefreshTokenController } from "./refreshToken.controller";

export const handleRefreshToken = (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const refreshTokenProvider = new InMemoryRefreshToken();
  const tokenProvider = new TokenProvider();
  const refreshTokenUseCase = new RefreshTokenUseCase(
    refreshTokenProvider,
    tokenProvider,
  );
  const refreshTokenController = new RefreshTokenController(
    refreshTokenUseCase,
  );

  return refreshTokenController.handle(req, reply);
};
