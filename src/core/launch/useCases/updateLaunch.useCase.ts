import {
  ILaunchRepository,
  UpdateLaunch,
} from "../../../repository/launch/ILaunchRepository";

export class UpdateLaunchUseCase {
  constructor(private _LaunchRepository: ILaunchRepository) {}

  async execute(params: UpdateLaunch) {
    const launch = await this._LaunchRepository.getById({
      id: params.id,
      userId: params.userId,
    });
    const updatedLaunch = launch.update(params);
    await this._LaunchRepository.update(updatedLaunch.getDTO());
  }
}
