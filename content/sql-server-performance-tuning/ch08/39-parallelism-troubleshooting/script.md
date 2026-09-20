# Script — Parallelism Troubleshooting

## Segment 1 (title)

Lesson 38 covered the settings that decide whether and how wide a query goes parallel. This lesson is about diagnosing parallelism that's already causing pain — the wait types involved, and how to find the specific queries responsible.

## Segment 2 (steps: CXPACKET vs CXCONSUMER)

CXPACKET is a thread waiting on other threads in the same parallel operation — some of it is completely normal. CXCONSUMER was isolated starting in SQL Server 2016 to separate normal producer-consumer waiting from an actual bottleneck. High CXPACKET as a top wait usually means either the cost threshold is too low or there's real skew in the parallel work.

## Segment 3 (code: finding over-parallelized queries)

sys.dm_exec_query_stats aggregated by query_hash surfaces queries burning a lot of total worker time relative to their execution count. High worker time without a corresponding drop in duration is parallelism overhead without much payoff — a candidate for a higher cost threshold or a targeted MAXDOP hint.

## Segment 4 (code: skew, not a setting problem)

The execution plan itself shows skew directly — hover the parallelism exchange operator and check actual rows processed per thread. One thread doing ninety percent of the work while the others sit idle is skew, and it's fixed on the query or statistics side, not by adjusting a parallelism setting.

## Segment 5 (outro)

Not every parallelism symptom has a parallelism-setting fix. Next up: server-level configuration tuning — the sp_configure options that matter most for performance overall.
