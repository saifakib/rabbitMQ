const amqp = require("amqplib/callback_api");

amqp.connect('amqp://localhost', (err, connection) => {
    if(err) {
        throw err;
    }

    connection.createChannel((err1, channel) => {
        if(err1) {
            throw err1;
        }

        const queue = 'task_queue'

        channel.assertQueue(queue, { durable: true });

        channel.prefetch(1);
        
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, (msg) => {
            console.log("Receive message:", msg.content.toString());

            setTimeout(() => {
                console.log("Processed message: ", msg.content.toString());
                channel.ack(msg)
            }, 500)
        })

    })
})