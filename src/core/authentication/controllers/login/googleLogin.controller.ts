import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify";
import { GoogleLoginUseCase } from "../../useCases/loginUser/googleLogin.useCase";

export class GoogleLoginController {
  constructor(private _GoogleLoginUseCase: GoogleLoginUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { token } = req.body as { token: string };
    const loginInfo = await this._GoogleLoginUseCase.execute({ token });
    reply.send(loginInfo);
  }
}
