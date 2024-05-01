import { ILaunchRepository } from "../../../repository/launch/ILaunchRepository";

export class ListLaunchesUseCase {
  constructor(private _LaunchRepository: ILaunchRepository) {}

  async execute() {
    const launches = await this._LaunchRepository.list();

    return launches.map((launch) => launch.getDTO());
  }
}
