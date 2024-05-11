import { AuthTokenFacade } from "../../../../repository/token/AuthTokenFacade/AuthTokenFacade";

export class LogoutUseCase {
  constructor(private refreshTokenProvider: AuthTokenFacade) {}

  async execute(userId: string) {
    await this.refreshTokenProvider.logout({ userId });
  }
}
