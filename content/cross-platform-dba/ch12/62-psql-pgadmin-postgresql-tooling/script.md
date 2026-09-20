# Script — psql, pgAdmin & PostgreSQL Tooling

## Segment 1 (title)

PostgreSQL's tooling pair, psql and pgAdmin, plays the same role SSMS and sqlcmd play for SQL Server, or SQL*Plus and SQL Developer play for Oracle. Where real work happens differs a bit from SQL Server culture, though.

## Segment 2 (code: psql)

psql is PostgreSQL's official command-line client. Beyond ordinary SQL, its defining feature is backslash meta-commands — client-side shortcuts like backslash-l to list databases, backslash-dt to list tables, and backslash-d to describe a table's columns and indexes.

## Segment 3 (steps: two tools)

pgAdmin is the standard open-source GUI — browsing databases in a tree view, running queries with results grids, inspecting execution plans visually, and managing roles through dialogs. It's available as a desktop app or hosted as pgAdmin 4 in web mode.

## Segment 4 (code: non-interactive psql)

A large share of real PostgreSQL work happens at the psql command line or in scripts calling psql non-interactively, more so than through a GUI. That's PostgreSQL's Unix-tooling heritage — closer to Oracle's SQL*Plus-first culture than to SSMS-first SQL Server shops.

## Segment 5 (outro)

Getting fluent with psql's meta-commands early pays off through the rest of this section. Next up: the PostgreSQL extensions ecosystem, a genuinely distinctive part of the platform.
