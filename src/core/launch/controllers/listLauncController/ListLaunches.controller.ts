import { FastifyReply, FastifyRequest } from "fastify";
import { responseError } from "../../../../utils/ResponseError";
import { ListLaunchesUseCase } from "../../useCases/listLaunches.useCase";
import { ApiError } from "../../../../utils/ApiError";

export class ListLaunchesController {
  constructor(private _ListLaunchUseCase: ListLaunchesUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw new ApiError("UserId is required");
      const res = await this._ListLaunchUseCase.execute({ userId });
      reply.send(res);
    } catch (err) {
      responseError(reply, err as ApiError);
    }
  }
}
