#!/bin/bash

heroku apps:create vem-origin-kyanite --region us
heroku apps:create origin-api-kyanite --region us

if heroku addons -a origin-api-kyanite --json | grep postgresql
then 
   echo "PostgreSQL already provisioned";
else
   heroku addons:create heroku-postgresql:hobby-dev -a origin-api-kyanite
fi

heroku config:set --app origin-api-kyanite \
  BACKEND_PORT=443 \
  BACKEND_URL=https://origin-api-kyanite.herokuapp.com \
  EMAIL_FROM=origin-no-reply@energyweb.org \
  EMAIL_REPLY_TO=reply-to@energyweb.org \
  ISSUER_ID='Issuer ID' \
  JWT_EXPIRY_TIME='7 days' \
  REGISTRATION_MESSAGE_TO_SIGN='I register as Origin user' \
  UI_BASE_URL=https://vem-origin-kyanite.herokuapp.com \
  WEB3='https://volta-rpc-origin-0a316ab339e3d2ee3.energyweb.org' \
  DEPLOY_KEY='<KEY>' \
  EXCHANGE_ACCOUNT_DEPLOYER_PRIV='<KEY>' \
  EXCHANGE_WALLET_PRIV='<KEY>' \
  EXCHANGE_WALLET_PUB='<KEY>' \
  EXCHANGE_PRICE_STRATEGY=0 \
  EXCHANGE_WALLET_MIN_EWT='0.01' \
  JWT_SECRET='<SECRET>' \
  MANDRILL_API_KEY='<KEY>' \
  ENERGY_PER_UNIT=1000000

heroku config:set --app vem-origin-kyanite \
  BACKEND_URL=https://origin-api-kyanite.herokuapp.com \
  SUPPORTED_NETWORK_IDS=73799
  BLOCKCHAIN_EXPLORER_URL=https://volta-explorer.energyweb.org
