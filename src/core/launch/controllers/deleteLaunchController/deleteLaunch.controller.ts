import { FastifyReply, FastifyRequest } from "fastify";
import { responseError } from "../../../../utils/ResponseError";
import { DeleteLaunchUseCase } from "../../useCases/deleteLaunch.useCase";
import { ApiError } from "../../../../utils/ApiError";

export class DeleteLaunchController {
  constructor(private _deleteLaunchesUseCase: DeleteLaunchUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.body as { id: string };
      const userId = req.user?.userId;
      if (!userId) throw new ApiError("UserId is required");
      const res = await this._deleteLaunchesUseCase.execute({ id, userId });
      reply.send(res);
    } catch (err) {
      responseError(reply, err as ApiError);
    }
  }
}
