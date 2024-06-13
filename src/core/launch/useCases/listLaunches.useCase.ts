import {
  ILaunchRepository,
  ListLaunch,
} from "../../../repository/launch/ILaunchRepository";

export class ListLaunchesUseCase {
  constructor(private _LaunchRepository: ILaunchRepository) {}

  async execute({ userId, month, year }: ListLaunch) {
    const launches = await this._LaunchRepository.listByMonthAndYear({
      userId,
      month,
      year,
    });

    return launches.map((launch) => launch.getDTO());
  }
}
