# Monitoring MongoDB with mongostat & Atlas

Chapter Four closes the same way good DBA practice always does: knowing how the server is
actually behaving right now, not just trusting that it's fine. MongoDB gives you two real
tools for this — `mongostat`/`mongotop` for command-line, real-time visibility, and Atlas's
built-in monitoring dashboards for a managed, no-setup alternative — the same two-tier
choice you already navigate between Perfmon/DMVs and a managed Azure SQL monitoring blade.

## What you'll learn

- What `mongostat` shows, and how to read it like `top` for MongoDB
- What `mongotop` adds on top of that
- What Atlas's built-in monitoring provides without any extra setup

## mongostat: real-time server stats

`mongostat` is a command-line tool, installed alongside the rest of the MongoDB tools,
that polls a running `mongod` and prints a continuously updating line of statistics —
genuinely comparable to running `top` against the database process itself:

```
mongostat --host localhost:27017
```

Each refreshed line shows real counters: `insert`, `query`, `update`, `delete` operations
per second, `dirty` and `used` memory percentages for the WiredTiger cache, active
`conn`ections, and replication lag (`repl`) when run against a replica set member. This is
the fast, no-dashboard way to answer "is this server under unusual load right now" during
an incident — the rough equivalent of pulling up `sys.dm_os_performance_counters` or a live
Perfmon capture on SQL Server, except it's a single command with no setup required.

## mongotop: where the time is going

`mongotop` narrows the question from "how busy is the server" to "which collection is
consuming the time":

```
mongotop --host localhost:27017
```

It reports read and write time per collection, refreshed continuously, so a spike in load
can be traced to a specific collection rather than the server as a whole — useful when
`mongostat` shows elevated activity but doesn't say where it's coming from.

## Atlas: managed monitoring dashboards

Running on MongoDB Atlas, this entire category becomes a UI rather than a terminal habit.
Atlas provides built-in, no-setup monitoring dashboards covering operation counters,
connections, cache and memory usage, replication lag, and disk I/O — the same categories
`mongostat`/`mongotop` expose, but retained historically and graphed, with configurable
alerts on top. Atlas also includes a **Performance Advisor**, which actively analyzes slow
operations and recommends indexes — going a step beyond raw monitoring into the kind of
tuning guidance a DBA would otherwise derive manually from `explain()` output.

## Choosing between them

`mongostat`/`mongotop` are what you reach for on a self-managed deployment, or in the
moment during an active incident when you're already at a terminal. Atlas's dashboards are
what a team actually lives in day to day — historical trends, alerting, and Performance
Advisor recommendations aren't something the CLI tools provide on their own. Neither
replaces the other; a self-managed production deployment still needs a longer-term
monitoring stack (Prometheus exporters, or MongoDB's own Ops Manager) built around what
`mongostat`/`mongotop` show in the moment.

## Key terms

| Term | Meaning |
|---|---|
| `mongostat` | CLI tool showing real-time server-wide operation counters, memory, and connections |
| `mongotop` | CLI tool showing read/write time broken down per collection |
| Atlas monitoring | Built-in Atlas dashboards for the same metrics, retained historically with alerting |
| Performance Advisor | Atlas feature that analyzes slow operations and recommends indexes |

## Check yourself

`mongostat` shows an unusually high `query` rate and elevated cache usage, but doesn't say
which collection is responsible. Per this lesson, which tool would you reach for next, and
why?
