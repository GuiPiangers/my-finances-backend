import { FastifyReply, FastifyRequest } from "fastify";
import { LogoutUseCase } from "../../useCases/logout/logout.useCase";
import { ApiError } from "../../../../utils/ApiError";

export class LogoutController {
  constructor(private _logoutUseCase: LogoutUseCase) {}

  handle(req: FastifyRequest, reply: FastifyReply) {
    const userId = req.user?.userId;
    if (!userId) throw new ApiError("O usuário não está logado");
    this._logoutUseCase.execute(userId);
    reply.send({ message: "Deslogado com sucesso!" });
  }
}
