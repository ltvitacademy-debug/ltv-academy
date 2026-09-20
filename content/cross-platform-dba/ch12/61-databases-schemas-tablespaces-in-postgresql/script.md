# Script — Databases, Schemas & Tablespaces in PostgreSQL

## Segment 1 (title)

PostgreSQL's object hierarchy looks like SQL Server's on the surface, but one link means something meaningfully different. In PostgreSQL, a schema is a real namespace, functionally closer to what a database feels like day to day.

## Segment 2 (steps: the hierarchy)

The hierarchy runs cluster to database to schema to table. A cluster is one server managing one or more databases, each a genuinely isolated namespace — connections are scoped to exactly one database, unlike SQL Server's easy three-part cross-database naming.

## Segment 3 (code: schema as namespace)

You can still join across schemas in the same database with ordinary SQL, just like SQL Server. But PostgreSQL practice leans on schemas more heavily as an organizational tool — one schema per application or tenant inside a shared database is a genuinely common pattern.

## Segment 4 (code: tablespaces)

A tablespace tells PostgreSQL where on disk a database or object's files physically live, independent of the logical hierarchy. It's a server-wide object, conceptually similar to SQL Server filegroups mapped to separate disks.

## Segment 5 (outro)

That's the honest comparison: PostgreSQL's isolation lives at the database level, and schemas are the flexible organizational layer underneath. Next up: psql, pgAdmin, and the real tools DBAs use day to day.
