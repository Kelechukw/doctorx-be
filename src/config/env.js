const { config: dotenvConfig } = require("dotenv");
dotenvConfig();

const config = {
  databaseUrl: {
    prod: process.env.MONGODB_PROD_URL,
    dev: process.env.MONGODB_DEV_URL,
    test: process.env.MONGODB_TEST_URL,
  },
  PORT: process.env.PORT || 4000,
  JWTSecret: process.env.JWTSecret,
  nodeEnv: process.env.NODE_ENV,
  AMQPURL: process.env.AMQP_URL,
  redisHost: process.env.REDISCACHEHOSTNAME,
  redisPass: process.env.REDISCACHEKEY,
  AWSAccessKey: process.env.AWSAccessKey,
  secretAccessKey: process.env.secretAccessKey,
  awsRegion: process.env.AWS_REGION,
  useQueue: process.env.USE_QUEUE || false,
};

module.exports = config;
