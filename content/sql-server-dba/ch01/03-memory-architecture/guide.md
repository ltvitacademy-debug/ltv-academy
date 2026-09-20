# Memory Architecture

Lesson 2 covered the buffer pool in depth. That's the largest single consumer of SQL
Server's memory, but it isn't the only one. This lesson widens the view to how SQL Server
manages memory overall — the other major consumers, the settings a DBA actually controls,
and why "just give it more RAM" isn't the whole story.

## What you'll learn

- The major memory consumers inside SQL Server besides the buffer pool
- `max server memory` and `min server memory`, and why every instance should have them set
- What a memory grant is and why a badly-estimated one causes real problems

## Beyond the buffer pool

SQL Server allocates memory dynamically, growing and shrinking its total footprint within
boundaries a DBA sets, rather than claiming a fixed amount at startup. Inside that
footprint, the buffer pool competes for space with several other major consumers:

- **Plan cache** — compiled execution plans, cached so SQL Server doesn't have to
  re-parse and re-optimize the same query every time it runs. A plan cache bloated with
  thousands of single-use, non-parameterized ad-hoc plans can itself become a memory
  problem.
- **Memory grants** — memory reserved for a query's use during execution, mainly for sort
  and hash operations (a `SORT` or a hash join needs workspace memory, not just page
  cache).
- Connection-level and worker-thread structures, lock memory, and various caches for
  metadata, security tokens, and other internal bookkeeping.

Older SQL Server documentation talks about AWE (Address Windowing Extensions) for
accessing memory beyond a 32-bit process's normal addressable range. That's legacy — modern
SQL Server runs 64-bit only, addresses memory natively, and AWE doesn't apply.

## max server memory and min server memory

Two `sp_configure` settings give a DBA direct control over the Database Engine's memory
footprint:

- **`max server memory`** caps the total memory the Database Engine will use, primarily
  limiting buffer pool growth. Left at its default (effectively unlimited), SQL Server will
  keep consuming available RAM, potentially starving the OS and any other services on the
  box. Every production instance should have this set explicitly, low enough to leave
  headroom for the OS and any other services running on that server.
- **`min server memory`** sets a floor — once SQL Server's memory usage reaches this level,
  it won't release memory below it back to the OS under normal pressure. It doesn't
  pre-allocate memory at startup; it just stops the engine from shrinking further once it
  gets there.

A common real-world mistake is leaving `max server memory` at its default on a box that
also runs other services — SQL Server happily takes memory those other processes needed,
and the whole server starts paging.

## Memory grants

Before executing a query plan that needs workspace memory — for a sort, a hash join, or a
hash aggregate — the optimizer estimates how much memory that operation will need and
requests a **memory grant** for it. If the estimate is too low (often because statistics
are stale or a parameter sniffing issue skewed the row-count estimate), the operation can
spill to disk — writing intermediate sort or hash results to `tempdb` because it didn't get
enough memory to do the work purely in RAM. A spill turns a fast in-memory operation into a
slow disk-bound one, and it's a very common real-world performance symptom traced straight
back to bad estimates.

## Key terms

| Term | Meaning |
|---|---|
| Plan cache | Memory area holding compiled execution plans for reuse |
| Memory grant | Memory reserved for a query's sort/hash workspace during execution |
| max server memory | `sp_configure` setting capping total Database Engine memory usage |
| min server memory | `sp_configure` setting for the floor SQL Server won't shrink below |
| Spill | When a memory grant is too small and an operation writes intermediate results to tempdb on disk |

## Check yourself

A dedicated SQL Server box has 64 GB of RAM and `max server memory` left at its default.
What's likely to go wrong, and what would you set it to instead?
