# Script — PostgreSQL Architecture: Processes & Memory

## Segment 1 (title)

PostgreSQL is the third platform in this course, and it starts the same way Oracle and MySQL did — with process model and memory layout, because those explain almost everything else you'll meet later.

## Segment 2 (code: one process per connection)

SQL Server uses worker threads inside one process, and Oracle uses server processes attached to a shared SGA. PostgreSQL is process-per-connection — the postmaster forks a brand-new operating system process, called a backend, for every client connection.

## Segment 3 (steps: background processes)

The postmaster supervises a set of permanent background processes: the background writer flushes dirty pages gradually, the checkpointer performs checkpoints, the WAL writer flushes log records, and the autovacuum launcher reclaims space from dead rows.

## Segment 4 (code: memory areas)

shared_buffers is PostgreSQL's shared memory cache, typically sized around a quarter of system RAM because PostgreSQL also leans on the OS file cache. work_mem is a per-operation budget for sorts and hashes, and maintenance_work_mem covers VACUUM and index builds.

## Segment 5 (outro)

This process-per-connection model is exactly why connection pooling is nearly mandatory in real PostgreSQL deployments. Next up: installing PostgreSQL and getting a real cluster running, step by step.
