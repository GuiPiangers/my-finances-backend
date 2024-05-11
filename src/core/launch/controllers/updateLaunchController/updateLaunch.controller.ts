import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateLaunchUseCase } from "../../useCases/updateLaunch.useCase";
import { ApiError } from "../../../../utils/ApiError";
import { UpdateLaunchParamsSchema } from "../../../../routes/launch/schemas/updateLaunch.schema";
import { CreateLaunchSchema } from "../../../../routes/launch/schemas/createLaunch.schema";

export class UpdateLaunchController {
  constructor(private _updateLaunchUseCase: UpdateLaunchUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as CreateLaunchSchema;
    const { id } = req.params as UpdateLaunchParamsSchema;
    const userId = req.user?.userId;
    if (!userId) throw new ApiError("UserId is required");

    const res = await this._updateLaunchUseCase.execute({
      ...data,
      id,
      userId,
    });
    reply.send(res);
  }
}
