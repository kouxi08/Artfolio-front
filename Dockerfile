FROM node:20-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install
