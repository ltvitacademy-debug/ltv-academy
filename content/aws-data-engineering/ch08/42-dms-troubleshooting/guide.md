# DMS Troubleshooting

Chapter 8 closes with the issues that actually show up in practice once a DMS migration is
running against a real, non-trivial database: large object columns that slow everything down,
rows that fail validation, a replication instance that's undersized for the workload, and
connectivity that looked fine until CDC needed a persistent connection instead of one. None of
these are exotic — they're the normal friction of migrating real production data.

## What you'll learn

- LOB (large object) handling modes and their performance tradeoffs
- Why DMS flags validation failures, and what usually causes them
- Replication instance sizing symptoms and fixes
- Common network/VPC connectivity failure points

## LOB (large object) handling

Columns like `VARCHAR(MAX)`, `TEXT`, `BLOB`, or `NCLOB` — large object (LOB) columns — need
special handling because DMS can't always know their size in advance the way it can with
fixed-width columns. DMS offers a few LOB modes: **Limited LOB mode** caps LOB size at a
configured maximum (faster, but truncates anything larger); **Full LOB mode** migrates LOBs of
any size but is noticeably slower, since DMS has to fetch each LOB in a separate pass after the
row's other columns. Tables with large or unpredictable LOB columns are a common source of
migration tasks that run far longer than expected — sizing the LOB mode correctly (or
excluding LOB columns that don't matter for analytics) is often the fix.

## Validation failures

DMS can optionally run **data validation** after migrating each table, comparing row counts
and, optionally, row-level content between source and target. Validation failures usually
trace back to one of a few causes: data type mismatches that silently truncate or convert
values differently on the target, timezone/collation differences between source and target
engines, or rows that changed on the source during a full load window before CDC picked them
up. Reading the validation failure detail (which rows, which columns) is the fastest way to
tell which of these is happening.

## Replication instance sizing

An undersized replication instance shows up as slow full loads, CDC **latency** (the gap
between a change committed on the source and applied on the target) that keeps growing instead
of staying near zero, or the instance running out of storage for its own internal buffering.
The fix is usually a larger instance class, or splitting a very large migration across
multiple tasks so no single replication instance is doing all the work.

## Network and VPC connectivity

A replication instance that works fine for a full load can still fail CDC if the *ongoing*
connection isn't stable — DMS needs to hold a persistent connection to the source's
transaction log, not just a connection long enough to run one query. Common causes: security
group rules that allow the initial connection but time out long-lived ones, a VPN/Direct
Connect link that isn't sized for sustained throughput, or a source database sitting behind a
NAT/firewall rule that wasn't tested for a long-lived session.

## Key terms

| Term | Meaning |
|---|---|
| LOB (large object) | A variable, often large column type (TEXT, BLOB, VARCHAR(MAX)) needing special DMS handling |
| Limited LOB mode | Caps LOB size at a configured max — faster, truncates oversized values |
| Full LOB mode | Migrates LOBs of any size — slower, fetched in a separate pass |
| CDC latency | The gap between a change committing on the source and appearing on the target |
| Data validation | DMS's optional post-migration comparison of source vs. target rows |

## Check yourself

A migration task's full load finished quickly, but CDC latency keeps climbing instead of
staying near zero. Is this more likely a LOB handling problem or a replication instance sizing
problem — and what's the general fix?
