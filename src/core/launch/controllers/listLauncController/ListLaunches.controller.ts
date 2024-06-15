import { FastifyReply, FastifyRequest } from "fastify";
import { ListLaunchesUseCase } from "../../useCases/listLaunches.useCase";
import { ApiError } from "../../../../utils/ApiError";
import { ListLaunchQuerySchema } from "../../../../routes/launch/schemas/listLaunch.schema";

export class ListLaunchesController {
  constructor(private _ListLaunchUseCase: ListLaunchesUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const userId = req.user?.userId;
    const queryParams = req.query as ListLaunchQuerySchema;

    const month = queryParams.month
      ? +queryParams.month!
      : new Date().getMonth();

    const year = queryParams.year
      ? +queryParams.year!
      : new Date().getFullYear();

    if (!userId) throw new ApiError("UserId is required");
    const res = await this._ListLaunchUseCase.execute({ userId, month, year });
    console.log(res);

    reply.send(res || { message: "no result" });
  }
}
