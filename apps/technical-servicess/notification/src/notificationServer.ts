import { sendNotificationToTopic } from './topics';

import * as amqp from 'amqplib';

const rabbitMQUrl = `amqp://${process.env.BROKER_HOST}:${process.env.BROKER_PORT}`;

async function setupRabbitMQ() {
  try {
    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await connection.createChannel();
    const queue = 'notifications';

    await channel.assertQueue(queue, { durable: false });

    console.log('Esperando mensajes de notificación...');

    channel.consume(queue, (msg) => {
      if (msg) { 

        const messageData = JSON.parse(msg.content.toString());

        switch(messageData.action){
          case 'sendMessageToTopic':
            const { title, message, topicName } = messageData.body;
            sendNotificationToTopic(topicName, { title: title, body: message });
        }
      }
    }, { noAck: true });
  } catch (error) {
    console.error('Error al consumir mensajes de notificación:', error);
  }
}

setupRabbitMQ();