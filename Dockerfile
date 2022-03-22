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
&& apt-get install -y node-typescript \
&& npm install -g @microsoft/rush \
&& npm i -g wait-on

RUN rush update

CMD ["rush", "run:origin"]