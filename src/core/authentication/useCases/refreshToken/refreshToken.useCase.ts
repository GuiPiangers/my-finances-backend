/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiError } from "../../../../utils/ApiError";
import { AuthTokenFacade } from "../../../../repository/token/AuthTokenFacade/AuthTokenFacade";

export class RefreshTokenUseCase {
  constructor(private authTokenFacade: AuthTokenFacade) {}

  async execute({
    refreshTokenId,
    userId,
  }: {
    refreshTokenId: string;
    userId: string;
  }) {
    const isValidToken =
      await this.authTokenFacade.refreshTokenProvider.get(refreshTokenId);
    await this.authTokenFacade.tokenProvider.invalidUser(userId);
    if (!isValidToken) {
      // this.authTokenFacade.logout({ userId });
      throw new ApiError("Refresh Token inválido", { statusCode: 401 });
    }
    const token = await this.authTokenFacade.tokenProvider.create(userId);
    return { token };
  }
}
