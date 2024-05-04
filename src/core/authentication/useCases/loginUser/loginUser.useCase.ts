import { ITokenProvider } from "../../../../repository/token/ITokenProvider";
import { IRefreshTokenProvider } from "../../../../repository/token/IRefreshTokenProvider";
import { RefreshToken } from "../../models/RefreshToken";
import { User } from "../../models/User";

export abstract class LoginUserTemplate {
  constructor(
    private refreshTokenProvider: IRefreshTokenProvider,
    private generateTokenProvider: ITokenProvider,
  ) {}

  async execute(credentials: unknown) {
    const user = await this.validadeCredentials(credentials);
    const token = await this.generateTokenProvider.create(user.id);
    console.log(token);
    const refreshToken = new RefreshToken({ userId: user.id });

    await this.refreshTokenProvider.create({
      expiresIn: refreshToken.expiresIn,
      userId: refreshToken.userId,
      id: refreshToken.id,
    });

    return {
      token,
      refreshToken: refreshToken.id,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
    };
  }

  protected abstract validadeCredentials(credentials: unknown): Promise<User>;
}
