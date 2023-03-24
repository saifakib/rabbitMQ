const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, connection) => {
  if (err) {
    throw err;
  }

  connection.createChannel((err1, channel) => {
    if (err1) {
      throw err1;
    }

    const queue = "technical";
    const queue1 = "technical1";
    const msg = "This from sender file";

    channel.assertQueue(queue, { durable: false });

    let i = 1;
    const intervalId = setInterval(() => {
      if (i % 2 == 0) {
        channel.sendToQueue(queue, Buffer.from(`${msg} - ${i}`));
        console.log(" [x] Sent %s", `${msg} - ${i}`);
      } else {
        channel.sendToQueue(queue1, Buffer.from(`${msg} - ${i}`));
        console.log(" [x] Sent %s", `${msg} - ${i}`);
      }

      i++;
      if (i > 20) {
        clearInterval(intervalId); 
      }
    }, 1000);
  });
});
