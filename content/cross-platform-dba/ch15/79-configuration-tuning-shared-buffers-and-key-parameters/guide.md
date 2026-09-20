# Configuration Tuning: shared_buffers & Key Parameters

This chapter's tools — EXPLAIN ANALYZE, indexing, VACUUM, pg_stat_statements — all operate
within whatever memory PostgreSQL has been configured to use. This lesson covers the
parameters that set those boundaries, starting with the one every SQL Server DBA will
recognize the purpose of immediately, even though the name and defaults are different.

## What you'll learn

- shared_buffers, PostgreSQL's equivalent-purpose setting to the SQL Server buffer pool
- work_mem and why it's set per-operation, not server-wide
- effective_cache_size and maintenance_work_mem, and what each actually controls

## shared_buffers: PostgreSQL's buffer pool

`shared_buffers` sets how much memory PostgreSQL dedicates to caching table and index
pages in shared memory across all connections — the same role the SQL Server buffer pool
plays, caching data pages so repeated reads hit memory instead of disk. The often-cited
starting point is roughly 25% of system RAM, well below what a SQL Server DBA might expect,
because PostgreSQL also relies heavily on the operating system's own filesystem cache for
the rest — data not in `shared_buffers` often still comes from OS cache rather than actual
disk I/O, so PostgreSQL doesn't try to claim all available memory itself the way some
databases do.

```
# postgresql.conf — requires a restart to take effect
shared_buffers = 4GB
```

## work_mem: per-operation, not server-wide

`work_mem` sets how much memory a *single* sort, hash, or similar operation is allowed to
use before it spills to disk (a "sort spilling to disk," visible in `EXPLAIN ANALYZE`
output, is exactly the kind of thing this parameter controls). Critically, `work_mem` isn't
a total budget — it applies **per operation**, and a complex query can use multiple sorts
or hashes simultaneously, each getting its own `work_mem` allowance. That means setting it
too high risks memory exhaustion under concurrent load, not because one query used too much,
but because many queries each claimed their own allotment at the same time.

```sql
SET work_mem = '64MB';   -- session-level, or set globally in postgresql.conf
```

## effective_cache_size: a hint, not an allocation

`effective_cache_size` doesn't allocate any memory at all — it tells the query planner
roughly how much total memory (shared_buffers plus OS cache) is realistically available for
caching, so the planner can estimate whether an index scan is likely to find its pages
already cached. Set too low, the planner may favor sequential scans more often than the
real cache situation warrants.

## maintenance_work_mem: for VACUUM, indexing, and similar operations

`maintenance_work_mem` is a separate, usually larger allowance for maintenance operations
specifically — `VACUUM`, `CREATE INDEX`, `ALTER TABLE ADD FOREIGN KEY`. These run less
often than everyday queries but benefit from more memory when they do, so PostgreSQL keeps
this budget independent of `work_mem` rather than forcing one setting to cover both.

## Key terms

| Term | Meaning |
|---|---|
| shared_buffers | Memory PostgreSQL dedicates to caching pages — the equivalent-purpose setting to SQL Server's buffer pool |
| work_mem | Memory allowed per sort/hash operation before it spills to disk; applies per operation, not as a total budget |
| effective_cache_size | Planner hint estimating total cacheable memory (shared_buffers + OS cache); allocates nothing itself |
| maintenance_work_mem | Separate memory allowance for VACUUM, index builds, and similar maintenance operations |

## Check yourself

Why does setting work_mem very high on a server with many concurrent connections risk
memory exhaustion, even though no single query looks like it's asking for an unreasonable
amount?
