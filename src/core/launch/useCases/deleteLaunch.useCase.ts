import {
  ILaunchRepository,
  DeleteLaunch,
} from "../../../repository/launch/ILaunchRepository";

export class DeleteLaunchUseCase {
  constructor(private _LaunchRepository: ILaunchRepository) {}

  async execute({ userId, id }: DeleteLaunch) {
    const launches = await this._LaunchRepository.delete({ userId, id });

    return launches;
  }
}
