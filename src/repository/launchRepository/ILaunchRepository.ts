import { LaunchDTO } from "../../core/launch/models/Launch";

export type CreateLaunch = LaunchDTO;
export type UpdateLaunch = Partial<LaunchDTO> & {
  id: string;
  userId: string;
};
export type deleteLaunch = {
  id: string;
  userId: string;
};
export type GetByIdLaunch = {
  id: string;
  userId: string;
};
export type ListLaunch = {
  userId: string;
};

export interface ILaunchRepository {
  create(data: CreateLaunch): Promise<void>;
  update(data: UpdateLaunch): Promise<void>;
  delete(data: deleteLaunch): Promise<void>;
  list(data: ListLaunch): Promise<LaunchDTO[]>;
  getById(data: GetByIdLaunch): Promise<LaunchDTO | undefined>;
}
