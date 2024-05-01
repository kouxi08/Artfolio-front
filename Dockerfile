FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app/
RUN npm install

COPY . .