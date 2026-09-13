# Script — Databases, Schemas & Tables in Snowflake

## Segment 1 (title)

Snowflake organizes every object into a strict three-level hierarchy: database, then schema inside it, then table inside that schema. A database is a logical container, not a physical file the way an .mdf is in SQL Server.

## Segment 2 (screenshot: New Database dialog)

Creating a database is just naming a container — there's no file path or storage setting to configure, unlike creating a database file in SQL Server.

## Segment 3 (steps: comparison to SQL Server)

This shape is identical to what you already do in SQL Server with dbo.Orders or sales.Orders — database, schema, table. The real difference is that a Snowflake session also has an active role and warehouse alongside database and schema, because compute is a separate concern.

## Segment 4 (screenshot: database/schema picker)

Database and schema are picked right from the worksheet's context selector, same place as the role and warehouse pickers. You can also set them explicitly with USE DATABASE and USE SCHEMA. One quiet difference: unquoted identifiers are case-insensitive and folded to uppercase, unlike quoted identifiers.

## Segment 5 (outro)

Next lesson: virtual warehouses in depth — sizing, scaling, and the auto-suspend and auto-resume behavior that makes Snowflake's compute layer so different from a SQL Server instance you leave running all day.
