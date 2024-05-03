import { FastifyReply, FastifyRequest } from "fastify";
import { GenerateTokenProvider } from "../../../repository/token/GenerateTokenProvider";
import { RefreshTokenProvider } from "../../../repository/token/RefreshTokenProvider";
import { InMemoryUserRepository } from "../../../repository/user/inMemoryUserRepository";
import { GoogleLoginUseCase } from "../useCases/loginUser/googleLogin.useCase";
import { GoogleLoginController } from "./googleLogin.controller";

export const handleGoogleLogin = (req: FastifyRequest, reply: FastifyReply) => {
  const tokenProvider = new GenerateTokenProvider();
  const refreshTokenProvider = new RefreshTokenProvider();
  const userRepository = new InMemoryUserRepository();

  const googleLoginUseCase = new GoogleLoginUseCase(
    userRepository,
    refreshTokenProvider,
    tokenProvider,
  );
  const googleLoginController = new GoogleLoginController(googleLoginUseCase);

  return googleLoginController.handle(req, reply);
};
