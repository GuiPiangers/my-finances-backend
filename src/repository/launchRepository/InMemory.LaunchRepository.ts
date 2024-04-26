import { LaunchDTO } from "../../core/launch/models/Launch";
import {
  CreateLaunch,
  GetByIdLaunch,
  ILaunchRepository,
  UpdateLaunch,
  DeleteLaunch,
} from "./ILaunchRepository";

const launchDataDB: LaunchDTO[] = [];

export class InMemoryLaunchRepository implements ILaunchRepository {
  private _launchData: LaunchDTO[] = [
    {
      date: "10",
      status: "payable",
      userId: "",
      description: "",
      type: "revenue",
    },
  ];

  async create(data: CreateLaunch) {
    this._launchData.push(data);
    launchDataDB.push(data);
    return data;
  }

  async update(data: UpdateLaunch) {
    this._launchData = this._launchData.map((launch) => {
      if (launch.id === data.id && launch.userId === data.userId)
        return data as LaunchDTO;
      return data as LaunchDTO;
    });

    return data as LaunchDTO;
  }

  async delete({ id, userId }: DeleteLaunch) {
    this._launchData = this._launchData.filter((launch) => {
      return userId === launch.id && launch.id !== id;
    });
  }

  async list() {
    return launchDataDB;
  }

  async getById({ id, userId }: GetByIdLaunch) {
    return this._launchData.find(
      (launch) => launch.id === id && launch.userId === userId,
    );
  }
}
