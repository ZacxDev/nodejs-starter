# Mircoservice Boilerplate

### Requirements

- Docker/Docker Compose
- NodeJS/NPM
- VSCode and the [Remote - Containers Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) (Optional, this allows for realtime backend debugging)

### Setup

- `npm i`
- `cp .env.example .env`
- Run `npx webpack` to generate the artifact, you only need to run this the first time.
- Rename the container in `docker-compose.yml`
- Rename the migrations table in `knexfile.js`

### Running Locally

If you are using the Remote - Containers extension:

Click the >< button in the bottom left of VSCode and select "Reopen in container"

else, just run `docker-compose up`.

### Migrations

To create a migration: `npx knex migrate:make <migration name>`.
To run migrations: `npm run migrate`

## Debugging

You need the Remote - Containers extension to debug this project.  Once you have it, make sure VSCode is attached to the container, and then simply select the "Debugging" panel on the left, and then select the "Attach in Docker" configuration and hit play.
