import { FastifyReply, FastifyRequest } from "fastify";
import { responseError } from "../../../../utils/ResponseError";
import { UpdateLaunchUseCase } from "../../useCases/updateLaunch.useCase";
import { ApiError } from "../../../../utils/ApiError";
import { LaunchDTO } from "../../models/Launch";

export class UpdateLaunchController {
  constructor(private _updateLaunchUseCase: UpdateLaunchUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const data = req.body as LaunchDTO;
      const { id } = req.params as { id: string };
      const userId = req.user?.userId;
      if (!userId) throw new ApiError("UserId is required");

      const res = await this._updateLaunchUseCase.execute({
        ...data,
        id,
        userId,
      });
      reply.send(res);
    } catch (err) {
      responseError(reply, err as ApiError);
    }
  }
}
