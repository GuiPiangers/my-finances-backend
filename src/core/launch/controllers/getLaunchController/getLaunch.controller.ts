import { FastifyReply, FastifyRequest } from "fastify";
import { GetLaunchUseCase } from "../../useCases/getLaunch.useCase";
import { ApiError } from "../../../../utils/ApiError";
import { GetLaunchSchema } from "../../../../routes/launch/schemas/getLaunch.schema";

export class GetLaunchController {
  constructor(private _getLaunchesUseCase: GetLaunchUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as GetLaunchSchema;
    const userId = req.user?.userId;
    if (!userId) throw new ApiError("UserId is required");

    const res = await this._getLaunchesUseCase.execute({ id, userId });
    reply.send(res);
  }
}
