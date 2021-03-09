import { Router } from "express";
import controller from "../../../controllers/User";

const userRouter = (repositories) => {
  const userController = controller(repositories);
  const router = Router();

  router.post("/signup", userController.createUser);
  router.post("/login", userController.loginUser);

  return router;
};

export default userRouter;
