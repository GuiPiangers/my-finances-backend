import { InMemoryLaunchRepository } from "../../../../repository/launch/InMemory.LaunchRepository";
import { DateTime } from "../../../shared/Date";
import { LaunchDTO } from "../../models/Launch";
import { CreateLaunchUseCase } from "../createLaunch.useCase";

describe("Create launch use case", () => {
  let inMemoryLaunches = new InMemoryLaunchRepository();
  let createLaunchUseCase = new CreateLaunchUseCase(inMemoryLaunches);

  beforeEach(() => {
    const db: LaunchDTO[] = [];
    inMemoryLaunches = new InMemoryLaunchRepository(db);
    createLaunchUseCase = new CreateLaunchUseCase(inMemoryLaunches);
  });

  it("should be able to create a launch", async () => {
    const launchData = {
      date: "24/10/2024",
      description: "Salário da empresa",
      status: "payed",
      type: "revenue",
      value: 1200,
      category: "Salário",
      userId: "12345",
    } as LaunchDTO;

    await createLaunchUseCase.execute(launchData);

    const [newLaunch] = await inMemoryLaunches.list({
      userId: launchData.userId,
    });

    expect(newLaunch).toHaveProperty("id");
    expect(newLaunch.date).toBeInstanceOf(DateTime);
    expect(newLaunch.date.ISODate).toBe("2024-10-24");
    expect(newLaunch.description).toBe(launchData.description);
    expect(newLaunch.status).toBe(launchData.status);
    expect(newLaunch.type).toBe(launchData.type);
    expect(newLaunch.category).toBe(launchData.category);
    expect(newLaunch.userId).toBe(launchData.userId);
  });
});
