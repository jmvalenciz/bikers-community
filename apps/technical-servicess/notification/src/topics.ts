import * as admin from 'firebase-admin';
const serviceAccount = require('../config/serviceAccountKey.json');

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging(app);

export async function subscribeToTopic(userToken: string, topicName: string): Promise<void> {
  try {
    await messaging.subscribeToTopic([userToken], topicName);

    console.log(`Usuario ${userToken} suscrito al tópico ${topicName}`);
  } catch (error) {
    console.error('Error al suscribir al usuario al tópico:', error);
  }
}

export async function sendNotificationToTopic(topicName: string, notificationData: { title: string, body: string }): Promise<void> {
  try {
    const message: admin.messaging.Message = {
      topic: topicName,
      notification: {
        title: notificationData.title,
        body: notificationData.body,
      },
    };

    await messaging.send(message);

    console.log(`Notificación enviada al tópico ${topicName}`);
  } catch (error) {
    console.error('Error al enviar la notificación al tópico:', error);
  }
}