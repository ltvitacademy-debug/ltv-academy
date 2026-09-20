# Script — PostgreSQL Extensions Ecosystem

## Segment 1 (title)

This lesson closes the architecture chapter with arguably the most distinctive thing about PostgreSQL: extensions. Nothing else in this course — not SQL Server, not Oracle, not MySQL — has anything quite like it.

## Segment 2 (code: what an extension is)

An extension is a packaged bundle of new SQL types, functions, operators, or index types, installed with one command: CREATE EXTENSION. Once installed, they behave exactly like built-in features, and they're enabled per database, not per cluster.

## Segment 3 (code: PostGIS)

PostGIS is the best-known extension, and it's a serious industry-standard geospatial database on its own — a geography data type, spatial indexes, and hundreds of functions for distance and containment queries.

## Segment 4 (code: pg_stat_statements)

pg_stat_statements is a contrib extension nearly every production DBA enables, tracking call counts and execution times for every distinct query pattern — PostgreSQL's closest equivalent to Query Store or AWR, but opt-in rather than built in.

## Segment 5 (outro)

That's the extension philosophy: keep the core engine lean, let extensions add exactly the capability a deployment needs. Next up, starting Chapter 13: PostgreSQL roles and authentication.
