/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryLaunchRepository } from "../../../../repository/launch/InMemory.LaunchRepository";
import { LaunchDTO } from "../../models/Launch";
import { DeleteLaunchUseCase } from "../deleteLaunch.useCase";

describe("Delete launch use case", () => {
  const launch: LaunchDTO = {
    userId: "1234",
    id: "123",
    date: "12/04/2024",
    description: "Valor a pagar",
    type: "expenditure",
    status: "payable",
    value: 100,
    category: "Contas",
  };
  let inMemoryLaunches = new InMemoryLaunchRepository();
  let deleteLaunchUseCase = new DeleteLaunchUseCase(inMemoryLaunches);

  beforeEach(() => {
    const db: LaunchDTO[] = [{ ...launch }];
    inMemoryLaunches = new InMemoryLaunchRepository(db);
    deleteLaunchUseCase = new DeleteLaunchUseCase(inMemoryLaunches);
  });
  it("Should delete a launch", async () => {
    const { id, userId } = launch;
    await deleteLaunchUseCase.execute({ id: id!, userId });

    const launchDb = await inMemoryLaunches.list({ userId });
    expect(launchDb).toEqual([]);
  });
});
