# Capstone: Build It

Lesson 31 was the brief. This lesson is the build: real Dockerfiles for `catalog` and `checkout`, a complete `compose.yaml` tying them to the database, and actually running `docker compose up` to see Northbridge Retail's stack come up as one application.

## What you'll learn

- A complete, non-root, multi-stage Dockerfile for the catalog service
- The same pattern applied to the checkout service
- A full `compose.yaml` wiring catalog, checkout, and catalog-db together with a network, a volume, health checks, and resource limits
- How to bring the stack up and verify every piece is actually working, not just running

## The catalog Dockerfile

This is the multi-stage pattern from Chapter 3 with the non-root user from Chapter 7 added on top:

```dockerfile
# ---- build stage ----
FROM node:20-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .

# ---- runtime stage ----
FROM node:20-slim
WORKDIR /app
RUN useradd --user-group --create-home --shell /bin/false catalog
COPY --from=build /app /app
USER catalog
EXPOSE 3000
CMD ["node", "server.js"]
```

The build stage installs dependencies and copies the application in. The runtime stage starts from a fresh `node:20-slim` image, creates a dedicated `catalog` user, copies in only what the build stage produced, and switches to that user with `USER catalog` before the container ever starts listening.

## The checkout Dockerfile

Same shape, different service — this is deliberate. Teach the pattern once, reuse it everywhere:

```dockerfile
# ---- build stage ----
FROM node:20-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .

# ---- runtime stage ----
FROM node:20-slim
WORKDIR /app
RUN useradd --user-group --create-home --shell /bin/false checkout
COPY --from=build /app /app
USER checkout
EXPOSE 3000
CMD ["node", "server.js"]
```

The only differences are the user name and the application code each `COPY` brings in. Every service in this stack follows the same hardened shape instead of each Dockerfile reinventing how to run safely.

## The complete compose.yaml

This is where three separate images become one application:

```yaml
services:
  catalog-db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: catalog
    volumes:
      - catalog-db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - northbridge-net
    mem_limit: 512m
    cpus: 1.0

  catalog:
    build: ./catalog
    image: northbridge/catalog:1.4
    restart: unless-stopped
    env_file: .env
    environment:
      DATABASE_URL: postgres://${DB_USER}:${DB_PASSWORD}@catalog-db:5432/catalog
    depends_on:
      catalog-db:
        condition: service_healthy
    networks:
      - northbridge-net
    mem_limit: 256m
    cpus: 0.5

  checkout:
    build: ./checkout
    image: northbridge/checkout:2.1
    restart: unless-stopped
    env_file: .env
    environment:
      DATABASE_URL: postgres://${DB_USER}:${DB_PASSWORD}@catalog-db:5432/catalog
      CATALOG_URL: http://catalog:3000
    depends_on:
      catalog-db:
        condition: service_healthy
      catalog:
        condition: service_started
    ports:
      - "8081:3000"
    networks:
      - northbridge-net
    mem_limit: 256m
    cpus: 0.5

networks:
  northbridge-net:
    driver: bridge

volumes:
  catalog-db-data:
```

A few things worth pointing at directly:

- **`catalog-db-data`** is a named volume, declared once under `volumes:` and mounted into `catalog-db`. It outlives `docker compose down`.
- **`healthcheck` on `catalog-db`** runs `pg_isready` every 10 seconds; Postgres only counts as healthy once that actually succeeds.
- **`depends_on: catalog-db: condition: service_healthy`** on both `catalog` and `checkout` means neither starts handling real traffic until the database has passed its health check — not just started.
- **`networks: northbridge-net`** on every service means `checkout` can reach the database at the hostname `catalog-db`, and the catalog service at `http://catalog:3000` — Docker's embedded DNS resolves service names automatically on a user-defined network.
- **`mem_limit` / `cpus`** on every service caps what each one can consume, so a leak in one service can't take down the whole host.

## Configuration: .env

Credentials never go in `compose.yaml` itself. They live in a `.env` file in the same directory, which `.gitignore` excludes from the repo:

```text
DB_USER=northbridge
DB_PASSWORD=use-a-real-secret-here-not-this
```

`compose.yaml` only ever references `${DB_USER}` and `${DB_PASSWORD}` — the actual values are supplied at runtime from `.env`, which is why it's safe to commit the compose file but never this one.

## Bringing it up

```text
$ docker compose up -d
[+] Running 4/4
 ✔ Network northbridge-net   Created
 ✔ Container catalog-db      Started
 ✔ Container catalog         Started
 ✔ Container checkout        Started

$ docker compose ps
NAME         IMAGE                      STATUS
catalog      northbridge/catalog:1.4    Up (healthy)
catalog-db   postgres:16-alpine         Up (healthy)
checkout     northbridge/checkout:2.1   Up
```

```text
$ curl -X POST localhost:8081/api/checkout -d '{"productId": 4471, "qty": 1}'
{"orderId": "ord_8841", "status": "confirmed"}

$ docker compose logs checkout --tail 3
checkout  | [2026-10-07T15:02:10] Connected to catalog-db
checkout  | [2026-10-07T15:02:40] GET http://catalog:3000/api/products/4471 200 11ms
checkout  | [2026-10-07T15:02:44] POST /api/checkout 200 38ms
```

The checkout service actually reached `catalog` by name over `northbridge-net`, confirmed the product with it, wrote the order against `catalog-db`, and returned a real response. That's the capstone working as one application, not three containers that happen to share a host.

## Key terms

- **`USER <name>`** — switches the active user for the rest of the Dockerfile and for the running container, so the process never runs as root
- **`depends_on: condition: service_healthy`** — delays starting a service until another service's health check passes, not just until it starts
- **`mem_limit` / `cpus`** — Compose service keys that cap a container's memory and CPU without needing swarm mode
- **Named volume** — a Docker-managed storage location, declared under `volumes:`, that persists independently of any one container
- **Embedded DNS** — the name resolution Docker provides on a user-defined network, letting services reach each other by service name
