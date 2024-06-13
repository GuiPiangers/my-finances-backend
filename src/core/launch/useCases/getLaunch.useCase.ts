import {
  GetLaunchById,
  ILaunchRepository,
} from "../../../repository/launch/ILaunchRepository";

export class GetLaunchUseCase {
  constructor(private _LaunchRepository: ILaunchRepository) {}

  async execute({ userId, id }: GetLaunchById) {
    const launches = await this._LaunchRepository.getById({ userId, id });

    return launches.getDTO();
  }
}
