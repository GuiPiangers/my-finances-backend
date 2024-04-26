import { FastifyReply, FastifyRequest } from "fastify";
import { responseError } from "../../../../utils/ResponseError";
import { DeleteLaunchUseCase } from "../../useCases/deleteLaunch.useCase";
import { ApiError } from "../../../../utils/ApiError";

export class DeleteLaunchController {
  constructor(private _deleteLaunchesUseCase: DeleteLaunchUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id, userId } = req.body as { id: string; userId: string };
      const res = await this._deleteLaunchesUseCase.execute({ id, userId });
      reply.send(res);
    } catch (err) {
      responseError(reply, err as ApiError);
    }
  }
}
