import { LaunchDTO } from "../../core/launch/models/Launch";
import {
  CreateLaunch,
  GetByIdLaunch,
  ILaunchRepository,
  ListLaunch,
  UpdateLaunch,
  deleteLaunch,
} from "./ILaunchRepository";

export class InMemoryLaunchRepository implements ILaunchRepository {
  private _launchData: LaunchDTO[] = [];

  async create(data: CreateLaunch) {
    this._launchData.push(data);
  }

  async update(data: UpdateLaunch) {
    this._launchData = this._launchData.map((launch) => {
      if (launch.id === data.id && launch.userId === data.userId)
        return data as LaunchDTO;
      return launch as LaunchDTO;
    });
  }

  async delete({ id, userId }: deleteLaunch) {
    this._launchData = this._launchData.filter((launch) => {
      return userId === launch.id && launch.id !== id;
    });
  }

  async list({ userId }: ListLaunch) {
    return this._launchData.filter((launch) => launch.userId === userId);
  }

  async getById({ id, userId }: GetByIdLaunch) {
    return this._launchData.find(
      (launch) => launch.id === id && launch.userId === userId,
    );
  }
}
