# Lesson 5 — Connecting dbt to Snowflake

**Chapter 1 · Analytics Engineering & dbt Fundamentals · Lesson 5 of 45**

## What you'll learn

- What actually fills in `profile:` from `dbt_project.yml` — real
  connection credentials, stored outside the project
- The real dbt Cloud "Credentials" dialog for connecting to Snowflake
- The dbt Core equivalent: `profiles.yml`
- Why credentials are never checked into a dbt project's version
  control

## Where the actual connection lives

Lesson 4 showed `profile: 'default'` in `dbt_project.yml` — a name,
not a connection. The real Snowflake account, warehouse, database,
and credentials live somewhere else entirely, on purpose: so nobody
accidentally commits a password to Git.

- **In dbt Cloud**, that "somewhere else" is a Connection you set up
  in the web UI.
- **In dbt Core**, it's a `profiles.yml` file that lives outside your
  project folder (by default in `~/.dbt/`), never checked into
  version control.

## The real dbt Cloud Snowflake connection dialog

This is the actual credentials form dbt Cloud shows when connecting a
project to Snowflake, using key-pair authentication (dbt's
recommended method over a plain username/password):

![The real "Credentials for project 'Snowflake'" dialog in dbt Cloud: Auth Method dropdown set to Key Pair, with fields for Username, an encrypted Private Key block, Private Key Passphrase, and Schema.](/courses/dbt/ch01/05-connecting-dbt-to-snowflake/snowflake-keypair-auth.png)
*Key-pair auth: a private key instead of a password — the same Snowflake key-pair concept from the prerequisite Snowflake course, now feeding dbt.*
Source: [dbt Docs — Connect to Snowflake](https://docs.getdbt.com/docs/cloud/connect-data-platform/connect-snowflake)

Notice **Schema** at the bottom — that's the personal development
schema dbt will build your models into while you work, separate from
whatever schema the same project builds into in production. You
already know schemas from Snowflake; this is dbt using that same
concept to keep your dev work out of everyone else's way.

## The dbt Core equivalent

The same information, as a `profiles.yml` file for dbt Core:

```yaml
# ~/.dbt/profiles.yml — never inside the project folder
jaffle_shop:
  target: dev
  outputs:
    dev:
      type: snowflake
      account: your_account.snowflakecomputing.com
      user: your_username
      private_key_path: /Users/you/.ssh/snowflake_key.p8
      private_key_passphrase: "{{ env_var('SNOWFLAKE_KEY_PASSPHRASE') }}"
      role: transformer
      database: analytics
      warehouse: transforming
      schema: dbt_yourname
      threads: 4
```

Same auth method, same idea of a personal schema — just as a YAML
file instead of a web form, and deliberately stored outside the
project so it can never end up in a commit.

## Why this separation matters

If credentials lived inside the project (in `dbt_project.yml`, say),
every developer's personal password would need to be the same
committed file, or everyone would be editing shared config to swap
their own in. Keeping the connection outside the project is what
lets ten analytics engineers share one Git repo while each connecting
with their own Snowflake identity and their own dev schema.

## Key terms

| Term | Meaning |
|---|---|
| Connection | dbt Cloud's stored Snowflake credentials, set up in the web UI |
| `profiles.yml` | dbt Core's equivalent — a YAML file outside the project, usually in `~/.dbt/` |
| Key-pair auth | Snowflake authentication using a private key instead of a password |
| Dev schema | The personal schema a developer's models build into while working |

## Lab

1. If you have Snowflake access from the prerequisite course, locate
   (or generate) a key pair for your user, following Snowflake's own
   key-pair setup docs.
2. Either connect a dbt Cloud project using the dialog shown above, or
   write your own `profiles.yml` using the template above with your
   real account, user, and dev schema.
3. Run `dbt debug` (dbt Core) or use dbt Cloud's "Test Connection"
   button, and confirm you get a real "Connection test: OK" result.

## Check yourself

You're ready for Lesson 6 when you have a working connection from
dbt to your own Snowflake account — and can explain why the
credentials live outside the dbt project's version control either
way.
