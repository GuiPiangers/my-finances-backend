import { User, UserDTO } from "../../core/authentication/models/User";

export interface IUserRepository {
  getByEmail(email: string): Promise<User>;
  getById(userId: string): Promise<User>;
  save(data: UserDTO): Promise<void>;
}
