import express from "express";
import secure from "express-force-https";
import cors from "cors";
import http from "http";
import webSocketWorker from "../websocket";

import config from "../../config/env";
import errorHandler from "./errorHandler";

export default (router) => {
  const app = express();

  app.disable("x-powered-by");
  app.use(secure).use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(router);

  errorHandler(app);
  const server = http.createServer(app);
  webSocketWorker(server);

  const applyMiddleware = (middleware) => {
    app.use(middleware);
  };

  const start = () => {
    server.listen(config.PORT, () => {
      console.log("App started at " + config.PORT);
    });
  };

  return {
    start,
    applyMiddleware,
  };
};
