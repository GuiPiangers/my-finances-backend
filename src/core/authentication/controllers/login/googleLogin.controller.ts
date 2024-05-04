import { FastifyRequest } from "fastify/types/request";
import { ApiError } from "../../../../utils/ApiError";
import { responseError } from "../../../../utils/ResponseError";
import { FastifyReply } from "fastify";
import { GoogleLoginUseCase } from "../../useCases/loginUser/googleLogin.useCase";

export class GoogleLoginController {
  constructor(private _GoogleLoginUseCase: GoogleLoginUseCase) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { token } = req.body as { token: string };
      const loginInfo = await this._GoogleLoginUseCase.execute({ token });
      reply.send(loginInfo);
    } catch (err) {
      responseError(reply, err as ApiError);
    }
  }
}
