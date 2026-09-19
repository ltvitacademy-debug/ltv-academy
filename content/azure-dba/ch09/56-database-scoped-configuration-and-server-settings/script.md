# Script — Database-Scoped Configuration & Server Settings

## Segment 1 (title)

Server-level settings apply uniformly to every database on an instance. Database-scoped configuration overrides specific settings per database instead, so an OLTP database and a reporting database on the same instance don't have to share one setting that fits neither of them.

## Segment 2 (code: MAXDOP and compatibility level)

MAXDOP caps how many cores a single query can use — too high on OLTP and a few expensive queries starve everything else; too low on analytics and big aggregations run single-threaded. Compatibility level controls which optimizer version's behavior a database uses, independent of engine version, letting a legacy database stay pinned while a new one runs current.

## Segment 3 (steps: why this is real on Managed Instance and VMs)

Azure SQL Database is already one database per logical unit, so this is less of a live question there. Managed Instance and SQL Server on an Azure VM explicitly host multiple databases per instance — exactly the scenario database-scoped configuration was built for.

## Segment 4 (outro)

Pinning an older compatibility level buys time during a migration, but it also means missing every optimizer improvement shipped since. Next up: Resource Governor, and stopping one noisy workload from starving everything else.
