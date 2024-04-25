import {
  CreateLaunch,
  ILaunchRepository,
} from "../../../repository/launchRepository/ILaunchRepository";

export class CreateLaunchUseCase {
  constructor(private _LaunchRepository: ILaunchRepository) {}

  async execute(params: CreateLaunch) {
    const launchData = await this._LaunchRepository.create(params);

    return launchData;
  }
}
