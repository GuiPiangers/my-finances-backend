import { FastifyReply, FastifyRequest } from "fastify";
import { TokenProvider } from "../../../../repository/token/TokenProvider";
import { InMemoryRefreshToken } from "../../../../repository/token/RefreshTokenProvider";
import { InMemoryUserRepository } from "../../../../repository/user/inMemoryUserRepository";
import { GoogleLoginUseCase } from "../../useCases/loginUser/googleLogin.useCase";
import { GoogleLoginController } from "./googleLogin.controller";

export const handleGoogleLogin = (req: FastifyRequest, reply: FastifyReply) => {
  const tokenProvider = new TokenProvider();
  const refreshTokenProvider = new InMemoryRefreshToken();
  const userRepository = new InMemoryUserRepository();

  const googleLoginUseCase = new GoogleLoginUseCase(
    userRepository,
    refreshTokenProvider,
    tokenProvider,
  );
  const googleLoginController = new GoogleLoginController(googleLoginUseCase);

  return googleLoginController.handle(req, reply);
};
