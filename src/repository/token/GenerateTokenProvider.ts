import { IGenerateTokenProvider } from "./IGenerateTokenProvider";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { ApiError } from "../../utils/ApiError";
dotenv.config();

class GenerateTokenProvider implements IGenerateTokenProvider {
  async execute(userId: string) {
    if (!process.env.JWT_SECRET)
      throw new ApiError("Erro de configuração do servidor", {
        statusCode: 500,
      });
    const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: 60 * 10,
    });
    return token;
  }
}

const generateTokenProvider = new GenerateTokenProvider();

export { generateTokenProvider };
