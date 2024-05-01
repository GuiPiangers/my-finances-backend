/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from "dayjs";
import { IRefreshTokenProvider } from "../../../../repository/token/IRefreshTokenProvider";
import { IGenerateTokenProvider } from "../../../../repository/token/IGenerateTokenProvider";
import { RefreshToken } from "../../models/RefreshToken";
import { ApiError } from "../../../../utils/ApiError";

export class RefreshTokenUseCase {
  constructor(
    private refreshTokenProvider: IRefreshTokenProvider,
    private generateTokenProvider: IGenerateTokenProvider,
  ) {}

  async execute(refreshTokenId: string) {
    const [refreshToken] =
      await this.refreshTokenProvider.getRefreshToken(refreshTokenId);
    if (!refreshToken)
      throw new ApiError("Refresh Token inválido", { statusCode: 401 });
    const token = await this.generateTokenProvider.execute(refreshToken.userId);
    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn),
    );

    if (refreshTokenExpired) {
      const { id: _, ...refreshTokenData } = refreshToken;
      const { id, expiresIn, userId } = new RefreshToken(refreshTokenData);
      const newRefreshToken = await this.refreshTokenProvider.generate({
        id,
        expiresIn,
        userId,
      });
      return { token, newRefreshToken };
    }

    return { token };
  }
}
