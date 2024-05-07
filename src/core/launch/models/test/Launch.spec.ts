import { Launch, LaunchDTO } from "../Launch";

describe("Launch test", () => {
  it("Should be able to get Launch DTO", () => {
    const launchData: LaunchDTO = {
      date: "2024-10-24",
      description: "Salário da empresa",
      status: "payed",
      type: "revenue",
      value: 1200,
      category: "Salário",
      userId: "12345",
    };
    const launch = new Launch(launchData);

    expect(launch).toHaveProperty("getDTO");
    expect(launch.getDTO()).toEqual({ id: launch.id, ...launchData });
  });
  it("Should set positive value if type is revenue", () => {
    const value = 2000;
    const launchData: LaunchDTO = {
      date: "2024-10-24",
      description: "Salário da empresa",
      status: "payed",
      type: "revenue",
      value: -value,
      category: "Salário",
      userId: "12345",
    };
    const launch = new Launch(launchData);

    expect(launch.value).toBe(value);
  });
  it("Should set negative value if type is expenditure", () => {
    const value = 500;
    const launchData: LaunchDTO = {
      date: "2024-10-24",
      description: "Conta de luz",
      status: "payed",
      type: "expenditure",
      value,
      category: "Contas",
      userId: "12345",
    };
    const launch = new Launch(launchData);

    expect(launch.value).toBe(-value);
  });
  it("Should be able to update creating a new instance", () => {
    const launchData: LaunchDTO = {
      date: "2024-10-24",
      description: "Conta de luz",
      status: "payed",
      type: "expenditure",
      value: 600,
      category: "Contas",
      userId: "12345",
    };
    const launch = new Launch(launchData);

    const updateData: Partial<LaunchDTO> = {
      type: "revenue",
      value: 2500,
      category: "Salário",
      description: "Salário da empresa",
    };
    const updatedLaunch = launch.update(updateData);

    expect(launch).toHaveProperty("update");
    expect(updatedLaunch).toBeInstanceOf(Launch);

    expect(updatedLaunch.type).toBe(updateData.type);
    expect(updatedLaunch.value).toBe(updateData.value);
    expect(updatedLaunch.category).toBe(updateData.category);
    expect(updatedLaunch.description).toBe(updateData.description);

    expect(updatedLaunch.id).toBe(launch.id);
    expect(updatedLaunch.status).toBe(launch.status);
    expect(updatedLaunch.userId).toBe(launch.userId);
  });
});
