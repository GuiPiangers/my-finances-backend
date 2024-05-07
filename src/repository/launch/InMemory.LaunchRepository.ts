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
  private _dataBase: LaunchDTO[] | undefined;
  constructor(dataBase?: LaunchDTO[]) {
    this._dataBase = dataBase;
  }

  async create(data: CreateLaunch) {
    if (this._dataBase) this._dataBase.push(data);
    else launchDataDB.push(data);
  }

  async update(data: UpdateLaunch) {
    const updateArray = (array: LaunchDTO[]) => {
      return array.map((launch) => {
        if (launch.id === data.id && launch.userId === data.userId)
          return Object.assign(launch, data);
        return launch as LaunchDTO;
      });
    };

    if (this._dataBase) this._dataBase = updateArray(this._dataBase);
    else launchDataDB = updateArray(launchDataDB);
  }

  async delete({ id, userId }: DeleteLaunch) {
    const deleteLaunch = (array: LaunchDTO[]) => {
      return array.filter((launch) => {
        return userId === launch.id && launch.id !== id;
      });
    };

    if (this._dataBase) this._dataBase = deleteLaunch(this._dataBase);
    else launchDataDB = deleteLaunch(launchDataDB);
  }

  async list({ userId }: { userId: string }) {
    if (this._dataBase)
      return this._dataBase
        .filter((launch) => launch.userId === userId)
        .map((launch) => new Launch(launch));
    return launchDataDB
      .filter((launch) => launch.userId === userId)
      .map((launch) => new Launch(launch));
  }

  async getById({ id, userId }: GetByIdLaunch) {
    const find = (array: LaunchDTO[]) => {
      return array.find(
        (launch) => launch.id === id && launch.userId === userId,
      );
    };
    const launch = this._dataBase ? find(this._dataBase) : find(launchDataDB);

    if (!launch)
      throw new ApiError("Lançamento não encontrado", { statusCode: 400 });

    return new Launch(launch);
  }
}
