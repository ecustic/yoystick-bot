FROM node:12

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

VOLUME /usr/src/app/data

CMD ["npm", "start"]