import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import config from "../../../config/env";

const getDatabaseUri = () => {
  const nodeEnv = config.nodeEnv;
  const { prod, dev, test } = config.databaseUrl;
  switch (nodeEnv) {
    case "production":
    case "prod":
      return prod;
    case "dev":
    case "development":
      return dev;
    case "test":
      return test;
    default:
      throw new Error("Node Env not set");
  }
};

class Database {
  constructor() {
    this.uri = getDatabaseUri();
  }

  connect(cb = () => {}) {
    try {
      mongoose.connect(this.uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      mongoose.connection.once("open", async () => {
        console.log("database connected");
        cb();
      });
    } catch (error) {
      console.error(error);
    }
  }

  static getModels() {
    let dbModels = {};
    const modelsFolder = __dirname + "/models";

    const models = fs.readdirSync(modelsFolder);

    models.forEach((file) => {
      const model = require(path.join(modelsFolder, file));
      dbModels[model.modelName] = model;
    });
    return dbModels;
  }
}

export default Database;
