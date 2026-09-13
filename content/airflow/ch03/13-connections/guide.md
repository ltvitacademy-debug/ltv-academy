# Lesson 13 — Connections

**Chapter 3 · Connections, Hooks & Providers · Lesson 13 of 30**

## What you'll learn

- The problem Connections solve: credentials repeated in every DAG
- What a Connection actually stores, and what `conn_id` means
- How to view and add a Connection in the Airflow UI
- How a DAG refers to a Connection without ever seeing the secret itself

## The problem: credentials scattered across DAGs

Every DAG that talks to something external — a database, an API, a
cloud storage bucket — needs a host, a login, a password, sometimes a
port and a handful of extra options. Without Connections, that
information ends up hardcoded into DAG files, copy-pasted from one DAG
to the next, and rotated by hand in a dozen places whenever a password
changes.

A **Connection** is Airflow's answer: store the credential and
connection details exactly once, give that stored record an ID, and
have every DAG reference it by that ID instead of holding the actual
secret.

## What a Connection stores

A Connection is a named record with a fixed set of fields:

| Field | Meaning |
|---|---|
| Connection Id | The short name (`conn_id`) DAGs use to reference this connection |
| Connection Type | What kind of system this is (Postgres, Snowflake, HTTP, etc.) — determines which fields matter |
| Host | The server or account address |
| Schema | Default database/schema, if applicable |
| Login / Password | Credentials, stored encrypted (via Airflow's Fernet key or a configured secrets backend) |
| Port | Network port, if applicable |
| Extra | A JSON blob for anything connection-type-specific (e.g. a Snowflake account, warehouse, or role) |

Airflow ships with a few Connections out of the box, and you add the
rest yourself as your DAGs need to reach real systems.

## Viewing Connections in the UI

Connections live under Admin > Connections:

![Airflow's Admin > Connections page: a table listing registered connections with columns for Conn Id, Conn Type, Description, and Host.](/courses/airflow/ch03/13-connections/admin_connections.png)
*Every row here is one stored connection. A DAG that references `snowflake_default` or `postgres_dw` is pointing at exactly one of these rows — nothing more.*
Source: [Apache Airflow Documentation — UI Overview](https://airflow.apache.org/docs/apache-airflow/stable/ui.html)

## Adding a Connection

Clicking "Add" opens the same fixed set of fields described above:

![Airflow's 'Add Connection' form: fields for Connection Id, Connection Type, Host, Schema, Login, Password, Port, and Extra.](/courses/airflow/ch03/13-connections/admin_connections_add.png)
*This is the only place the actual password gets typed. Every DAG downstream just says "use `conn_id='snowflake_default'`" and never touches the value directly.*
Source: [Apache Airflow Documentation — UI Overview](https://airflow.apache.org/docs/apache-airflow/stable/ui.html)

Connections can also be created from the command line (`airflow
connections add`) or defined as environment variables — useful for
CI/CD and infrastructure-as-code setups where you don't want secrets
managed by hand through a UI at all. Either way, the shape is the
same: a `conn_id`, a type, and the fields that type needs.

## How code refers to a Connection

A DAG never imports a password. It refers to a `conn_id`, and the
lookup happens at run time:

```python
from airflow.providers.snowflake.operators.snowflake import SnowflakeOperator

run_query = SnowflakeOperator(
    task_id="run_query",
    snowflake_conn_id="snowflake_default",
    sql="SELECT COUNT(*) FROM orders;",
)
```

`snowflake_conn_id="snowflake_default"` is the entire link. Nothing in
this DAG file knows the account, warehouse, login, or password — that
all lives in the Connection record, resolved when the task actually
runs. The next two lessons cover exactly how that resolution
happens: **Hooks** are the code-level object that reads a Connection
and knows how to talk to that system, and **Provider packages** are
where connection types like "Snowflake" come from in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Connection | A stored record of credentials/connection details, identified by a `conn_id` |
| conn_id | The short name a DAG uses to reference a Connection, without holding its secret |
| Connection Type | Which system a Connection targets (Postgres, Snowflake, HTTP, etc.) — determines which fields apply |
| Extra | A JSON field on a Connection for type-specific settings not covered by the standard fields |

## Lab

1. In your local Airflow UI, open Admin > Connections and look at the
   default connections Airflow ships with — note their `conn_id`
   values and types.
2. Add a new Connection for any system you have credentials for (even
   a throwaway Postgres or HTTP endpoint) and give it a memorable
   `conn_id`.
3. Do not write any DAG code yet — just confirm the Connection saves
   and shows up in the list with the fields you expect.

## Check yourself

You're ready for Lesson 14 when you can explain, in one sentence, why
a DAG references a `conn_id` instead of hardcoding a host and
password directly.
