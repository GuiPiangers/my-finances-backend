import { Launch, LaunchDTO } from "../../core/launch/models/Launch";

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
  create(data: CreateLaunch): Promise<void>;
  update(data: UpdateLaunch): Promise<void>;
  delete(data: DeleteLaunch): Promise<void>;
  list(): Promise<Launch[]>;
  getById(data: GetByIdLaunch): Promise<Launch>;
}
