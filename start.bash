#!/bin/bash

COMMAND="nodemon"
if [ "$NODE_ENV" = "production" ]; then
  COMMAND="node"
else
  npx webpack &
fi

npx forever -a --uid "mobl_merchant_api_process" -c $COMMAND build/dist.js 
