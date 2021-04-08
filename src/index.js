import server from "./infrastructures/webserver";
import Router from "./infrastructures/webserver/router";
import Database from "./infrastructures/database/mongoose";
import Repository from "./infrastructures/database/repository";
import MQWorkerProcess from "./mq-worker-process";

const database = new Database();
const models = Database.getModels();

const repositories = Repository(models);

const router = Router(repositories);

const webserver = server(router);

const start = async () => {
  webserver.start();
};

// startServer();

database.connect(start);
MQWorkerProcess();
