# Script — Connections

## Segment 1 (title)

Every DAG that talks to something external needs a host, a login, a password — sometimes more. Without Connections, that ends up hardcoded and copy-pasted into every DAG file that needs it. A Connection stores that information exactly once, under an ID, so DAGs reference the ID instead of the secret.

## Segment 2 (steps: what a Connection stores)

A Connection is a named record: Connection Id, Connection Type, Host, Login, Password, Port, and an Extra field for anything type-specific — a Snowflake account and warehouse, for example. The type determines which fields actually matter.

## Segment 3 (screenshot: Connections list)

Connections live under Admin > Connections. Every row here is one stored connection. A DAG that references "snowflake_default" or "postgres_dw" is pointing at exactly one of these rows — nothing more.

## Segment 4 (screenshot: Add Connection form)

Adding one opens the same fixed set of fields. This is the only place the actual password gets typed. Every DAG downstream just says "use this conn_id" and never touches the value directly.

## Segment 5 (steps: how code refers to it)

A DAG never imports a password — it refers to a conn_id, and the lookup happens at run time. snowflake_conn_id="snowflake_default" is the entire link between the DAG file and the real account and password sitting in that Connection record.

## Segment 6 (outro)

Next lesson: Hooks — the code-level object that actually reads a Connection and knows how to talk to that system.
