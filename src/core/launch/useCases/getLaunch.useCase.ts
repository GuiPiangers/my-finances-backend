import {
  GetByIdLaunch,
  ILaunchRepository,
} from "../../../repository/launchRepository/ILaunchRepository";

export class getLaunchesUseCase {
  constructor(private _LaunchRepository: ILaunchRepository) {}

  async execute({ userId, id }: GetByIdLaunch) {
    const launches = await this._LaunchRepository.getById({ userId, id });

    return launches;
  }
}
