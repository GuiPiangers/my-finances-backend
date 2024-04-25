import { InMemoryLaunchRepository } from "../../../../repository/launchRepository/InMemory.LaunchRepository";
import { ListLaunchesUseCase } from "../../useCases/listLaunches.useCase";
import { ListLaunchesController } from "./ListLaunches.controller";

const inMemoryLaunchRepository = new InMemoryLaunchRepository();
const listLaunchesUseCase = new ListLaunchesUseCase(inMemoryLaunchRepository);
const listLaunchesController = new ListLaunchesController(listLaunchesUseCase);
export { listLaunchesController };
