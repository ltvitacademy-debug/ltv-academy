# Environment Configuration & Secrets

Lesson 24 set `DB_HOST: db` directly in `compose.yaml` and moved on -- that's fine for non-sensitive config, but a real database password, Stripe API key, or JWT signing secret should never sit in a file that gets committed to Northbridge's git repo. This lesson covers the right way to configure both.

## What you'll learn

- The difference between `environment:` and `env_file:` in a Compose service
- How a root `.env` file feeds variable substitution into `compose.yaml` itself
- How Compose `secrets:` mount values as files instead of environment variables
- Why real secrets never belong in a committed file

## `environment:` vs. `env_file:`

```yaml
services:
  api:
    image: northbridge/storefront-api:2.1
    environment:
      DB_HOST: db
      LOG_LEVEL: info
    env_file:
      - .env
```

`environment:` lists variables directly in `compose.yaml` -- fine for non-sensitive config like `DB_HOST` or `LOG_LEVEL`, since anyone with repo access can already see it. `env_file:` instead points at a separate file (`.env`) whose lines get loaded as environment variables inside the container:

```text
DB_PASSWORD=change-me-in-real-env
STRIPE_SECRET_KEY=sk_test_51Hxxxx
```

That `.env` file is exactly the kind of file that must never be committed.

## Compose secrets

```yaml
services:
  api:
    image: northbridge/storefront-api:2.1
    secrets:
      - db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt
```

Instead of an environment variable, Compose mounts `db_password` as a file at `/run/secrets/db_password` inside the container. The application reads the file's contents directly. It's a small step up from an environment variable -- secrets don't show up in `docker inspect` or process-environment dumps the way env vars sometimes can -- but it's still a plain file on disk, so the same rule applies: never commit it.

## Never commit real secrets

```text
# .gitignore
.env
secrets/
```

```text
# .env.example (committed, no real values)
DB_PASSWORD=
STRIPE_SECRET_KEY=
```

Northbridge commits `.env.example` so every developer knows which variables the app needs, while the real `.env` and `secrets/` stay local and untracked. In production, real values come from the hosting platform's own secret or environment-variable injection -- never from a file in the repository.

## Key terms

- **`.env` file** -- local, gitignored file holding real variable values; also used by Compose for `${VAR}` substitution in compose.yaml itself
- **`environment:`** -- variables listed directly in compose.yaml
- **`env_file:`** -- points a service at a file of variables to load
- **`secrets:`** -- mounts sensitive values as files under `/run/secrets/`, not environment variables
- **`.env.example`** -- committed template documenting required variables without real values
