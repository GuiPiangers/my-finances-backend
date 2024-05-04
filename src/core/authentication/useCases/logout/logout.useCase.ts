import { IRefreshTokenProvider } from "../../../../repository/token/IRefreshTokenProvider";

export class LogoutUseCase {
  constructor(private refreshTokenProvider: IRefreshTokenProvider) {}

  async execute(userId: string) {
    await this.refreshTokenProvider.delete(userId);
  }
}
