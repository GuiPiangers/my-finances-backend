import { ITokenProvider, JwtPayload } from "./ITokenProvider";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { ApiError } from "../../utils/ApiError";
dotenv.config();

const invalidTokens: string[] = [];

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
    const isInvalidToken = invalidTokens.find(
      (invalidToken) => token === invalidToken,
    );
    if (isInvalidToken)
      throw new ApiError("Invalid token", { statusCode: 401 });
    return (await jwt.verify(token, process.env.JWT_SECRET!)) as JwtPayload;
  }

  async invalidToken(token: string) {
    await invalidTokens.push(token);
  }
}

export { TokenProvider };
