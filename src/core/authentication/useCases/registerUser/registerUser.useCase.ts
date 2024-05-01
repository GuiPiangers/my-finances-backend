import { User, UserDTO } from "../../models/User";
import { IUserRepository } from "../../../../repository/user/IUserRepository";
import { ApiError } from "../../../../utils/ApiError";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: UserDTO) {
    const userAlreadyExist = await this.userRepository.getByEmail(data.email);
    if (userAlreadyExist) throw new ApiError("Usuário já cadastrado");

    const user = new User(data);
    const userDTO = await user.getDTO();

    this.userRepository.save(userDTO);
    return userDTO;
  }
}
