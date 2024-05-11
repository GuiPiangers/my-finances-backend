/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdateLaunch } from "../../../../repository/launch/ILaunchRepository";
import { InMemoryLaunchRepository } from "../../../../repository/launch/InMemory.LaunchRepository";
import { Id } from "../../../shared/Id";
import { Launch, LaunchDTO } from "../../models/Launch";
import { UpdateLaunchUseCase } from "../updateLaunch.useCase";

describe("Update launch use case", () => {
  const userId = new Id();
  const launch = new Launch({
    userId: userId.value,
    date: "2024-04-12",
    description: "Vale transporte",
    type: "revenue",
    status: "payed",
    value: 200,
    category: "Vale",
  }).getDTO();

  const db: LaunchDTO[] = [{ ...launch }];
  let inMemoryLaunches = new InMemoryLaunchRepository(db);
  let updateLaunchUseCase = new UpdateLaunchUseCase(inMemoryLaunches);

  beforeEach(() => {
    const db: LaunchDTO[] = [{ ...launch }];
    inMemoryLaunches = new InMemoryLaunchRepository(db);
    updateLaunchUseCase = new UpdateLaunchUseCase(inMemoryLaunches);
  });

  it("Should be able to update a launch", async () => {
    const launchData: UpdateLaunch = {
      id: launch.id,
      userId: launch.userId,
      category: "Salário",
      description: "Salário",
      value: 2800,
      type: "revenue",
      date: "2023-12-24",
      status: "payed",
    };
    await updateLaunchUseCase.execute(launchData);

    const updatedLaunch = await inMemoryLaunches.getById({
      userId: launch.userId,
      id: launch.id,
    });

    expect(updatedLaunch.id).toBe(launchData.id);
    expect(updatedLaunch.userId).toBe(launchData.userId);
    expect(updatedLaunch.category).toBe(launchData.category);
    expect(updatedLaunch.description).toBe(launchData.description);
    expect(updatedLaunch.value).toBe(launchData.value);
    expect(updatedLaunch.type).toBe(launchData.type);
    expect(updatedLaunch.date.ISODate).toBe(launchData.date);
    expect(updatedLaunch.status).toBe(launchData.status);
  });
  it("Should keep the values not updated", async () => {
    const launchData: UpdateLaunch = {
      id: launch.id,
      userId: launch.userId,
    };
    await updateLaunchUseCase.execute(launchData);

    const updatedLaunch = await inMemoryLaunches.getById({
      userId: launch.userId,
      id: launch.id,
    });

    expect(updatedLaunch.id).toBe(launch.id);
    expect(updatedLaunch.userId).toBe(launch.userId);
    expect(updatedLaunch.category).toBe(launch.category);
    expect(updatedLaunch.description).toBe(launch.description);
    expect(updatedLaunch.value).toBe(launch.value);
    expect(updatedLaunch.type).toBe(launch.type);
    expect(updatedLaunch.date.ISODate).toBe(launch.date);
    expect(updatedLaunch.status).toBe(launch.status);
  });
});
