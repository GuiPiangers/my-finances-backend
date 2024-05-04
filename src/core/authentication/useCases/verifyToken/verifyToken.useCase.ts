import { ITokenProvider } from "../../../../repository/token/ITokenProvider";

export class VerifyTokenUseCase {
  constructor(private _tokenProvider: ITokenProvider) {}

  execute(token: string) {
    return this._tokenProvider.verify(token);
  }
}
