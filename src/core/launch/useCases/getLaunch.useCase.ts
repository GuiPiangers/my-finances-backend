import {
  GetByIdLaunch,
  ILaunchRepository,
} from "../../../repository/launch/ILaunchRepository";

export class GetLaunchUseCase {
  constructor(private _LaunchRepository: ILaunchRepository) {}

  async execute({ userId, id }: GetByIdLaunch) {
    const launches = await this._LaunchRepository.getById({ userId, id });

    return launches.getDTO();
  }
}
