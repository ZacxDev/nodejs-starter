FROM node:13.3.0 as cache
LABEL cache=true
WORKDIR /tmp
ADD package.json package-lock.json ./
RUN npm ci

FROM node:13.3.0 as builder
LABEL cache=false
LABEL builder=true
WORKDIR /home/node/app
ENV CI true
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
COPY --from=cache /tmp/node_modules ./node_modules
COPY . .
RUN mkdir build && npx webpack && npm prune

FROM alpine as final
LABEL cache=false
LABEL builder=false
WORKDIR /home/mobl
# Technically we don't need inotify-tools in production, but it's only 7mb
RUN apk add --update --no-cache nodejs-current-npm inotify-tools
COPY --from=builder /home/node/app/node_modules ./node_modules
COPY --from=builder /home/node/app/migrations ./migrations
COPY --from=builder /home/node/app/start.sh /home/node/app/knexfile.js /home/node/app/package.json ./
COPY --from=builder /home/node/app/build ./build
EXPOSE 4000

ENTRYPOINT ["sh", "-c", "./start.sh"]
