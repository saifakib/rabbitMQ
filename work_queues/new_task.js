const amqp = require("amqplib/callback_api");
const generator = require("../utils/counter");

const gen = generator();


amqp.connect('amqp://localhost', (err, connection) => {
    if(err) {
        throw err;
    }

    connection.createChannel((err1, channel) => {
        if(err1) {
            throw err1;
        }

        const queue = 'task_queue'

        channel.assertQueue(queue, { durable: true })

        setInterval(function() {
            const msg = process.argv.slice(2).join(' ') || "Hello, RabbitMQ! " + gen.next().value;
            channel.sendToQueue(queue, Buffer.from(msg), {
              persistent: true
            });
            console.log("Sent message:", msg);
          }, 1000);

    })
})