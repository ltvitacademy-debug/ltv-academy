# Script — Project: Performance Tuning Across Platforms

## Segment 1 (title)

Three tickets land the same week: finance's month-end report is timing out, checkout is lagging during a sale, and a BI dashboard is suddenly slow. Same discipline every time — measure, identify, change, verify — but a completely different toolset on each platform.

## Segment 2 (code: Oracle)

On Oracle, an AWR report points to a full table scan on GL_JOURNAL_LINES. Two problems, a missing index on journal_date and stale optimizer statistics. Adding the index and regathering stats with DBMS_STATS drops the report from twenty minutes back under a minute, confirmed with DBMS_XPLAN.

## Segment 3 (code: MySQL)

On MySQL, EXPLAIN shows a full table scan, type ALL, on the orders table because customer_email has no index. Under sale-day concurrency that's the bottleneck. Adding an index turns that scan type into ref, and lookup time drops from seconds to milliseconds.

## Segment 4 (code: PostgreSQL)

On PostgreSQL, pg_stat_user_tables shows sales_fact has far more dead tuples than live ones. The nightly ETL job's heavy upserts are outrunning the default autovacuum threshold. Tightening autovacuum_vacuum_scale_factor for just this table and running VACUUM ANALYZE brings dead tuples back down.

## Segment 5 (outro)

Same measure-identify-change-verify discipline, three different root causes, three different tools. Next up, Lesson 95: turning this project into answers you can actually give in a cross-platform DBA interview.
