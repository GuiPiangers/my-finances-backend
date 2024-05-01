import { IRefreshTokenProvider } from "../../../../repository/token/IRefreshTokenProvider";

export class LogoutUseCase {
  constructor(private refreshTokenProvider: IRefreshTokenProvider) {}

  async execute(refreshTokenId: string) {
    await this.refreshTokenProvider.delete(refreshTokenId);
  }
}
