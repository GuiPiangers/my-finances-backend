import {
  CreateLaunch,
  ILaunchRepository,
} from "../../../repository/launch/ILaunchRepository";
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
      id,
    } = new Launch(params);

    const launchData = await this._LaunchRepository.create({
      date: ISODate,
      description,
      status,
      type,
      userId,
      category,
      value,
      id,
    });

    return launchData;
  }
}
