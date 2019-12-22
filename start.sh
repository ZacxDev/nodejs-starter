#!/bin/sh
COMMAND="npx nodemon --watch build --inspect=0.0.0.0:5858 --nolazy"
if [ "$NODE_ENV" = "production" ]; then
  COMMAND="node"
else
  cp .env build/.env
  npx webpack &
fi

# npm run migrate-internal &&
$COMMAND build/dist.js 
