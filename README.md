# Home Page Backend

created with apollo-server

## To run locally:

1. `cp .env.example .env`
2. fill in `.env` with environment variables for server port (e.g. 4000) and API keys
3. `npm i`
4. `npm run start`

## To run with docker:

```
docker build -t home-page-backend .
docker run --env-file ./.env --rm -p 4000:4000 home-page-backend
```
