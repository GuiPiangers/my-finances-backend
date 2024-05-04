/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from "dayjs";
import { IRefreshTokenProvider } from "../../../../repository/token/IRefreshTokenProvider";
import { ITokenProvider } from "../../../../repository/token/ITokenProvider";
import { RefreshToken } from "../../models/RefreshToken";
import { ApiError } from "../../../../utils/ApiError";

export class RefreshTokenUseCase {
  constructor(
    private refreshTokenProvider: IRefreshTokenProvider,
    private tokenProvider: ITokenProvider,
  ) {}

  async execute({
    refreshTokenId,
    userId,
  }: {
    refreshTokenId: string;
    userId: string;
  }) {
    const refreshToken = await this.refreshTokenProvider.get(refreshTokenId);
    if (!refreshToken) {
      this.refreshTokenProvider.delete(userId);
      throw new ApiError("Refresh Token inválido", { statusCode: 401 });
    }
    const token = await this.tokenProvider.create(refreshToken.userId);

    const { id: _, ...refreshTokenData } = refreshToken;
    const { id, expiresIn } = new RefreshToken(refreshTokenData);
    await this.refreshTokenProvider.create({
      id,
      expiresIn,
      userId,
    });
    return { token, RefreshToken: { userId, id, expiresIn } };
  }
}
