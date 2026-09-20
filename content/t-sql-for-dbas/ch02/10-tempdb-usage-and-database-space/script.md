# Script — TempDB Usage & Database Space

## Segment 1 (title)

Lesson one called running out of tempdb disk the single most common "the server is slow" root cause a DBA chases. This lesson supplies the actual queries.

## Segment 2 (code: tempdb space by category)

Tempdb space breaks into user objects, internal objects like sort and hash spills, and the version store for snapshot isolation. Sys.dm_db_file_space_usage reports current allocation per file, already split by category — and it has to be run against tempdb specifically.

## Segment 3 (code: which session is the culprit)

Sys.dm_db_session_space_usage attributes those tempdb pages to the session that allocated them, which is how you find the actual culprit rather than just the symptom. Join it to dm_exec_sessions for the login and dm_exec_requests for what it's running.

## Segment 4 (code: free space, any database)

That answers what's using tempdb. For the broader question — is any database file about to run out of room — sys.database_files combined with FILEPROPERTY of SpaceUsed gives real used and free megabytes on any database, not just tempdb.

## Segment 5 (outro)

A big version store usually means one long-running transaction under snapshot isolation is holding old row versions open. Next up: Chapter Three begins, inspecting indexes and fragmentation.
