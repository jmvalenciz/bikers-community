import * as admin from 'firebase-admin';

export async function subscribeToTopic(userToken: string, topicName: string): Promise<void> {
  try {
    await admin.messaging().subscribeToTopic([userToken], topicName);

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

    await admin.messaging().send(message);

    console.log(`Notificación enviada al tópico ${topicName}`);
  } catch (error) {
    console.error('Error al enviar la notificación al tópico:', error);
  }
}