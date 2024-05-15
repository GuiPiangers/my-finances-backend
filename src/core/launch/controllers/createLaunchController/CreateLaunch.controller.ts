import { FastifyReply, FastifyRequest } from "fastify";
import { CreateLaunchUseCase } from "../../useCases/createLaunch.useCase";
import { ApiError } from "../../../../utils/ApiError";
import { CreateLaunchSchema } from "../../../../routes/launch/schemas/createLaunch.schema";

export class CreateLaunchController {
  constructor(private _CreateLaunchUseCase: CreateLaunchUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as CreateLaunchSchema;
    const userId = req.user?.userId;
    if (!userId) throw new ApiError("UserId is required");

    await this._CreateLaunchUseCase.execute({ userId, ...data });
    reply.send({ message: "Criado com sucesso!" });
  }
}
