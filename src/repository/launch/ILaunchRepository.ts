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
export type GetLaunchById = {
  id: string;
  userId: string;
};
export type ListLaunch = {
  userId: string;
  month: number;
  year: number;
};

export interface ILaunchRepository {
  create(data: CreateLaunch): Promise<void>;
  update(data: UpdateLaunch): Promise<void>;
  delete(data: DeleteLaunch): Promise<void>;
  listByMonthAndYear({ userId, month, year }: ListLaunch): Promise<Launch[]>;
  getById(data: GetLaunchById): Promise<Launch>;
}
