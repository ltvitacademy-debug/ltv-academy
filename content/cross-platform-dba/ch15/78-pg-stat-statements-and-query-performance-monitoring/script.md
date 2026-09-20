# Script — pg_stat_statements & Query Performance Monitoring

## Segment 1 (title)

EXPLAIN ANALYZE tells you everything about one query you already suspect is slow. It
doesn't tell you which query out of thousands you should look at first. pg_stat_statements
is PostgreSQL's answer to that, the same role SQL Server's Query Store plays.

## Segment 2 (code: enabling it)

It requires a restart to load, because it's listed in shared_preload_libraries, then gets
created as an extension inside the database. From there, every query gets tracked,
aggregated by normalized text so literal values don't create separate entries.

## Segment 3 (code: finding your worst offenders)

Sort by total_exec_time to find queries costing the most cumulative server time — a query
run 100,000 times at 2ms each can cost more than one slow query run once. Sort by
mean_exec_time instead to find individually slow queries.

## Segment 4 (outro)

This is the measure step from the tuning methodology, applied server-wide — find the worst
offender here, then take it into EXPLAIN ANALYZE. Next up: shared_buffers and the other key
configuration parameters that shape performance.
