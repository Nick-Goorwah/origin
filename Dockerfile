FROM node:14.18.2-alpine

RUN apk update && apk add g++ && apk add --no-cache bash && apk add git && npm install -g pnpm && apk add --no-cache python3 && ln -sf python3 /usr/bin/python && apk add make  && npm install -g ganache-cli && npm install -g lerna && npm install -g node-gyp && npm install -g node-gyp-build && npm install -g concurrently && apk add gettext
COPY . .

RUN npm install -g @microsoft/rush

RUN  rush install && rush update && rush build && rush deploy --project ui-packages --overwrite && rush deploy --project @energyweb/origin-backend-irec-app --overwrite && rush deploy --project @energyweb/migrations-irec --overwrite

EXPOSE 8080