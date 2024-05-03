import { IRefreshTokenProvider } from "../../../../repository/token/IRefreshTokenProvider";
import { IGenerateTokenProvider } from "../../../../repository/token/IGenerateTokenProvider";
import { IUserRepository } from "../../../../repository/user/IUserRepository";
// import { ApiError } from "../../../../utils/ApiError";
import { LoginUserUseCase } from "./loginUser.useCase";
import { OAuth2Client } from "google-auth-library";
import { User } from "../../models/User";

type GoogleCredentials = {
  token: string;
};

export class GoogleLoginUseCase extends LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    refreshTokenProvider: IRefreshTokenProvider,
    generateTokenProvider: IGenerateTokenProvider,
  ) {
    super(refreshTokenProvider, generateTokenProvider);
  }

  protected async validadeCredentials({ token }: GoogleCredentials) {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.AUDIENCE,
    });
    const { email, name } = ticket.getPayload()!;

    const user = await this.userRepository.getByEmail(email!);

    if (!user) {
      const newUser = new User({ email: email!, name: name! });
      this.userRepository.save(await newUser.getDTO());
      return newUser;
    }

    return user;
  }
}
