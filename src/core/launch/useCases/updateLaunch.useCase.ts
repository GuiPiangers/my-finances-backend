import {
  ILaunchRepository,
  UpdateLaunch,
} from "../../../repository/launchRepository/ILaunchRepository";

export class UpdateLaunchUseCase {
  constructor(private _LaunchRepository: ILaunchRepository) {}

  async execute(params: UpdateLaunch) {
    const launchData = await this._LaunchRepository.update(params);

    return launchData;
  }
}
