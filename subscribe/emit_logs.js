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

        // create exchange
        const exchange = 'logs';

        channel.assertExchange(exchange, 'fanout', { durable: false });

        setInterval(() => {
            let count = gen.next().value;
            const msg = "Hello Count: " + count;
            channel.publish(exchange, '', Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
        }, 1000)

    })
})