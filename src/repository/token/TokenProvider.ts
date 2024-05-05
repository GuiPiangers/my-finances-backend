import { ITokenProvider, JwtPayload } from "./ITokenProvider";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { ApiError } from "../../utils/ApiError";
dotenv.config();

type whiteListToken = {
  validUser: string;
  validToken: string;
};

let validTokens: whiteListToken[] = [];

class TokenProvider implements ITokenProvider {
  async create(userId: string) {
    if (!process.env.JWT_SECRET)
      throw new ApiError("Erro de configuração do servidor", {
        statusCode: 500,
      });
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: 60 * 10,
    });
    validTokens.push({ validToken: token, validUser: userId });
    return token;
  }

  async verify(token: string): Promise<JwtPayload> {
    const isValidToken = validTokens.find(
      (validObject) => token === validObject.validToken,
    );
    if (!isValidToken) throw new ApiError("Invalid token", { statusCode: 401 });
    return (await jwt.verify(token, process.env.JWT_SECRET!)) as JwtPayload;
  }

  async invalidToken(token: string) {
    validTokens = await validTokens.filter(
      (validToken) => validToken.validToken !== token,
    );
  }

  async invalidUser(userId: string) {
    validTokens = await validTokens.filter(
      (validToken) => validToken.validUser !== userId,
    );
  }
}

export { TokenProvider };
