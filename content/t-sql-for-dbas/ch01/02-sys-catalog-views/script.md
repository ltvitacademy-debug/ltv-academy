# Script — sys Catalog Views

## Segment 1 (title)

Every SQL Server instance exposes its own metadata as queryable tables and views called catalog views. Instead of clicking through Object Explorer, you can select directly from sys.databases, sys.tables, sys.columns, and sys.indexes to see exactly what's on the server.

## Segment 2 (code: instance-wide metadata)

Sys.databases lists every database on the instance — its name, database ID, current state, recovery model, and collation. It's instance-wide: query it from any database and you see the whole server, including whether a database is online, restoring, or suspect.

## Segment 3 (code: database-scoped metadata)

Sys.tables and sys.columns, by contrast, only ever describe the database you're connected to. Join them on object_id, add sys.types, and you get every column in a table along with its real data type and nullability.

## Segment 4 (steps: four core views)

Four catalog views cover most day-to-day metadata questions: sys.databases for the instance-wide database list, sys.tables for tables in the current database, sys.columns for columns on a table, and sys.indexes for indexes defined on an object.

## Segment 5 (outro)

Catalog views describe structure — what exists. Next up: Dynamic Management Views and Functions, which describe what SQL Server is doing right now.
