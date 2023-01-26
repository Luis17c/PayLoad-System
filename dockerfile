FROM node:alpine

WORKDIR /src/payloadsys

COPY package*.json ./
RUN npm install

COPY . .

ENV RUN_DOCKER=1 

EXPOSE 3000
