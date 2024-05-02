import { IRefreshTokenProvider } from "../../../../repository/token/IRefreshTokenProvider";
import { IGenerateTokenProvider } from "../../../../repository/token/IGenerateTokenProvider";
import { IUserRepository } from "../../../../repository/user/IUserRepository";
import { Crypto } from "../../../shared/helpers/Crypto";
import { ApiError } from "../../../../utils/ApiError";
import { LoginUserUseCase } from "./loginUser.useCase";

type PasswordCredentials = {
  email: string;
  password: string;
};

export class PasswordLoginUseCase extends LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    refreshTokenProvider: IRefreshTokenProvider,
    generateTokenProvider: IGenerateTokenProvider,
  ) {
    super(refreshTokenProvider, generateTokenProvider);
  }

  async validadeCredentials({ email, password }: PasswordCredentials) {
    const user = await this.userRepository.getByEmail(email);
    if (!user || !user.id) throw new ApiError("Email ou senha inválidos");
    if (!user.password)
      throw new ApiError("Usuário foi registrado com outro provedor");

    const passwordMatch = await Crypto.compareHash(
      password,
      await user.password?.getHash(),
    );
    if (!passwordMatch) throw new ApiError("Email ou senha inválidos");

    return user;
  }
}
