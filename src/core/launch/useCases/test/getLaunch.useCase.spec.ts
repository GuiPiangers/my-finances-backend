/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryLaunchRepository } from "../../../../repository/launch/InMemory.LaunchRepository";
import { ApiError } from "../../../../utils/ApiError";
import { Id } from "../../../shared/Id";
import { Launch, LaunchDTO } from "../../models/Launch";
import { GetLaunchUseCase } from "../getLaunch.useCase";

describe("Get launch use case", () => {
  const userId = new Id().value;
  const launch: LaunchDTO = new Launch({
    userId,
    date: "2024-04-12",
    description: "Valor a pagar",
    type: "expenditure",
    status: "payable",
    value: 100,
    category: "Contas",
  }).getDTO();

  let inMemoryLaunches = new InMemoryLaunchRepository();
  let getLaunchUseCase = new GetLaunchUseCase(inMemoryLaunches);

  beforeEach(() => {
    const db: LaunchDTO[] = [{ ...launch }];
    inMemoryLaunches = new InMemoryLaunchRepository(db);
    getLaunchUseCase = new GetLaunchUseCase(inMemoryLaunches);
  });

  it("Should be able to get a launch", async () => {
    const launchData = await getLaunchUseCase.execute({
      userId: launch.userId,
      id: launch.id!,
    });

    expect(launchData).toEqual(launch);
  });
  it("Should throw an error if no launch found", async () => {
    const wrongId = new Id().value;
    const launchData = getLaunchUseCase.execute({
      userId: launch.userId,
      id: wrongId,
    });

    await expect(launchData).rejects.toEqual(
      new ApiError("Lançamento não encontrado", { statusCode: 400 }),
    );
  });
});
