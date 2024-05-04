import { IRefreshTokenProvider } from "../../../../repository/token/IRefreshTokenProvider";
import { ITokenProvider } from "../../../../repository/token/ITokenProvider";
import { IUserRepository } from "../../../../repository/user/IUserRepository";
// import { ApiError } from "../../../../utils/ApiError";
import { LoginUserTemplate } from "./loginUser.useCase";
import { OAuth2Client } from "google-auth-library";
import { User } from "../../models/User";
import { ApiError } from "../../../../utils/ApiError";

type GoogleCredentials = {
  token: string;
};

export class GoogleLoginUseCase extends LoginUserTemplate {
  constructor(
    private userRepository: IUserRepository,
    refreshTokenProvider: IRefreshTokenProvider,
    generateTokenProvider: ITokenProvider,
  ) {
    super(refreshTokenProvider, generateTokenProvider);
  }

  protected async validadeCredentials({ token }: GoogleCredentials) {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.AUDIENCE,
    });
    const payload = ticket.getPayload();
    if (!ticket || !payload)
      throw new ApiError("Falha na autenticação", { statusCode: 401 });
    const { email, name, email_verified: emailVerified } = payload;

    const user = await this.userRepository.getByEmail(email!);

    if (!user) {
      const newUser = new User({ email: email!, name: name!, emailVerified });
      this.userRepository.save(await newUser.getDTO());
      return newUser;
    }

    return user;
  }
}
