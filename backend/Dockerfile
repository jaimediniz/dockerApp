FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install pm2 -g

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
