import express from 'express';
import { subscribeToTopic } from './topics';

const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});