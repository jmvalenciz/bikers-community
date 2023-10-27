FROM node:20-alpine

ENV NODE_ENV production
ENV PORT 3000
ENV BROKER_HOST localhost
ENV BROKER_PORT 5672
ENV DB_USER bikers-community
ENV DB_PASSWORD bikers-community
ENV DB_HOST localhost
ENV DB_PORT 27017

WORKDIR /app

COPY ./dist/apps/microservices/bike .

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "node", "main.js" ]
