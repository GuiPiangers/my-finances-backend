import { InMemoryLaunchRepository } from "../../../../repository/launchRepository/InMemory.LaunchRepository";
import { CreateLaunchUseCase } from "../../useCases/createLuanch.useCase";
import { CreateLaunchController } from "./CreateLaunch.controller";

const inMemoryLaunchRepository = new InMemoryLaunchRepository();
const createLaunchUseCase = new CreateLaunchUseCase(inMemoryLaunchRepository);
const createLaunchController = new CreateLaunchController(createLaunchUseCase);
export { createLaunchController };
