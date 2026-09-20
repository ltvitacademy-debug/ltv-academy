# Script — System Databases

## Segment 1 (title)

This course assumes you already know how to write T-SQL. It asks a different question: not how do you write SQL to work with data, but how do you use T-SQL to figure out what's wrong with SQL Server and fix it.

## Segment 2 (code: the four system databases)

Every SQL Server instance ships with four system databases. Master holds instance-level metadata — logins, linked servers, where every other database's files live. Msdb holds Agent jobs and backup history. Model is the template new databases are created from. And tempdb is scratch space for everything temporary.

## Segment 3 (steps: why a DBA queries these directly)

A developer rarely touches these. A DBA lives in them: master to check what logins exist, msdb to confirm last night's backup actually succeeded, and tempdb to chase down the single most common "the server is slow" root cause — running out of tempdb disk.

## Segment 4 (outro)

Master, msdb, and model get backed up. Tempdb never does — it's rebuilt from scratch on every restart. Next up: querying the sys catalog views that expose all of this metadata directly.
