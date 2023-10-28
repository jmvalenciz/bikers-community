const amqp = require('amqplib');
const admin = require('firebase-admin');
const serviceAccount = require('path/to/your/serviceAccountKey.json');

async function main() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'email_queue';

    await channel.assertQueue(queue, { durable: false });

    console.log('Email service is waiting for messages...');

    channel.consume(queue, (msg: { content: { toString: () => string; }; }) => {
      const messageData = JSON.parse(msg.content.toString());

      // Lógica para enviar correos electrónicos utilizando Firebase
      // Puedes utilizar admin.messaging().send() u otra función de Firebase.

      console.log('Email sent:', messageData);
    }, { noAck: true });
  } catch (error) {
    console.error('Error:', error);
  }
}

main();