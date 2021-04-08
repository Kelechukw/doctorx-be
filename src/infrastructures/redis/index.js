import redis from "redis";
import { promisify } from "util";
import config from "../../config/env";

// Add your cache name and access key.
const connect = () => {
  const client = redis.createClient({
    host: config.redisHost,
    port: 6379,
    password: config.redisPass,
  });
  client.on("error", function (error) {
    console.error(error);
  });

  client.on("connect", function (error) {
    console.log("redis connected");
  });
  client.flushall();
  client.flushdb();

  const get = promisify(client.get).bind(client);
  const set = promisify(client.set).bind(client);
  const hmset = promisify(client.hmset).bind(client);
  const hgetall = promisify(client.hgetall).bind(client);
  const keys = promisify(client.keys).bind(client);
  const sadd = promisify(client.sadd).bind(client);
  const srem = promisify(client.srem).bind(client);
  const smembers = promisify(client.smembers).bind(client);
  const rpush = promisify(client.rpush).bind(client);
  const lrange = promisify(client.lrange).bind(client);

  return {
    set,
    get,
    hmset,
    hgetall,
    keys,
    sadd,
    smembers,
    rpush,
    lrange,
    srem,
  };
};

export default {
  connect,
};
