# Multi-Container Applications

Lesson 23 wired up a single service. Northbridge's real storefront needs three: a `web` front end, an `api` backend, and a `db` database, each a separate container, each with its own image -- but all defined in one `compose.yaml` and started with one command.

## What you'll learn

- How to describe a multi-service stack in one compose.yaml
- How Compose's default network lets services reach each other by name
- What `depends_on` does -- and what it doesn't guarantee
- Where Northbridge's database-backed data actually lives

## Northbridge's storefront stack

```yaml
services:
  web:
    image: northbridge/storefront-web:2.1
    ports:
      - "80:80"
    depends_on:
      - api

  api:
    image: northbridge/storefront-api:2.1
    ports:
      - "4000:4000"
    depends_on:
      - db
    environment:
      DB_HOST: db

  db:
    image: postgres:16
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

Three services, three containers, one file. `web` depends on `api`, and `api` depends on `db` -- Compose reads those relationships and starts `db` first, then `api`, then `web`.

## Reaching each other by name

Notice `api`'s `environment` block sets `DB_HOST: db` -- not an IP address, just the literal string `db`. That works because Compose puts every service in a `compose.yaml` on one shared default network, and each service is reachable by its service name as a hostname. The `api` container can connect to `postgresql://db:5432` and Docker's internal DNS resolves `db` to whichever container is currently running that service. (A full look at environment variables and secrets is Lesson 26 -- this is just enough to make the stack work.)

## What `depends_on` actually guarantees

```bash
$ docker compose up -d
[+] Running 4/4
 ✔ Network ch06_default  Created
 ✔ Container ch06-db-1   Started
 ✔ Container ch06-api-1  Started
 ✔ Container ch06-web-1  Started
```

That ordering -- `db`, then `api`, then `web` -- is exactly what `depends_on` promises: **start order**, nothing more. The `db` container is *started* before `api` starts, but Postgres might still be initializing its data directory for several seconds after that. If `api` tries to connect immediately, it can fail even though `depends_on` was respected to the letter. Closing that specific gap -- waiting for a service to be truly *ready*, not just started -- is exactly what Lesson 25's health checks solve.

## Key terms

- **Multi-container application** -- several services, each a separate container, defined together in one compose.yaml
- **Default network** -- the shared network Compose creates so services resolve each other by service name
- **`depends_on`** -- controls start order between services; does not wait for readiness
- **`db-data`** -- the named volume keeping Northbridge's Postgres data across restarts
