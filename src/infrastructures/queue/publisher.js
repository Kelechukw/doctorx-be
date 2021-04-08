import amqplib from "amqplib";
import config from "../../config/env";
const q = "messages";

var amqp_url = config.AMQPURL;

const publishToQueue = async (data) => {
  try {
    console.log("Publishing");
    var conn = await amqplib.connect(amqp_url, "heartbeat=60");
    var ch = await conn.createChannel();
    var exch = "exchange";
    var rkey = "route";
    await ch
      .assertExchange(exch, "direct", { durable: true })
      .catch(console.error);
    await ch.assertQueue(q, { durable: true });
    await ch.bindQueue(q, exch, rkey);
    await ch.publish(exch, rkey, Buffer.from(JSON.stringify(data)));
    console.log("published");
  } catch (error) {
    console.log(error);
  }
};

export default publishToQueue;
