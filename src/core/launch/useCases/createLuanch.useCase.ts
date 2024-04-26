import {
  CreateLaunch,
  ILaunchRepository,
} from "../../../repository/launchRepository/ILaunchRepository";
import { Launch } from "../models/Launch";

export class CreateLaunchUseCase {
  constructor(private _LaunchRepository: ILaunchRepository) {}

  async execute(params: CreateLaunch) {
    const {
      category,
      date: { ISODate },
      description,
      status,
      type,
      userId,
      value,
    } = new Launch(params);

    const launchData = await this._LaunchRepository.create({
      date: ISODate,
      description,
      status,
      type,
      userId,
      category,
      value,
    });

    return launchData;
  }
}
