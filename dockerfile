FROM node:alpine

WORKDIR /src/payloadsys

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]