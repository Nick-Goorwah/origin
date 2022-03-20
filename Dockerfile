FROM ubuntu:18.04
ENV NODE_VERSION 14.18.2

COPY . .
RUN apt clean \
&& apt-get update \
&& apt install -y python3-pip \
&& pip3 install cliapp \
&& apt-get -o Acquire::Check-Valid-Until=false -o Acquire::Check-Date=false update \
&& apt-get install curl -y \
&& curl -sL https://deb.nodesource.com/setup_14.x | bash - \
&& apt-get install -y nodejs \
&& npm i npm@latest \
&& apt-get install gettext -y \
&& /bin/sh -c "apt-get install bash" \
&& apt-get install build-essential -y \
&& apt-get install git -y \
&& wget -qO- https://get.pnpm.io/install.sh | sh - \
&& apt-get install python3 -y \
&& ln -sf python3 /usr/bin/python \
&& apt-get install make \
&& curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
&& echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
&& apt update \
&& apt install yarn nodejs -y \
&& npm install -y node-gyp && npm install -y node-gyp-build \
&& yarn global add node-gyp \
&& npm i -g typeorm \
&& npm install -g ts-node \
&& npm install -g n \
&& n 14.18.2 --save \
&& npm install -g concurrently \
&& npm install lerna --global \
&& npm install -g truffle \
&& npm install solc \
&& curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \
&& chmod +x /usr/local/bin/docker-compose \
&& ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose \
&& npm i -g @nestjs/cli \
&& npm update -g @nestjs/cli \
&& npm i -g @nestjs/core \
&& npm i -g @nestjs/swagger \
&& nest update \
&& apt-get install -y node-typescript \
&& npm install -g @microsoft/rush \
&& npm i -g wait-on \
&& yarn upgrade --latest \
&& export PATH=/usr/local/lib/node_modules/.bin:$PATH

EXPOSE 3030

CMD ["rush", "run:origin"]