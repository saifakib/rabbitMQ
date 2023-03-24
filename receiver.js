const amqp = require("amqplib/callback_api");

amqp.connect('amqp://localhost', (err, connection) => {
    if(err) {
        throw err;
    }

    connection.createChannel((err1, channel) => {
        if(err1) {
            throw err1;
        }

        const queue = 'technical';

        channel.assertQueue(queue, {
            durable: false
        })

        channel.consume(queue, (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        })
    })
})