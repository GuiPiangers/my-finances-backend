import { Launch, LaunchDTO } from "../../core/launch/models/Launch";
import { ApiError } from "../../utils/ApiError";
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
  }

  async update(data: UpdateLaunch) {
    launchDataDB = launchDataDB.map((launch) => {
      if (launch.id === data.id && launch.userId === data.userId)
        return Object.assign(launch, data);
      return launch as LaunchDTO;
    });
  }

  async delete({ id, userId }: DeleteLaunch) {
    launchDataDB = launchDataDB.filter((launch) => {
      return userId === launch.id && launch.id !== id;
    });
  }

  async list() {
    return launchDataDB.map((launch) => new Launch(launch));
  }

  async getById({ id, userId }: GetByIdLaunch) {
    const launch = launchDataDB.find(
      (launch) => launch.id === id && launch.userId === userId,
    );
    if (!launch)
      throw new ApiError("Lançamento não encontrado", { statusCode: 400 });

    return new Launch(launch);
  }
}
