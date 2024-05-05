// import { query } from "../server/mySqlConnection";
import { RefreshTokenDTO } from "../../core/authentication/models/RefreshToken";
import { IRefreshTokenProvider } from "./IRefreshTokenProvider";
import jwt from "jsonwebtoken";

let refreshTokens: RefreshTokenDTO[] = [];

class InMemoryRefreshToken implements IRefreshTokenProvider {
  async delete(userId: string): Promise<void> {
    refreshTokens = refreshTokens.filter((token) => token.userId !== userId);
  }

  async create(refreshToken: RefreshTokenDTO): Promise<string> {
    this.delete(refreshToken.userId);
    refreshTokens.push(refreshToken);
    return await jwt.sign(
      { userId: refreshToken.userId, id: refreshToken.id },
      process.env.JWT_SECRET!,
      {
        expiresIn: refreshToken.expiresIn,
      },
    );
  }

  async get(id: string): Promise<RefreshTokenDTO | undefined> {
    const refToken = refreshTokens.find(
      (refreshToken) => refreshToken.id === id,
    );

    if (refToken) return refToken;
    return undefined;
  }
}

export { InMemoryRefreshToken };
