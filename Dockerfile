FROM node:12.10.0
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
USER node
COPY --chown=node:node ./ /home/node/app
WORKDIR /home/node/app
RUN npm install
EXPOSE ${PORT:-4000}
ENTRYPOINT ["bash", "-c", "./start.bash"]
