import {
  CreateLaunch,
  ILaunchRepository,
} from "../../../repository/launch/ILaunchRepository";
import { Launch } from "../models/Launch";

export class CreateLaunchUseCase {
  constructor(private _LaunchRepository: ILaunchRepository) {}

  async execute(params: CreateLaunch) {
    const launch = new Launch(params);
    launch.update({ value: 1000, type: "revenue" });

    await this._LaunchRepository.create(launch.getDTO());
  }
}
