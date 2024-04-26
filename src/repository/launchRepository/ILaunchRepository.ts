import { LaunchDTO } from "../../core/launch/models/Launch";

export type CreateLaunch = LaunchDTO;
export type UpdateLaunch = Partial<LaunchDTO> & {
  id: string;
  userId: string;
};
export type DeleteLaunch = {
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
  create(data: CreateLaunch): Promise<LaunchDTO | undefined>;
  update(data: UpdateLaunch): Promise<LaunchDTO | undefined>;
  delete(data: DeleteLaunch): Promise<void>;
  list(): Promise<LaunchDTO[]>;
  getById(data: GetByIdLaunch): Promise<LaunchDTO | undefined>;
}
