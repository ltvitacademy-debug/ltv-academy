# Lesson 6 — Connecting dbt to Snowflake for a Team

**Chapter 2 · Snowflake Foundations · Lesson 6 of 26**

## What you'll learn

- A real multi-target `profiles.yml`, built for a team instead of one
  solo developer
- Why `profiles.yml` lives outside the dbt project repo, and what that
  protects
- How each developer's personal `dev` target and the shared `prod`
  target both point at the roles and schemas Lessons 3-5 just built
- What changes about this file once CI (Chapter 6) needs to generate
  its own version of it

## Where profiles.yml lives, and why

`profiles.yml` holds real connection details — including, for a human
developer, a real password or key. It is never committed to the dbt
project's git repo. On a laptop it lives at `~/.dbt/profiles.yml`,
outside any folder that gets pushed anywhere. Every developer on the
team has their own copy, with their own credentials, but the same
shape.

## A real multi-target profile for this platform

```yaml
# ~/.dbt/profiles.yml -- one per developer, never committed
jaffle_shop:
  target: dev
  outputs:
    dev:
      type: snowflake
      account: "{{ env_var('SNOWFLAKE_ACCOUNT') }}"
      user: "{{ env_var('SNOWFLAKE_USER') }}"
      password: "{{ env_var('SNOWFLAKE_PASSWORD') }}"
      role: transformer
      database: jaffle_shop_db
      warehouse: transforming_wh
      schema: dev
      threads: 4

    prod:
      type: snowflake
      account: "{{ env_var('SNOWFLAKE_ACCOUNT') }}"
      user: "{{ env_var('SNOWFLAKE_CI_USER') }}"
      password: "{{ env_var('SNOWFLAKE_CI_PASSWORD') }}"
      role: transformer
      database: jaffle_shop_db
      warehouse: transforming_wh
      schema: prod
      threads: 8
```

A few things worth slowing down on:

- **`target: dev`** is the default — running plain `dbt build` with no
  `--target` flag builds into `dev`, the safe schema, by default. A
  developer has to deliberately type `dbt build --target prod` to
  touch the production schema directly, which in this platform's real
  workflow (Chapter 6) they should almost never need to do by hand.
- Every sensitive value uses `env_var(...)`, not a literal string —
  the same pattern this path's own Git/CI-CD course already taught for
  generating a CI-time `profiles.yml`. That consistency is deliberate:
  Lesson 20 reuses this exact shape, swapping only where the
  environment variables come from.
- Both targets use `role: transformer` and `warehouse: transforming_wh`
  — the role and warehouse Lesson 3 built specifically for dbt to run
  as, in every environment.

## Each developer, their own dev schema

A real team refines this further: instead of every developer's `dev`
target pointing at the same literal `dev` schema, each person's
`profiles.yml` sets `schema: dev_<their name>` (`dev_alice`,
`dev_bob`). dbt builds a personal, isolated schema per developer, so
two people running `dbt build --target dev` at the same time never
step on each other's half-finished models — the real-world version of
the "collision" Lesson 5 named.

## Confirming the connection

```
dbt debug
```

A real `dbt debug` run checks the account, user, role, warehouse, and
database all resolve and that dbt can actually connect — the first
thing to run after writing or editing this file, before trying to
build anything.

## Key terms

| Term | Meaning |
|---|---|
| `profiles.yml` | dbt's connection-details file; lives outside the project repo, never committed |
| `target` | A named output inside a profile; `dbt build --target prod` selects one explicitly |
| `env_var(...)` | dbt's Jinja function for reading a value from an environment variable at run time |
| `dbt debug` | Checks that a profile's connection details actually work before building anything |

## Lab

1. Write your own `~/.dbt/profiles.yml` for this platform, with `dev`
   and `prod` targets, using `env_var(...)` for every credential.
2. Change your `dev` target's schema to a personal one
   (`dev_<your_name>`) and explain why that matters on a real team.
3. Run `dbt debug` (against your own Snowflake trial, or
   conceptually) and list the three things it confirms before any
   model gets built.

## Check yourself

You're ready for Chapter 3 when you can write a two-target
`profiles.yml` from memory, using `env_var(...)` throughout, and
explain why `target: dev` being the default is a deliberate safety
choice.
