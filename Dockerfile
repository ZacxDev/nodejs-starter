FROM node:13.3.0 as cache
LABEL cache=true
WORKDIR /tmp
ADD package.json package-lock.json ./
RUN npm ci

FROM node:13.3.0 as builder
LABEL cache=false
LABEL builder=true
RUN mkdir -p /home/node/app/build && chown -R node:node /home/node/app
USER node
WORKDIR /home/node/app
COPY --chown=node:node . .
COPY --chown=node:node --from=cache /tmp/node_modules ./node_modules
ENV CI true
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
RUN npx webpack && npm prune

FROM alpine
LABEL cache=false
LABEL builder=false
RUN apk add --update --no-cache nodejs-current-npm && mkdir /home/mobl
WORKDIR /home/mobl
COPY --from=builder /home/node/app/start.sh /home/node/app/knexfile.js /home/node/app/package.json ./
COPY --from=builder /home/node/app/build ./build
COPY --from=builder /home/node/app/migrations ./migrations
COPY --from=builder /home/node/app/node_modules ./node_modules
EXPOSE ${PORT:-4000}

CMD ["sh", "-c", "./start.sh"]
