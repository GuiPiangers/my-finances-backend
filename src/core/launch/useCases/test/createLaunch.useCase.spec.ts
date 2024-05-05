/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryLaunchRepository } from "../../../../repository/launch/InMemory.LaunchRepository";
import { LaunchDTO } from "../../models/Launch";
import { CreateLaunchUseCase } from "../createLaunch.useCase";

const createLaunch = () => {
  const inMemoryLaunches = new InMemoryLaunchRepository();
  const createLaunchUseCase = new CreateLaunchUseCase(inMemoryLaunches);
  return createLaunchUseCase;
};

describe("Create launch", () => {
  let inMemoryLaunches = new InMemoryLaunchRepository();
  let createLaunchUseCase = new CreateLaunchUseCase(inMemoryLaunches);

  beforeAll(() => {
    inMemoryLaunches = new InMemoryLaunchRepository();
    createLaunchUseCase = new CreateLaunchUseCase(inMemoryLaunches);
  });
  it("should be able to create a launch", () => {
    const launchData = {
      date: "24/10/2024",
      description: "Salário da empresa",
      status: "payed",
      type: "revenue",
      value: 1200,
      category: "Salário",
      userId: "12345",
    } as LaunchDTO;
    const createLaunchUseCase = createLaunch().execute(launchData);

    expect(createLaunchUseCase).toHaveBeenCalledTimes(1);
    expect(createLaunchUseCase).toHaveBeenCalledWith(launchData);
  });
});
