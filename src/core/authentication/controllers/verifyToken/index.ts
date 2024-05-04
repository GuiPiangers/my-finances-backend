import { FastifyReply, FastifyRequest } from "fastify";
import { TokenProvider } from "../../../../repository/token/TokenProvider";
import { VerifyTokenUseCase } from "../../useCases/verifyToken/verifyToken.useCase";
import { VerifyTokenController } from "./verifyToken.controller";

export const handleVerifyToken = (req: FastifyRequest, reply: FastifyReply) => {
  const tokenProvider = new TokenProvider();
  const verifyTokenUseCase = new VerifyTokenUseCase(tokenProvider);
  const verifyTokenController = new VerifyTokenController(verifyTokenUseCase);

  return verifyTokenController.handle(req, reply);
};
