# Server-Level Configuration Tuning

MAXDOP and cost threshold (Lesson 38) are two entries in a longer list of instance-level
`sp_configure` options that meaningfully affect performance. This lesson widens the view to
the rest of that list — the settings worth reviewing on every SQL Server instance, not just
accepting the installer's defaults.

## What you'll learn

- `sp_configure` mechanics — viewing, changing, and applying advanced options
- `max server memory` and why leaving it at the default is a real production risk
- `optimize for ad hoc workloads` and what it actually saves

## Viewing and changing configuration

```sql
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure;  -- lists every option, current and configured values
```

Most performance-relevant options are "advanced" and hidden until you flip that first
switch. Setting an option and running `RECONFIGURE` applies it; some options additionally
require `RECONFIGURE WITH OVERRIDE` or a service restart, which `sp_configure`'s own output
for that option will tell you.

## Max server memory

```sql
EXEC sp_configure 'max server memory', 24576; -- MB
RECONFIGURE;
```

Left at its default (effectively unlimited), the buffer pool can grow until it starves the
operating system and other processes of memory — a genuinely common cause of an
unexplained, sudden slowdown on a server that "was fine yesterday." This is Chapter 6
territory (buffer pool tuning) applied at the configuration level: setting `max server
memory` deliberately, leaving enough headroom for the OS, other SQL Server components (like
plan cache and worker threads), and any other software on the box, isn't optional tuning —
it's baseline hygiene for any production instance not running on a dedicated container with
its own memory limits already enforced.

## Optimize for ad hoc workloads

```sql
EXEC sp_configure 'optimize for ad hoc workloads', 1;
RECONFIGURE;
```

Normally, SQL Server caches a full compiled plan the first time it sees a query, even if
that exact query text is never seen again — common on systems with a lot of non-parameterized,
one-off ad hoc SQL. This option changes that: for a query's *first* execution, only a small
stub plan is cached instead of the full plan; the full plan is only cached once that exact
query text runs a second time. On systems with a lot of true one-off queries, this
meaningfully reduces plan cache bloat without hurting queries that actually do repeat.

## Other options worth reviewing

- **`max degree of parallelism`** and **`cost threshold for parallelism`** — covered fully in
  Lesson 38, but they belong in the same server-level review pass.
- **`recovery interval`** and checkpoint-related settings — affect how much work a checkpoint
  does and how long crash recovery takes; rarely need changing but worth confirming they
  weren't misconfigured.
- **`affinity mask`** / **`affinity I/O mask`** — historically used to pin SQL Server to
  specific CPUs; largely superseded by NUMA-aware scheduling on modern versions and rarely
  needed today except in specific multi-instance consolidation scenarios.

## A deliberate review, not a checklist to blindly apply

Every option here has a real tradeoff, and the right value depends on the workload and the
hardware — this is not a list to copy onto every server with the same numbers. Reviewing
`sp_configure`'s current values against what the workload and hardware actually call for,
and understanding *why* each non-default value was chosen, is the actual skill; a
correctly-tuned setting with no documented reasoning behind it is just as risky as an
untouched default; the next DBA (or you, six months later) has no way to know if it's still
appropriate.

## Key terms

| Term | Meaning |
|---|---|
| `sp_configure` | System procedure for viewing and changing instance-level configuration options |
| `max server memory` | Caps the memory SQL Server's buffer pool and other components can consume |
| `optimize for ad hoc workloads` | Caches only a small stub plan on a query's first execution, reducing plan cache bloat |
| Advanced options | `sp_configure` settings hidden until `show advanced options` is enabled |

## Check yourself

A server hosting SQL Server alongside another application has `max server memory` left at
its default. What's the actual production risk this lesson describes, and which configuration
option addresses it directly?
