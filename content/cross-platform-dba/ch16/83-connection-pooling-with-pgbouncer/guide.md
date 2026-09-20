# Connection Pooling with PgBouncer

Chapter 12 established that PostgreSQL forks a dedicated backend process for every client
connection — a real architectural difference from SQL Server's thread-based connection
handling. This lesson picks that fact back up: process-per-connection is exactly why
connection pooling is a much more operationally important piece of a PostgreSQL deployment
than it typically is on SQL Server, and PgBouncer is the tool the PostgreSQL ecosystem
standardized on to handle it.

## What you'll learn

- Why process-per-connection makes connection pooling matter more in PostgreSQL
- What PgBouncer actually does, sitting between clients and PostgreSQL
- The three pooling modes and the tradeoff each one makes

## Why process-per-connection makes this matter

Every PostgreSQL connection is a full OS process, with its own memory overhead and its own
share of `shared_buffers` bookkeeping. That's cheap for a handful of long-lived connections
but gets expensive fast under a workload that opens and closes many short connections — a web
application spinning up a fresh connection per request, for example. Forking a process per
connection has real CPU and memory cost, and PostgreSQL's practical ceiling on concurrent
connections is far lower than the tens of thousands of concurrent sessions a thread-based
engine can often sustain. A SQL Server DBA used to a lightweight thread-based connection model
can underestimate how quickly an unpooled PostgreSQL workload hits connection-count trouble;
this is a place where the two platforms genuinely don't behave the same way, not just a naming
difference.

## What PgBouncer actually does

PgBouncer is a lightweight, widely-used connection pooler that sits between client
applications and PostgreSQL. Clients connect to PgBouncer instead of connecting to PostgreSQL
directly; PgBouncer maintains a much smaller pool of actual PostgreSQL backend connections and
hands them out to clients as needed, reusing a real connection across many client requests
instead of opening a new backend process per client. Because PgBouncer itself is single-
purpose and lightweight, it can hold open far more client-facing connections than PostgreSQL
could ever accept directly, while keeping the actual number of expensive backend processes on
the database small and stable.

## The three pooling modes

PgBouncer supports three pooling modes, and the choice matters because it trades off
connection efficiency against what session-level features remain available:

- **Session pooling** — a client keeps its assigned server connection for the entire client
  session, released only when the client disconnects. Safest, most compatible with session-
  level features like prepared statements or session-level settings, but gives the least
  connection reuse.
- **Transaction pooling** — a server connection is assigned only for the duration of a single
  transaction, then returned to the pool immediately after. This is the mode most deployments
  actually run, because it gives far better connection reuse under high-concurrency, short-
  transaction workloads. The cost is that session state (like `SET` statements meant to persist
  across transactions, or session-scoped temp tables) can't be relied on to survive between
  transactions, since the next transaction might land on a different backend entirely.
- **Statement pooling** — a server connection is returned to the pool after each individual
  statement, even within a transaction. It maximizes reuse but is the most restrictive; most
  real applications don't use it, because it breaks multi-statement transactions.

Transaction pooling is the default most teams reach for once they understand the session-state
tradeoff, because it's what actually solves the process-per-connection cost problem at scale.

## Key terms

| Term | Meaning |
|---|---|
| Process-per-connection | PostgreSQL's architecture of forking a dedicated OS process per client connection |
| PgBouncer | Lightweight connection pooler sitting between clients and PostgreSQL |
| Session pooling | A pooled connection held for a client's entire session |
| Transaction pooling | A pooled connection held only for one transaction's duration; most common mode |
| Statement pooling | A pooled connection released after each statement; most restrictive mode |

## Check yourself

An application team complains that a `SET search_path` they run at connection time stops
taking effect reliably after they switch to PgBouncer's transaction pooling mode. Explain why
that's happening, in terms of what transaction pooling actually guarantees.
