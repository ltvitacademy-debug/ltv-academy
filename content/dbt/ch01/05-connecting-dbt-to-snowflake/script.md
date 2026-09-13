# Script — Connecting dbt to Snowflake

## Segment 1 (title)

The profile name in dbt_project.yml isn't a connection — it's a pointer. The real Snowflake account, warehouse, and credentials live somewhere else entirely, so nobody accidentally commits a password to Git.

## Segment 2 (screenshot: real dbt Cloud Snowflake credentials dialog)

This is the real dbt Cloud credentials dialog for connecting to Snowflake using key-pair authentication: an Auth Method dropdown, Username, an encrypted Private Key, a passphrase, and a Schema field — the personal development schema your models build into while you work.

## Segment 3 (steps: the dbt Core equivalent)

In dbt Core, the same information lives in a profiles.yml file, stored outside the project folder entirely, usually in a hidden dbt folder in your home directory — same auth method, same personal schema concept, just YAML instead of a web form.

## Segment 4 (steps: why the separation matters)

This separation is what lets ten analytics engineers share one Git repository while each connecting with their own Snowflake identity and their own dev schema, without a single shared password ever touching version control.

## Segment 5 (outro)

Next lesson: Your First dbt Run — actually running dbt run against this connection and reading the results.
