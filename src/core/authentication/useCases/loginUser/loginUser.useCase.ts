// import { ITokenProvider } from "../../../../repository/token/ITokenProvider";
// import { IRefreshTokenProvider } from "../../../../repository/token/IRefreshTokenProvider";
// import { RefreshToken } from "../../models/RefreshToken";
import { User } from "../../models/User";
import { AuthTokenFacade } from "../../../../repository/token/AuthTokenFacade/AuthTokenFacade";

export abstract class LoginUserTemplate {
  constructor(private _authTokenFacade: AuthTokenFacade) {}

  async execute(credentials: unknown) {
    const user = await this.validadeCredentials(credentials);
    // const token = await this.tokenProvider.create(user.id);
    // const refreshTokenObject = new RefreshToken({ userId: user.id });

    // const refreshToken = await this.refreshTokenProvider.create({
    //   expiresIn: refreshTokenObject.expiresIn,
    //   userId: refreshTokenObject.userId,
    //   id: refreshTokenObject.id,
    // });
    const { token, refreshToken } = await this._authTokenFacade.create({
      userId: user.id,
    });

    return {
      token,
      refreshToken,
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
