FROM node:alpine

WORKDIR /usr/vuttr

COPY package.json /usr/vuttr
COPY yarn.lock /usr/vuttr
RUN yarn install

COPY . /usr/vuttr

EXPOSE 3000

CMD ["yarn", "start"]