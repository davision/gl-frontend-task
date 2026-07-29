# GL Frontend Assessment Starter

## Requirements

- Git
- Docker Desktop, Docker Engine with Compose, or an equivalent Docker setup

## Run Locally

Fork the repository. When done, create pull request and send it over.

This is a self-contained development project. It uses standard PHP, Composer and Node Docker images. It does not need personal credentials, privileged access, the Docker socket or access to folders outside this repository.

You can review `docker-compose.yml` and both Dockerfiles before running anything.

From your clean clone:

```bash
docker compose up --build
```

Open:

- Frontend: http://localhost:3000
- Twig preview: http://localhost:8080/twig-preview
- API health check: http://localhost:8080/api/health
- Assessment data: http://localhost:8080/api/assessment

## Tests

Frontend:

```bash
docker compose run --rm frontend pnpm test
```

API:

```bash
docker compose run --rm api php vendor/bin/phpunit
```

Run all checks:

```bash
docker compose run --rm frontend pnpm test
docker compose run --rm frontend pnpm build
docker compose run --rm api php vendor/bin/phpunit
```

## Production Build

Build the frontend:

```bash
docker compose run --rm frontend pnpm build
```

Build both container images:

```bash
docker compose build
```

## Project Structure

```text
api/          Symfony API and sample data
frontend/     Nuxt application
postman/      API examples
```

The sample data is stored in `api/resources/data/assessment.json`. It includes questions, casinos, bonuses and simple matching values.

## API Contract

`GET /api/assessment` returns:

```json
{
  "questions": [],
  "casinos": []
}
```
