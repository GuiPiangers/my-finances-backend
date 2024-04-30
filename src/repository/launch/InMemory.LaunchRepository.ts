import { LaunchDTO } from "../../core/launch/models/Launch";
import {
  CreateLaunch,
  GetByIdLaunch,
  ILaunchRepository,
  UpdateLaunch,
  DeleteLaunch,
} from "./ILaunchRepository";

let launchDataDB: LaunchDTO[] = [];

export class InMemoryLaunchRepository implements ILaunchRepository {
  async create(data: CreateLaunch) {
    launchDataDB.push(data);
    return data;
  }

  async update(data: UpdateLaunch) {
    launchDataDB = launchDataDB.map((launch) => {
      if (launch.id === data.id && launch.userId === data.userId)
        return Object.assign(launch, data);
      return launch as LaunchDTO;
    });

    return this.getById({ id: data.id, userId: data.userId });
  }

  async delete({ id, userId }: DeleteLaunch) {
    launchDataDB = launchDataDB.filter((launch) => {
      return userId === launch.id && launch.id !== id;
    });
  }

  async list() {
    return launchDataDB;
  }

  async getById({ id, userId }: GetByIdLaunch) {
    return launchDataDB.find(
      (launch) => launch.id === id && launch.userId === userId,
    );
  }
}
