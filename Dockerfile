FROM node:lts-alpine

WORKDIR ./var/www/app

COPY package*.json .

RUN npm install --force

COPY . .
RUN npx tsc

CMD ["npm", "run", "start:watch"]