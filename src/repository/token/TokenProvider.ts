import { ITokenProvider, JwtPayload } from "./ITokenProvider";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { ApiError } from "../../utils/ApiError";
dotenv.config();

class TokenProvider implements ITokenProvider {
  async create(userId: string) {
    if (!process.env.JWT_SECRET)
      throw new ApiError("Erro de configuração do servidor", {
        statusCode: 500,
      });
    const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: 60 * 10,
    });
    return token;
  }

  async verify(token: string): Promise<JwtPayload> {
    return (await jwt.verify(token, process.env.JWT_SECRET!)) as JwtPayload;
  }
}

export { TokenProvider };
