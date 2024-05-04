import { FastifyReply, FastifyRequest } from "fastify";
import { VerifyTokenUseCase } from "../../useCases/verifyToken/verifyToken.useCase";
import { ApiError } from "../../../../utils/ApiError";
import { responseError } from "../../../../utils/ResponseError";

export class VerifyTokenController {
  constructor(private _verifyTokenUseCase: VerifyTokenUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const token = req.headers.authorization?.replace(/^Bearer /, "");
      if (!token)
        throw new ApiError("Acesso não autorizado", { statusCode: 401 });
      const payload = await this._verifyTokenUseCase.execute(token);

      req.user = payload;
    } catch (err) {
      responseError(reply, err as ApiError);
    }
  }
}
