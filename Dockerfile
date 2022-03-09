FROM node:14.18.2-alpine

RUN apk update && apk add g++ && apk add --no-cache bash && apk add git && npm install -g pnpm && apk add --no-cache python3 && ln -sf python3 /usr/bin/python && apk add make  && npm install -g ganache-cli && npm install -g lerna && npm install -g node-gyp && npm install -g node-gyp-build && npm install -g concurrently && apk add gettext

RUN npm install -g @microsoft/rush

COPY . .

RUN DB_USERNAME=lvcddedcrc
RUN DB_PASSWORD=3N8U0QL1L35L43JR$
RUN DB_HOST=kyanite-server.postgres.database.azure.com
RUN DB_PORT=5432
RUN DB_DATABASE=origin

RUN rush update && rush run:origin



EXPOSE 3000