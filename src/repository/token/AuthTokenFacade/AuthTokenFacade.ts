import { RefreshToken } from "../../../core/authentication/models/RefreshToken";
import { IRefreshTokenProvider } from "../IRefreshTokenProvider";
import { ITokenProvider } from "../ITokenProvider";

export class AuthTokenFacade {
  constructor(
    public tokenProvider: ITokenProvider,
    public refreshTokenProvider: IRefreshTokenProvider,
  ) {}

  logout({ userId }: { userId: string }) {
    this.refreshTokenProvider.delete(userId);
    this.tokenProvider.invalidUser(userId);
  }

  async create({ userId }: { userId: string }) {
    const refreshTokenData = new RefreshToken({ userId });
    const token = await this.tokenProvider.create(userId);
    const refreshToken =
      await this.refreshTokenProvider.create(refreshTokenData);

    return { token, refreshToken };
  }
}
