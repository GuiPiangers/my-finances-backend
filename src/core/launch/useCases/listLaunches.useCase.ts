import {
  ILaunchRepository,
  ListLaunch,
} from "../../../repository/launch/ILaunchRepository";

export class ListLaunchesUseCase {
  constructor(private _LaunchRepository: ILaunchRepository) {}

  async execute({ userId }: ListLaunch) {
    const launches = await this._LaunchRepository.list({ userId });

    return launches.map((launch) => launch.getDTO());
  }
}
