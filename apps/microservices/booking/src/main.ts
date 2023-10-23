import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { env } from './environment';

import { AppModule } from './app/app.module';
import { connect as MongoConnect } from 'mongoose';

async function bootstrap() {
  const [app] = await Promise.all([
    NestFactory.create(AppModule),
    MongoConnect('mongodb://localhost:27017/test'),
  ]);
  app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${env.BROKER.URL}:${env.BROKER.PORT}`],
        queue: env.BROKER.QUEUE,
        queueOptions: {
          durable: false
        },
      }
    })
  const port = env.PORT || 3000;
  await app.startAllMicroservices()
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
