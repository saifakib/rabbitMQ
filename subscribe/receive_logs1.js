const amqp = require("amqplib/callback_api");

amqp.connect('amqp://localhost', (err, connection) => {
    if(err) {
        throw err;
    }

    connection.createChannel((err1, channel) => {
        if(err1) {
            throw err1;
        }

        const exchange = 'logs';

        channel.assertExchange(exchange, 'fanout', { durable: false });

        // create queue
        channel.assertQueue('1', { exclusive: true }, (err2, q) => {
            if(err2) throw err2;

            console.log(`Queue ${q.queue} is waiting for messages`);

            // bind queue for excahnge
            channel.bindQueue(q.queue, exchange, '');

            // consume messages from queue
            channel.consume(q.queue, (msg) => {
                console.log(`Receive message: ${msg.content.toString()}`);
            }, { noAck: true })

        })

    })
})