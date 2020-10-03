FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install react-scripts@3.4.3 -g --silent

RUN npm install serve -g --silent

RUN npm run build --production

ENV PORT=5000

EXPOSE 5000

CMD ["npm", "start", "--production"]