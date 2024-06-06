import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify";
import { GetUserUseCase } from "../../useCases/getUser/getUser.useCase";
import { JwtPayload } from "../../../../repository/token/ITokenProvider";

export class GetUserController {
  constructor(private _GetUSerUseCase: GetUserUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.user as JwtPayload;
    const { email, name, emailVerified, phone } =
      await this._GetUSerUseCase.execute(userId);
    reply.send({ email, name, emailVerified, phone });
  }
}
