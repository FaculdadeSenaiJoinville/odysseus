FROM node:14.17.3-alpine3.14

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start:prod" ]