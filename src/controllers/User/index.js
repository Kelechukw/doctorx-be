import userController from "./userController";
import userUseCase from "../../use_cases/User";

module.exports = (repositories) => {
  const useCases = userUseCase(repositories);

  const controllers = userController(useCases);
  return controllers;
};
