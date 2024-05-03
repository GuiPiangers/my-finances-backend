import { User, UserDTO } from "../../core/authentication/models/User";

export interface IUserRepository {
  getByEmail(email: string): Promise<User | undefined>;
  getById(userId: string): Promise<User | undefined>;
  save(data: UserDTO): Promise<void>;
}
