FROM node:10.22.0

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY ./ ./

# Add bash
# RUN apk add --no-cache bash

EXPOSE 8000

CMD ["node", "server.js"]


#==================================================
#FROM node:10.22.0
#
#RUN mkdir -p /app/backend
#
#WORKDIR /app/backend
#
##COPY . .
#COPY . /app/backend
#
#RUN npm install
#
#EXPOSE 3001
#
#CMD [ "node", "server.js" ]
#Learning how to deploy node & react application for production using docker-compose
#1.front end hoice but backend hoi nai

