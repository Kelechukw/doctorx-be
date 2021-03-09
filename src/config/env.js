import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const config = {
  databaseUrl: {
    prod: process.env.MONGODB_PROD_URL,
    dev: process.env.MONGODB_DEV_URL,
    test: process.env.MONGODB_TEST_URL,
  },
  PORT: process.env.PORT || 3000,
  JWTSecret: process.env.JWTSecret,
  nodeEnv: process.env.NODE_ENV,
};

export default config;
