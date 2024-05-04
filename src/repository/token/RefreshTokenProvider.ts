// import { query } from "../server/mySqlConnection";
import { RefreshTokenDTO } from "../../core/authentication/models/RefreshToken";
import { IRefreshTokenProvider } from "./IRefreshTokenProvider";

let refreshTokens: RefreshTokenDTO[] = [];

class InMemoryRefreshToken implements IRefreshTokenProvider {
  async delete(userId: string): Promise<void> {
    refreshTokens = refreshTokens.filter((token) => token.userId !== userId);
  }

  async create(refreshToken: RefreshTokenDTO): Promise<void> {
    refreshTokens.push(refreshToken);
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
