import userController from "./chatController";
import userUseCase from "../../use_cases/Chat";

export default (repositories) => {
  const useCases = userUseCase(repositories);

  const controllers = userController(useCases);
  return controllers;
};
