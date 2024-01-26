FROM node:18-alpine
ENV NODE_ENV production

WORKDIR usr/src/app
COPY server server/
COPY dist dist/
COPY dist/.vite/ dist/

WORKDIR server
RUN npm install

CMD ["node", "./server.js"]

ENV PORT=7800
EXPOSE $PORT
