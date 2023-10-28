FROM node:20-alpine

ENV NODE_ENV production
ENV PORT 3001
ENV BROKER_HOST localhost
ENV BROKER_PORT 5672
ENV DB_USER bikers-community
ENV DB_PASSWORD bikers-community
ENV DB_HOST localhost
ENV DB_PORT 27017

WORKDIR /app

COPY ./dist/apps/microservices/events .

RUN npm install

EXPOSE 3001

ENTRYPOINT [ "node", "main.js" ]