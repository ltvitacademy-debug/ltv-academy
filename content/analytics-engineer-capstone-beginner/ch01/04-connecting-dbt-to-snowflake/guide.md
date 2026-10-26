# Lesson 4 — Setting Up the dbt Project and Connecting to Snowflake

**Chapter 1 · Beginner Capstone: First dbt Model on Snowflake · Lesson 4 of 10**

## What you'll learn

- The real `dbt init` command and what it actually scaffolds
- Where the real connection to Snowflake lives, and why it's never checked into the project
- The real `profiles.yml` syntax for this capstone's own connection
- How to confirm the connection actually works before writing a single model

## Scaffolding the project with `dbt init`

With `raw_customers` already sitting in Snowflake (Lesson 3), the next step is creating
the dbt project itself:

```bash
dbt init jaffle_shop_capstone
```

This is the same real command from the prerequisite dbt course — it asks a few questions
(which warehouse, basic connection details) and scaffolds a folder structure:
`dbt_project.yml`, a `models/` folder, and a few starter files. `dbt_project.yml` names
the project and its `profile:` — a name, not a connection, exactly like the dbt course
already taught.

```yaml
# dbt_project.yml
name: 'jaffle_shop_capstone'
version: '1.0.0'
profile: 'jaffle_shop_capstone'

model-paths: ["models"]
```

## Where the real connection lives

The actual Snowflake account, warehouse, database, and credentials are never stored
inside the project folder — they live in `profiles.yml`, outside the project (by default
in `~/.dbt/`), so nobody accidentally commits a password to Git. This is the same
separation the prerequisite dbt course taught, now applied to this capstone's own
connection:

```yaml
# ~/.dbt/profiles.yml — never inside the project folder
jaffle_shop_capstone:
  target: dev
  outputs:
    dev:
      type: snowflake
      account: your_account.snowflakecomputing.com
      user: your_username
      private_key_path: /Users/you/.ssh/snowflake_key.p8
      private_key_passphrase: "{{ env_var('SNOWFLAKE_KEY_PASSPHRASE') }}"
      role: transformer
      database: jaffle_shop_raw
      warehouse: transforming
      schema: dbt_yourname
      threads: 4
```

Notice `database: jaffle_shop_raw` — that's the exact database Lesson 3 loaded
`raw_customers` into. This connection file is what makes dbt able to see that table at
all.

## Why the profile name has to match

`profile: 'jaffle_shop_capstone'` in `dbt_project.yml` and the top-level key
`jaffle_shop_capstone:` in `profiles.yml` have to be the exact same string — that's how
dbt connects a project to its credentials. Two different files, two different purposes
(one checked into Git, one never checked in), joined by one shared name.

## Confirming the connection works

Before writing any model, confirm dbt can actually talk to Snowflake:

```bash
dbt debug
```

A working connection ends with `Connection test: [OK connection ok]`. If it doesn't,
`dbt debug` tells you exactly which setting is wrong — a typo'd account name, an
expired key, a role that can't see the `jaffle_shop_raw` database. Fixing it here, before
any model exists, is far cheaper than debugging a confusing model-build error later that's
actually a connection problem in disguise.

## Key terms

| Term | Meaning |
|---|---|
| `dbt init` | Scaffolds a new dbt project folder with `dbt_project.yml` and a `models/` directory |
| `profile:` | The name in `dbt_project.yml` that must match a top-level key in `profiles.yml` |
| `profiles.yml` | The connection file, stored outside the project, never checked into version control |
| `dbt debug` | The command that confirms a working connection before any model gets built |

## Lab

1. Run `dbt init` for this capstone (or set up the project structure by hand if you're
   working from a template) and look at the real `dbt_project.yml` it produces.
2. Write your own `profiles.yml` entry pointing at the Snowflake account and
   `jaffle_shop_raw` database from Lesson 3, using the template above.
3. Run `dbt debug` and get to a real `Connection test: [OK connection ok]` before moving
   on.

## Check yourself

You're ready for Lesson 5 when `dbt debug` reports a working connection against your own
Snowflake account and `jaffle_shop_raw` database — and you can explain why `profiles.yml`
lives outside the project folder on purpose.
