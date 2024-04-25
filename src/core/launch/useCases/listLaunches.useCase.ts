import { ILaunchRepository } from "../../../repository/launchRepository/ILaunchRepository";

export class ListLaunchesUseCase {
  constructor(private _LaunchRepository: ILaunchRepository) {}

  async execute() {
    const launches = await this._LaunchRepository.list();

    return launches;
  }
}
