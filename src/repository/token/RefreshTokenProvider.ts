// import { query } from "../server/mySqlConnection";
import { RefreshTokenDTO } from "../../core/authentication/models/RefreshToken";
import { IRefreshTokenProvider } from "./IRefreshTokenProvider";

const refreshTokens: RefreshTokenDTO[] = [];

class InMemoryRefreshToken implements IRefreshTokenProvider {
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented." + id);
  }

  async generate(refreshToken: RefreshTokenDTO): Promise<void> {
    refreshTokens.push(refreshToken);
  }

  async getRefreshToken(id: string): Promise<RefreshTokenDTO | undefined> {
    const refToken = refreshTokens.find(
      (refreshToken) => refreshToken.id === id,
    );

    if (refToken) return refToken;
    return undefined;
  }
}

export { InMemoryRefreshToken };
