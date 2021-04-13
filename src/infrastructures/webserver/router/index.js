import express from "express";
import userRouter from "./user";
import multer from "multer";

import chatRouter from "./chat";

import auth from "../middleware/auth";

import swaggerUI from "swagger-ui-express";
import swaggerDoc from "../../../config/swagger.json";
import upload from "../../bucket/upload";
import response from "../../../module/response";

const routerFunc = (repositories) => {
  const router = express.Router();
  const apiRouter = express.Router();

  apiRouter.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

  apiRouter.use("/auth", userRouter(repositories));

  apiRouter.post(
    "/upload",
    multer({ dest: "temp/", limits: { fieldSize: 8 * 1024 * 1024 } }).single(
      "file"
    ),
    async (req, res, next) => {
      try {
        const dataUrl = await upload(req);

        return response.success(res, {
          message: "File uploaded successfully",
          data: dataUrl,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  apiRouter.use("/", auth(repositories), chatRouter(repositories));

  router.use("/api", apiRouter);

  return router;
};

export default routerFunc;
