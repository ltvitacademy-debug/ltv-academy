# Service Discovery

`catalog` and `catalog-db` already prove the pattern: same user-defined network, resolve each other by name. This lesson applies it to Northbridge's other service — wiring `checkout` to its own database, `checkout-db`, the same way, and configuring the app itself to use that name instead of an IP it would have had to update by hand.

## What you'll learn

- How **service discovery** is just DNS resolution by container name on a user-defined network
- Setting up `checkout` and `checkout-db` on their own shared network
- Pointing the application's own configuration at a container name instead of an IP
- Why this removes the need to ever hardcode an address again

## Setting up checkout's network

```text
$ docker network create northbridge-checkout-net

$ docker run -d --name checkout-db \
  --network northbridge-checkout-net \
  -v checkout-db-data:/var/lib/postgresql/data \
  -e POSTGRES_DB=checkout \
  -e POSTGRES_PASSWORD=devpassword \
  postgres:16
```

Same shape as Lesson 21's `catalog-db` — a named volume for persistence, a user-defined network for DNS, this time scoped to checkout's own services rather than sharing a network with catalog's.

## Configuring checkout to use the database's name

Recall from Chapter 2 that `checkout` reads its configuration from an env file rather than a pile of `-e` flags. That file is where the database's hostname lives:

```text
# checkout.env
DATABASE_URL=postgresql://checkout_user:devpassword@checkout-db:5432/checkout
PAYMENT_GATEWAY_KEY=sk_test_...
CACHE_HOST=checkout-cache
```

`checkout-db:5432` — not an IP address, not `localhost`, the container's actual name. Starting `checkout` on the same network is what makes that hostname resolvable:

```text
$ docker run -d --name checkout \
  --network northbridge-checkout-net \
  --env-file checkout.env \
  northbridge/checkout:2.1
```

## Verifying it actually found the database

```text
$ docker logs checkout
Connecting to database at checkout-db:5432...
Connected to checkout-db:5432 (PostgreSQL 16.2)
Server listening on port 5000
```

Nothing in `checkout`'s configuration or code needed `checkout-db`'s IP address. Docker's embedded DNS on `northbridge-checkout-net` resolved the name the moment the app asked for it — the same mechanism from Lesson 21, now doing real work for a real connection string.

## Why this matters beyond one lesson

This is **service discovery**: the ability for one container to find another by a stable name instead of a fragile, changeable address. It's a small pattern — a shared user-defined network, a `DATABASE_URL` pointed at a container name — but it's the exact mechanism underneath far more complex setups later in this course, including the multi-container applications Chapter 6 builds with Compose.

## Key terms

- **Service discovery** — containers finding each other by a stable name rather than a hardcoded IP address
- **`DATABASE_URL` / connection string** — application configuration pointing at a hostname, here a container name instead of an IP
- **`--env-file`** — loads environment variables, including a service's hostname, from a file into the container
- **Shared user-defined network** — the prerequisite that makes name-based discovery work between two specific containers
