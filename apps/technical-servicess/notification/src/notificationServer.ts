import * as admin from 'firebase-admin';
import { sendNotificationToTopic } from './topics';
import firebase from 'firebase/app';
import 'firebase/messaging';

const serviceAccount = require('../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});



import * as amqp from 'amqplib';

const rabbitMQUrl = 'amqp://localhost';

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
        const { token, message, topicName } = messageData;
    
        sendNotificationToTopic(topicName, { title: 'Título', body: message });
      }
    }, { noAck: true });
  } catch (error) {
    console.error('Error al consumir mensajes de notificación:', error);
  }
}

setupRabbitMQ();