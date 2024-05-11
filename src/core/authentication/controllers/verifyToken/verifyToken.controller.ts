import { FastifyRequest } from "fastify";
import { VerifyTokenUseCase } from "../../useCases/verifyToken/verifyToken.useCase";
import { ApiError } from "../../../../utils/ApiError";

export class VerifyTokenController {
  constructor(private _verifyTokenUseCase: VerifyTokenUseCase) {}

  async handle(req: FastifyRequest) {
    const token = req.headers.authorization?.replace(/^Bearer /, "");
    if (!token)
      throw new ApiError("Acesso não autorizado", { statusCode: 401 });
    const payload = await this._verifyTokenUseCase.execute(token);

    req.user = payload;
  }
}
