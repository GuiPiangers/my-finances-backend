import { RefreshTokenDTO } from "../../core/authentication/models/RefreshToken";

export interface IRefreshTokenProvider {
  create(refreshToken: RefreshTokenDTO): Promise<void>;
  get(id: string): Promise<RefreshTokenDTO | undefined>;
  delete(id: string): Promise<void>;
}
