import express from 'express';
import { subscribeToTopic, sendNotificationToTopic } from './topics';
import "./notificationServer";

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

app.post('/subscribe', (req, res) => {
  const { userToken, topicName } = req.body;

  subscribeToTopic(userToken, topicName)
    .then(() => {
      res.status(200).send('Usuario suscrito al tópico');
    })
    .catch((error) => {
      res.status(500).send('Error al suscribir al usuario al tópico: ' + error);
    });
});

app.post("/send", async (req, res) => {
  const { topicName } = req.body;
  await sendNotificationToTopic(topicName, { title: 'Título', body: "message" })
  res.status(200).send("Mensaje enviado");
})

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});