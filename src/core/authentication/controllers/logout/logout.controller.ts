import { FastifyReply, FastifyRequest } from "fastify";
import { LogoutUseCase } from "../../useCases/logout/logout.useCase";
import { responseError } from "../../../../utils/ResponseError";
import { ApiError } from "../../../../utils/ApiError";

export class LogoutController {
  constructor(private _logoutUseCase: LogoutUseCase) {}

  handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = req.body as { userId: string };
      this._logoutUseCase.execute(userId);

      reply.send({ message: "Deslogado com sucesso!" });
    } catch (err) {
      responseError(reply, err as ApiError);
    }
  }
}
