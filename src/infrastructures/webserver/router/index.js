import express from "express";
import userRouter from "./user";

import auth from "../middleware/auth";

import swaggerUI from "swagger-ui-express";
import swaggerDoc from "../../../config/swagger.json";

const routerFunc = (repositories) => {
  const router = express.Router();
  const apiRouter = express.Router();

  apiRouter.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

  apiRouter.use("/auth", userRouter(repositories));
  router.use("/api", apiRouter);

  return router;
};

export default routerFunc;
