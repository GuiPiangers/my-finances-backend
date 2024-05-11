import { FastifyReply, FastifyRequest } from "fastify";
import { RefreshTokenUseCase } from "../../useCases/refreshToken/refreshToken.useCase";
import { RefreshTokenSchema } from "../../../../routes/authentication/schemas/refreshToken.schema";

export class RefreshTokenController {
  constructor(private _verifyTokenUseCase: RefreshTokenUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { refreshTokenId, userId } = req.body as RefreshTokenSchema;
    const data = await this._verifyTokenUseCase.execute({
      refreshTokenId,
      userId,
    });
    reply.send(data);
  }
}
