# PostgreSQL Architecture: Processes & Memory

PostgreSQL is the third platform in this course, and it starts, like Oracle and MySQL did,
with the same first question: how does the engine actually run on the box? The answer is
genuinely different from both platforms you've already covered, and it's worth understanding
before anything else — process model and memory layout explain almost every PostgreSQL
behavior you'll meet later, from why a single runaway query can't easily take down the whole
server to why `work_mem` shows up in nearly every tuning conversation.

## What you'll learn

- PostgreSQL's process-per-connection model, and how it differs from SQL Server's and
  Oracle's threaded/multiplexed approaches
- The postmaster and the background processes it supervises
- PostgreSQL's real memory areas: shared_buffers, work_mem, and maintenance_work_mem

## One process per connection, not one thread per connection

SQL Server handles client connections with worker threads inside a single `sqlservr.exe`
process, scheduled by its own SQLOS layer. Oracle, in its common configuration, does
something similar: server processes (or, in shared server mode, a smaller pool of
processes) service sessions, but Oracle's architecture is built around a shared System
Global Area that all of those processes attach to. PostgreSQL takes a third approach: it is
**process-per-connection**. When a client connects, the postmaster (the parent PostgreSQL
process that starts when the server boots) forks a brand-new operating-system process
dedicated to that one connection, called a *backend*. That backend process handles every
query on that connection until it disconnects.

This has real, practical consequences. A crash in one backend — a bug triggering a
segmentation fault, for example — doesn't take down the whole server the way a fatal error
inside a shared worker-thread pool could in theory affect siblings; PostgreSQL detects the
crashed backend, and the postmaster restarts the whole cluster into a clean state as a safety
measure, but the isolation model is fundamentally process-based, not thread-based. It also
means connection setup is heavier than SQL Server's thread-based connections — forking a
process costs more than spinning up a thread — which is exactly why connection pooling (with
tools like PgBouncer, covered later in this course) is such a standard, almost mandatory part
of running PostgreSQL at scale, in a way it isn't quite as central to SQL Server operations.

## The postmaster and its background processes

The **postmaster** is the first process that starts when you start a PostgreSQL cluster. It
listens for incoming connections, forks backend processes for them, and supervises a set of
permanent background processes that keep the cluster healthy:

- **background writer** — writes dirty pages from shared_buffers to disk gradually, so
  checkpoints don't have to flush everything at once
- **checkpointer** — performs checkpoints, ensuring all changes up to a point are durably on
  disk and marking where crash recovery can start from
- **WAL writer** — flushes Write-Ahead Log records to disk
- **autovacuum launcher** — starts autovacuum worker processes that reclaim space from dead
  rows (PostgreSQL's MVCC model, covered later, is exactly why this exists)
- **stats collector / statistics subsystem** — tracks table and index usage statistics

Every one of these is its own OS process, visible in `ps` output on Linux as separate
`postgres:` entries — a visibly different shape on the process list than SQL Server's single
`sqlservr.exe` or a small handful of Oracle background processes.

## Real memory areas: shared_buffers, work_mem, maintenance_work_mem

PostgreSQL's memory model has one large shared region and several per-operation regions:

- **shared_buffers** — the main shared memory cache, holding table and index pages so
  repeated reads don't hit disk. This is PostgreSQL's rough analog to SQL Server's buffer
  pool, but it's typically sized much smaller relative to total RAM (a common starting
  guideline is 25% of system memory, not "use most of it") because PostgreSQL also relies
  heavily on the operating system's own file-system cache — a double-caching layout SQL
  Server doesn't use the same way.
- **work_mem** — the memory a single sort, hash join, or other query operation is allowed to
  use before spilling to temporary disk files. Critically, this limit applies *per operation*,
  and a complex query can use several multiples of work_mem at once — a very different mental
  model from a single global setting.
- **maintenance_work_mem** — memory available to maintenance operations like `VACUUM`,
  `CREATE INDEX`, and `ALTER TABLE ADD FOREIGN KEY`; typically set higher than work_mem since
  these run less frequently but benefit from more memory per run.

Getting shared_buffers and work_mem right — and understanding that work_mem is a per-operation
budget, not a global cap — is one of the first real PostgreSQL tuning instincts to build, and
it will come back repeatedly later in this course.

## Key terms

| Term | Meaning |
|---|---|
| Postmaster | The parent PostgreSQL process that forks a backend process per client connection |
| Backend process | A dedicated OS process handling one client connection's queries |
| shared_buffers | PostgreSQL's shared memory cache for table and index pages |
| work_mem | Per-operation memory limit for sorts, hashes, and similar query operations |
| maintenance_work_mem | Memory budget for VACUUM, CREATE INDEX, and similar maintenance operations |

## Check yourself

Why does PostgreSQL's process-per-connection model make connection pooling closer to a
requirement than an optimization, in a way SQL Server's thread-based model doesn't?
