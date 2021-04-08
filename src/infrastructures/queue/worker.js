const amqplib = require("amqplib");
const config = require("../../config/env");
const Database = require("../database/mongoose");
const Repository = require("../database/repository");

new Database().connect();

const models = Database.getModels();
const repositories = Repository(models);

const q = "messages";

var amqp_url = config.AMQPURL;

(async () => {
  try {
    console.log("worker running");
    var conn = await amqplib.connect(amqp_url);
    var ch = await conn.createChannel();

    await ch.assertQueue(q, { durable: true });
    return ch.consume(
      q,
      async (msg) => {
        // console.log(JSON.parse(msg.content), "messsage");
        const message = JSON.parse(msg.content);
        await repositories.chatRepository.add(message);
        console.log("worker done");
        ch.ack(msg);
        ch.cancel("myconsumer");
      },
      { consumerTag: "myconsumer" }
    );
  } catch (error) {
    console.log(error);
  }
})();
