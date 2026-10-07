# Health Checks & Restart Policies

Lesson 24 ended on a gap: `depends_on` starts `db` before `api`, but doesn't wait for Postgres to actually be ready to accept connections. Health checks close that gap by telling Docker how to ask "are you actually working?" Restart policies answer the next question: what should happen when the answer is no?

## What you'll learn

- How to define a `HEALTHCHECK` in a Dockerfile
- How Compose's `healthcheck:` and `depends_on: condition: service_healthy` fix Lesson 24's ordering gap
- The four restart policies -- `no`, `on-failure`, `always`, `unless-stopped` -- and when to use each

## `HEALTHCHECK` in a Dockerfile

```dockerfile
FROM northbridge/storefront-api:2.1
HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:4000/healthz || exit 1
```

Docker runs that `CMD` every `--interval`, waits up to `--timeout` for it to finish, and if it fails `--retries` times in a row, marks the container **unhealthy**. Exit code `0` means healthy; any non-zero exit means it failed that check.

## Closing Lesson 24's gap in Compose

```yaml
services:
  api:
    image: northbridge/storefront-api:2.1
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/healthz"]
      interval: 10s
      timeout: 3s
      retries: 3
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      retries: 5
```

This is the fix for Lesson 24: `depends_on: db: condition: service_healthy` makes `api` wait until `db`'s own health check reports healthy -- not just until the `db` container has started. `pg_isready` is Postgres's own readiness probe, so this check actually reflects whether the database can take connections yet.

## Restart policies

```bash
docker run -d --restart unless-stopped northbridge/storefront-api:2.1
```

| Policy | Behavior |
|---|---|
| `no` | Never restarts automatically (the default) |
| `on-failure` | Restarts only if the container exits with a non-zero status; optionally `on-failure:5` caps retries |
| `always` | Always restarts on exit, and restarts again when the Docker daemon itself restarts, even after a manual stop |
| `unless-stopped` | Behaves like `always`, except a container you stopped manually stays stopped, even across a daemon restart |

In Compose, the same thing is one line per service:

```yaml
services:
  api:
    restart: unless-stopped
```

Northbridge runs `unless-stopped` on `api` and `db` in production -- a crash restarts them automatically, but a deliberate `docker compose stop` for maintenance actually sticks.

## Key terms

- **`HEALTHCHECK`** -- a Dockerfile instruction defining a command Docker runs periodically to judge container health
- **healthy / unhealthy / starting** -- the three states `docker inspect` reports for a container with a health check
- **`condition: service_healthy`** -- makes `depends_on` wait for health, not just for a started container
- **Restart policy** -- `no`, `on-failure`, `always`, or `unless-stopped`, controlling automatic restarts
