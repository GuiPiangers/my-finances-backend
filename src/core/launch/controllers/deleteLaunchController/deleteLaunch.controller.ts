import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteLaunchUseCase } from "../../useCases/deleteLaunch.useCase";
import { ApiError } from "../../../../utils/ApiError";
import { DeleteLaunchSchema } from "../../../../routes/launch/schemas/deleteLaunch.schema";

export class DeleteLaunchController {
  constructor(private _deleteLaunchesUseCase: DeleteLaunchUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as DeleteLaunchSchema;
    const userId = req.user?.userId;
    if (!userId) throw new ApiError("UserId is required");
    await this._deleteLaunchesUseCase.execute({ id, userId });
    reply.send({ message: "Deletado com sucesso" });
  }
}
