# Script — Query Store Queries

## Segment 1 (title)

Chapter 9 turns from is the server healthy to which queries are actually the problem, and how do you prove it. Query Store is where that proof lives — SQL Server's built-in, persisted history of every query, every plan it's used, and how each one performed.

## Segment 2 (code: off by default pre-2022)

Query Store is per-database and, before SQL Server 2022, off by default. Turning it on takes two statements: setting QUERY_STORE to ON, then configuring operation mode to read_write, which is what actually captures new data as it happens.

## Segment 3 (steps: three catalog views, joined on IDs)

The data model is three catalog views joined on IDs. Query_store_query has one row per distinct query. Query_store_plan has one row per execution plan that query has ever used. Query_store_runtime_stats has the actual performance numbers per plan, per time interval.

## Segment 4 (code: finding a query's real history)

Joining all four views — including query_store_query_text for the actual SQL text — is the everyday query for a query's real history. And unlike the plan cache, this history survives a service restart, because Query Store writes to disk.

## Segment 5 (outro)

That's why Query Store answers did this query's performance change last week, not just how is it running right now. Next up: execution plans and the plan cache — what's actually live in memory this moment.
