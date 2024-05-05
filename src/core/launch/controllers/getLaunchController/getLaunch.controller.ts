import { FastifyReply, FastifyRequest } from "fastify";
import { responseError } from "../../../../utils/ResponseError";
import { GetLaunchUseCase } from "../../useCases/getLaunch.useCase";
import { ApiError } from "../../../../utils/ApiError";

export class GetLaunchController {
  constructor(private _getLaunchesUseCase: GetLaunchUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      // const { userId } = req.body as ListLaunch;
      const { id } = req.params as { id: string };
      const userId = req.user?.userId;
      if (!userId) throw new ApiError("UserId is required");

      const res = await this._getLaunchesUseCase.execute({ id, userId });
      reply.send(res);
    } catch (err) {
      responseError(reply, err as ApiError);
    }
  }
}
