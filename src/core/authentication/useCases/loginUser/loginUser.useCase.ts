import { IGenerateTokenProvider } from "../../../../repository/token/IGenerateTokenProvider";
import { IRefreshTokenProvider } from "../../../../repository/token/IRefreshTokenProvider";
import { RefreshToken } from "../../models/RefreshToken";
import { User } from "../../models/User";

export abstract class LoginUserUseCase {
  constructor(
    private refreshTokenProvider: IRefreshTokenProvider,
    private generateTokenProvider: IGenerateTokenProvider,
  ) {}

  async execute(credentials: unknown) {
    const user = await this.validadeCredentials(credentials);
    const token = await this.generateTokenProvider.execute(user.id);
    console.log(token);
    const refreshToken = new RefreshToken({ userId: user.id });

    await this.refreshTokenProvider.generate({
      expiresIn: refreshToken.expiresIn,
      userId: refreshToken.userId,
      id: refreshToken.id,
    });

    return {
      token,
      refreshToken: refreshToken.id,
      user: {
        email: user.email,
        name: user.name,
      },
    };
  }

  protected abstract validadeCredentials(credentials: unknown): Promise<User>;
}
