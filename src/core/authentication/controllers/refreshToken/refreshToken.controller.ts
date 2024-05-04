import { FastifyReply, FastifyRequest } from "fastify";
import { ApiError } from "../../../../utils/ApiError";
import { responseError } from "../../../../utils/ResponseError";
import { RefreshTokenUseCase } from "../../useCases/refreshToken/refreshToken.useCase";

export class RefreshTokenController {
  constructor(private _verifyTokenUseCase: RefreshTokenUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { refreshTokenId, userId } = req.body as {
        userId: string;
        refreshTokenId: string;
      };
      const data = await this._verifyTokenUseCase.execute({
        refreshTokenId,
        userId,
      });
      reply.send(data);
    } catch (err) {
      responseError(reply, err as ApiError);
    }
  }
}
