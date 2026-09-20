# Script — Capacity Monitoring

## Segment 1 (title)

Chapter 8 closes with the question every autogrowth conversation leads to: how much space is actually left, and how fast is it disappearing? This lesson builds the T-SQL a DBA runs on a schedule to answer that before a drive fills up overnight.

## Segment 2 (code: space usage inside a file)

Sys.dm_db_file_space_usage reports space usage inside the current database's files. Run against tempdb, it answers the question that matters most there: is tempdb actually full, or does it just look busy, since its space gets reused constantly within the file's allocated size.

## Segment 3 (code: free space at the volume level)

Sys.dm_os_volume_stats takes a database_id and file_id and returns the underlying Windows volume's real capacity and free space — the same number Explorer would show, but queryable in T-SQL and joinable against every file on the instance in one pass.

## Segment 4 (steps: snapshot to trend)

A single run of either query is just a snapshot. The useful version runs daily as an Agent job and logs results to a history table, so it can answer how many days until this drive is full at the current rate — the actual goal of capacity monitoring.

## Segment 5 (outro)

That's the whole chapter on integrity and maintenance. Next up: Chapter 9, Performance Troubleshooting with T-SQL, starting with Query Store queries.
