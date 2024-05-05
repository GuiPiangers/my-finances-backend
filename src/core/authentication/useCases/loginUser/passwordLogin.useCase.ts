import { IUserRepository } from "../../../../repository/user/IUserRepository";
import { Crypto } from "../../../shared/helpers/Crypto";
import { ApiError } from "../../../../utils/ApiError";
import { LoginUserTemplate } from "./loginUser.useCase";
import { AuthTokenFacade } from "../../../../repository/token/AuthTokenFacade/AuthTokenFacade";

type PasswordCredentials = {
  email: string;
  password: string;
};

export class PasswordLoginUseCase extends LoginUserTemplate {
  constructor(
    private _userRepository: IUserRepository,
    authTokenFacade: AuthTokenFacade,
  ) {
    super(authTokenFacade);
  }

  async validadeCredentials({ email, password }: PasswordCredentials) {
    const user = await this._userRepository.getByEmail(email);
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
