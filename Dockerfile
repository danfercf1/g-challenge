FROM node:12.22.6

WORKDIR /app

COPY package.json tsconfig.json ./

COPY server/ ./server

COPY ui/ ./ui

RUN cd ui && npm install && npm run build

WORKDIR /app

RUN npm i

RUN npm run build

RUN rm -R node_modules && npm i --only=prod

CMD [ "npm", "start" ]
