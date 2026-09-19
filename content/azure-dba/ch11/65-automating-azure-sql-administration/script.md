# Script — Automating Azure SQL Administration

## Segment 1 (title)

Everything from Chapters 9 and 10 works fine by hand — for one database. Index maintenance, integrity checks, backup verification. The problem is what happens once you're responsible for ten databases, or fifty. The same task, done by hand fifty times a week, is where DBAs lose evenings — and where things quietly stop getting checked at all.

## Segment 2 (steps: the manual ceiling)

Three tasks hit that ceiling first: rebuilding fragmented indexes on a schedule across every database, running DBCC CHECKDB often enough that corruption is caught in days instead of during a restore, and confirming a backup isn't just complete but actually restorable. None of these need a person watching a clock — they need something that runs on a schedule and only speaks up when something's wrong.

## Segment 3 (steps: the arc of this chapter)

This chapter is a different, wider toolbox than SQL Server Agent alone. Azure CLI and PowerShell for the commands you'll actually reach for, ARM templates and Bicep for infrastructure as reviewable code, Elastic Jobs as the scheduler built for Azure SQL Database specifically, and finally tying automation into a deployment pipeline with real alerting.

## Segment 4 (outro)

Five lessons, one theme: what you used to do by hand, on a schedule, against every database that needs it. Next up: Azure CLI and PowerShell — the commands a DBA actually reaches for.
