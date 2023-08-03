# Node PostgreSQL service

## Setup dev environment

1. Contact with team lead to receive sensitive credentials. To set default dev environment create _.env_ file.

   ```
   cp .env.config .env
   ```

2. Install docker compose. Check the version

   ```
   docker-compose -v
   ```

3. Install libraries. Synchronize **Node.JS** version with team members. Do not install packages from the local system use container where API server is running. To install packages execute the command.

   ```
   docker-compose run api-server npm ci
   ```

4. Run PostgreSQL Server

   ```
   docker compose up postgres-db
   ```

   1. Connect to the container that runs Postgres

      ```
      docker exec -it postgres-db bash
      ```

   2. Make migrations (inside **onlineproperty-postgres** container)

      ```
      psql -d recipes -U opDevUser < /usr/src/migrations/recipes.up.sql
      psql -d recipes -U opDevUser < /usr/src/migrations/schema.up.sql
      ```

   3. Connect to the database

      ```
      psql -d recipes -U opDevUser
      ```

5. Run API server. Use another terminal do not close the process in the terminal that runs mongo cluster.
   ```
   docker compose up api-server
   ```

To stop the possess use _Control-C_ in the terminal.
