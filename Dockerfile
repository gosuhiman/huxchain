FROM node:12.14.1-alpine

RUN mkdir -p /app && \
    adduser -S nodejs && \
    chown -R nodejs /home/nodejs && \
    chown -R nodejs /app

USER nodejs
WORKDIR /app

COPY package*.json tsconfig*.json /app/
RUN npm install

COPY src /app/src

EXPOSE ${PORT}

CMD npm run start:dev
