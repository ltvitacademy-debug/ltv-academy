# Script — Top Resource-Consuming Queries

## Segment 1 (title)

Last lesson showed how to pull one query's plan. This lesson flips it around: out of everything currently cached, which queries are actually costing the server the most — CPU, reads, or both? This is the query a DBA runs first when the server feels slow.

## Segment 2 (code: the server feels slow — start here)

Sorting dm_exec_query_stats by total_worker_time descending ranks cached plans by cumulative CPU time across every execution since they were cached. When the complaint is the server's CPU is pegged, this is the right starting point.

## Segment 3 (steps: total vs. average)

Total and average answer different questions. Total finds the biggest aggregate cost — a query running 100,000 times a day at 5 milliseconds each can easily outweigh a report that runs once and takes 30 seconds. Average finds the single worst execution.

## Segment 4 (code: the I/O-bound version)

The same DMV supports the I/O-bound version, sorted by total_logical_reads instead. Running both lists side by side and comparing them is standard triage — a query near the top of both is the one worth tuning first.

## Segment 5 (outro)

First-pass triage sorts by total; investigating one specific complaint sorts by average. Next up: parameter sensitivity — when the exact same cached plan is fast, then suddenly isn't.
