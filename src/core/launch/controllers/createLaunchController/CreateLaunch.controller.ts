import { FastifyReply, FastifyRequest } from "fastify";
import { responseError } from "../../../../utils/ResponseError";
import { CreateLaunchUseCase } from "../../useCases/createLuanch.useCase";
import { ApiError } from "../../../../utils/ApiError";
import { LaunchDTO } from "../../models/Launch";

export class CreateLaunchController {
  constructor(private _CreateLaunchUseCase: CreateLaunchUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { userId: _, ...data } = req.body as LaunchDTO;
      const userId = req.user?.userId;
      if (!userId) throw new ApiError("UserId is required");

      const res = await this._CreateLaunchUseCase.execute({ userId, ...data });
      reply.send(res);
    } catch (err) {
      responseError(reply, err as ApiError);
    }
  }
}
