# Local Multi-Service Environment With Compose

Two container images are only useful once you can run them together the way they actually run in production: `product-catalog` and `checkout`, both talking to Postgres, with `checkout` also reaching out to inventory and PaymentPro. This lesson wires all of that up locally with Docker Compose — the last piece of Phase 1 before infrastructure work starts in Chapter 3.

## What you'll learn

- A `docker-compose.yml` that wires `product-catalog`, `checkout`, local Postgres, and a stub inventory service together
- Why local dev uses a lightweight mock of the legacy inventory service instead of calling the real one
- How `.env` keeps local secrets like the PaymentPro sandbox key out of Git
- The day-to-day dev workflow: `docker compose up`, logs, hot reload, and tearing it down

## The `docker-compose.yml`

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: northbridge
      POSTGRES_USER: northbridge
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  inventory-mock:
    image: mockserver/mockserver:latest
    ports:
      - "1080:1080"
    volumes:
      - ./docs/inventory-mock-expectations.json:/config/expectations.json
    environment:
      MOCKSERVER_INITIALIZATION_JSON_PATH: /config/expectations.json

  product-catalog:
    build: ./services/product-catalog
    environment:
      DATABASE_URL: postgresql://northbridge:${POSTGRES_PASSWORD}@postgres:5432/northbridge
    ports:
      - "8081:8080"
    depends_on:
      - postgres
    volumes:
      - ./services/product-catalog:/app
      - /app/node_modules

  checkout:
    build: ./services/checkout
    environment:
      DATABASE_URL: postgresql://northbridge:${POSTGRES_PASSWORD}@postgres:5432/northbridge
      INVENTORY_URL: http://inventory-mock:1080
      PAYMENTPRO_URL: ${PAYMENTPRO_URL}
      PAYMENTPRO_API_KEY: ${PAYMENTPRO_API_KEY}
    ports:
      - "8082:8080"
    depends_on:
      - postgres
      - inventory-mock
    volumes:
      - ./services/checkout:/app

volumes:
  pgdata:
```

Four services, three of them real: `postgres` backs both applications, `product-catalog` is reachable on `localhost:8081`, and `checkout` is reachable on `localhost:8082`. The fourth, `inventory-mock`, stands in for the legacy inventory service.

## Why mock the inventory service locally

The real legacy inventory service runs elsewhere at Northbridge and isn't something a developer's laptop can reach, let alone something this capstone builds. For local development, `inventory-mock` runs a tiny MockServer instance preloaded with a canned expectation — any request to `GET /stock/:id` always returns `{"available": 999}` — so `checkout`'s stock check always passes without a real dependency in the loop:

```json
// docs/inventory-mock-expectations.json
{
  "httpRequest": { "method": "GET", "path": "/stock/.*" },
  "httpResponse": {
    "statusCode": 200,
    "body": { "available": 999 }
  }
}
```

This is a stub, not a real integration test — its whole job is to let `checkout` run end-to-end locally without needing the real inventory service or a staging environment. PaymentPro's sandbox API plays the same role for payments: `checkout` is pointed at PaymentPro's own test environment via `PAYMENTPRO_URL`, so no real charge ever happens from a laptop.

## `.env` and local secrets

None of the values in `docker-compose.yml` above are hardcoded — they all come from a `.env` file that Compose loads automatically and that is never committed to Git (it's in `.gitignore` and `.dockerignore` both):

```
# .env  (local only — never committed)
POSTGRES_PASSWORD=localdevpassword
PAYMENTPRO_URL=https://sandbox.paymentpro.example.com
PAYMENTPRO_API_KEY=sk_test_local_only
```

This is the same instinct that shows up everywhere else in this capstone — real secrets never live in a config file that gets checked in. Later, in Chapter 3, the same PaymentPro key moves into Azure Key Vault for the deployed environments; locally, a `.env` file is good enough.

## The day-to-day dev workflow

```bash
# bring everything up, rebuilding images if the Dockerfiles changed
docker compose up --build

# tail just one service's logs
docker compose logs -f checkout

# a one-off local request against product-catalog
curl http://localhost:8081/products

# tear everything down, including the Postgres volume
docker compose down -v
```

For fast iteration, `product-catalog`'s container mounts the local source directory (`./services/product-catalog:/app`) so changes to `server.js` are picked up without a rebuild — pair it with `nodemon` as the container's dev command and Express restarts automatically. `checkout` gets the same effect with `uvicorn main:app --reload`, which watches the mounted source and reloads FastAPI on every save. Neither trick is used in the production images from Lesson 5 — those stay static and immutable; hot reload is strictly a local-development convenience.

## Key terms

- **`docker-compose.yml`** — declares all services needed for local development as one unit, started together with `docker compose up`
- **`inventory-mock`** — a local MockServer stub standing in for the real legacy inventory service, so `checkout` runs locally without it
- **`.env`** — holds local-only secrets (DB password, PaymentPro sandbox key) loaded by Compose, never committed to Git
- **Hot reload** — `nodemon` / `uvicorn --reload` watching a mounted source volume to restart a service on save, local-dev only
