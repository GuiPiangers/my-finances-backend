import { User, UserDTO } from "../../core/authentication/models/User";
import { IUserRepository } from "./IUserRepository";

const userDB: UserDTO[] = [];

export class InMemoryUserRepository implements IUserRepository {
  async getByEmail(email: string): Promise<User | undefined> {
    const userDTO = await userDB.find((user) => user.email === email);
    if (!userDTO) return undefined;
    const user = new User(userDTO);
    return user;
  }

  async getById(userId: string): Promise<User | undefined> {
    const userDTO = await userDB.find((user) => user.id === userId);
    if (!userDTO) return undefined;
    const user = new User(userDTO);
    return user;
  }

  async save(data: UserDTO): Promise<void> {
    userDB.push(data);
  }
}
