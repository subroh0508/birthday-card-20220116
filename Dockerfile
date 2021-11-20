FROM node:14.18-alpine

RUN apk update && apk upgrade

EXPOSE 8000
