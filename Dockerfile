FROM node:14-alpine

WORKDIR /app
ENV NUXT_HOST 0.0.0.0
COPY package.json .
COPY yarn.lock .

RUN yarn
COPY . .
RUN yarn build
CMD yarn start
