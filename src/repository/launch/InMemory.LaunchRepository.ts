import { Launch, LaunchDTO } from "../../core/launch/models/Launch";
import { ApiError } from "../../utils/ApiError";
import {
  CreateLaunch,
  GetByIdLaunch,
  ILaunchRepository,
  UpdateLaunch,
  DeleteLaunch,
} from "./ILaunchRepository";

export class InMemoryLaunchRepository implements ILaunchRepository {
  private _dataBase: LaunchDTO[] = [];
  constructor(dataBase?: LaunchDTO[]) {
    this._dataBase = dataBase || [];
  }

  async create(data: CreateLaunch) {
    this._dataBase.push(data);
  }

  async update(data: UpdateLaunch) {
    this._dataBase = this._dataBase.map((launch) => {
      if (launch.id === data.id && launch.userId === data.userId)
        return Object.assign(launch, data);
      return launch as LaunchDTO;
    });
  }

  async delete({ id }: DeleteLaunch) {
    this._dataBase = this._dataBase.filter((launch) => {
      return launch.id !== id;
    });
  }

  async list({ userId }: { userId: string }) {
    return this._dataBase
      .filter((launch) => launch.userId === userId)
      .map((launch) => new Launch(launch));
  }

  async getById({ id, userId }: GetByIdLaunch) {
    const launch = this._dataBase.find(
      (launch) => launch.id === id && launch.userId === userId,
    );

    if (!launch)
      throw new ApiError("Lançamento não encontrado", { statusCode: 400 });

    return new Launch(launch);
  }
}

export const inMemoryLaunchRepository = new InMemoryLaunchRepository();
