/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryLaunchRepository } from "../../../../repository/launch/InMemory.LaunchRepository";
import { Id } from "../../../shared/Id";
import { Launch, LaunchDTO } from "../../models/Launch";
import { ListLaunchesUseCase } from "../listLaunches.useCase";

describe("List launches use case", () => {
  const userId = new Id();

  const launch = new Launch({
    userId: userId.value,
    date: "2024-01-12",
    description: "Vale transporte",
    type: "revenue",
    status: "payed",
    value: 200,
    category: "Vale",
  }).getDTO();
  const launch2 = new Launch({
    userId: userId.value,
    date: "2024-01-12",
    description: "Salário",
    type: "revenue",
    status: "payed",
    value: 2600,
    category: "Salário",
  }).getDTO();

  const db: LaunchDTO[] = [launch, launch2];
  let inMemoryLaunches = new InMemoryLaunchRepository(db);
  let listLaunchesUseCase = new ListLaunchesUseCase(inMemoryLaunches);

  beforeEach(() => {
    inMemoryLaunches = new InMemoryLaunchRepository(db);
    listLaunchesUseCase = new ListLaunchesUseCase(inMemoryLaunches);
  });

  it("should be able to list all launches of a user", async () => {
    const listLaunches = await listLaunchesUseCase.execute({
      userId: userId.value,
      month: 0,
      year: 2024,
    });

    expect(listLaunches).toEqual(db);
  });

  it("should omit launches from different users", async () => {
    const userId2 = new Id();

    const launch3 = new Launch({
      userId: userId2.value,
      date: "2024-01-12",
      description: "Vale transporte",
      type: "revenue",
      status: "payable",
      value: 230,
      category: "Vale",
    }).getDTO();

    const launch4 = new Launch({
      userId: userId2.value,
      date: "2024-01-12",
      description: "Salário",
      type: "revenue",
      status: "payed",
      value: 2800,
      category: "Salário",
    }).getDTO();

    await inMemoryLaunches.create(launch3);
    await inMemoryLaunches.create(launch4);

    const listLaunches = await listLaunchesUseCase.execute({
      userId: userId2.value,
      month: 0,
      year: 2024,
    });

    expect(listLaunches).not.toEqual(db);
    expect(listLaunches).toEqual([launch3, launch4]);
  });
  it("should show only launches that the month and year are equal to selected values", async () => {
    const launch3 = new Launch({
      userId: userId.value,
      date: "2024-02-12",
      description: "Conta de luz",
      type: "revenue",
      status: "payable",
      value: 150,
      category: "Vale",
    }).getDTO();

    const launch4 = new Launch({
      userId: userId.value,
      date: "2024-02-12",
      description: "Salário",
      type: "revenue",
      status: "payed",
      value: 2000,
      category: "Salário",
    }).getDTO();

    await inMemoryLaunches.create(launch3);
    await inMemoryLaunches.create(launch4);

    const listLaunches = await listLaunchesUseCase.execute({
      userId: userId.value,
      month: 1,
      year: 2024,
    });

    expect(listLaunches).not.toEqual(db);
    expect(listLaunches).toEqual([launch3, launch4]);
  });
});
