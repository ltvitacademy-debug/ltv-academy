# Script — Views, Temporary & Transient Tables

## Segment 1 (title)

A Snowflake view is defined the same way as in SQL Server — a stored query, computed at read time, with no data of its own. SQL Server has permanent tables and hash-temp tables; Snowflake has three persistence types, and the middle one, transient, has no direct SQL Server equivalent at all.

## Segment 2 (code: three table types + view)

Views need no adjustment from T-SQL. Table persistence is the new concept: CREATE TABLE for permanent, CREATE TRANSIENT TABLE, and CREATE TEMPORARY TABLE.

## Segment 3 (steps: recovery windows compared)

Permanent tables, the default, get full Time Travel plus a 7-day Fail-safe recovery window. Transient tables have the same durability but no Fail-safe at all and minimal Time Travel — cheaper storage. Temporary tables are scoped to the session that created them, dropped automatically the moment it ends.

## Segment 4 (steps: why it matters)

Marking staging and intermediate pipeline tables transient is a routine cost-saving habit in Snowflake: staging data is reproducible from source, so it doesn't need a disaster-recovery window. SQL Server has no equivalent decision to make — every table carries the same recovery model by default.

## Segment 5 (outro)

Next lesson: MERGE in Snowflake — mostly similar to T-SQL's MERGE, with a few real differences worth knowing before you rely on it.
