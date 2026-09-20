# Script — The Database Engine

## Segment 1 (title)

This course is general, on-prem-flavored SQL Server administration — installation, configuration, architecture, security, maintenance, before Azure enters the picture at all.

## Segment 2 (code: SQL Server isn't one program)

SQL Server is really a family of cooperating services. The Database Engine — sqlservr.exe — is the core one, storing data, executing T-SQL, and managing transactions. Agent, Browser, and the BI services run alongside it as separate processes.

## Segment 3 (steps: inside the Database Engine)

The Database Engine breaks into two subsystems. The relational engine parses T-SQL and builds execution plans — the query optimizer lives here. The storage engine manages how data actually sits on disk and in memory: pages, the buffer pool, the transaction log.

## Segment 4 (outro)

Every diagnostic instinct this course builds traces back to this split. Next up: storage engine internals — pages, extents, and the buffer pool, in depth.
