# Boilerplate API

# Requirements

- Docker/Docker Compose
- NodeJS/NPM

# Setup

- `npm i`
- `cp .env.example .env`
- Run `npx webpack` to generate the artifact, you only need to run this the first time.
- `docker-compose up`

# Migrations

To create a migration: `npx knex migrate:make <migration name>`.
To run migrations: `npm run migrate`
