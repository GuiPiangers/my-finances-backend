import { FastifyReply, FastifyRequest } from "fastify";
import { responseError } from "../../../../utils/ResponseError";
import { CreateLaunchUseCase } from "../../useCases/createLuanch.useCase";
import { ApiError } from "../../../../utils/ApiError";
import { LaunchDTO } from "../../models/Launch";

export class CreateLaunchController {
  constructor(private _CreateLaunchUseCase: CreateLaunchUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const data = req.body as LaunchDTO;
      const res = await this._CreateLaunchUseCase.execute(data);
      reply.send(res);
    } catch (err) {
      responseError(reply, err as ApiError);
    }
  }
}
