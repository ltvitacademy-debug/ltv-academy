# TempDB Usage & Database Space

Lesson 1 called running out of tempdb disk the single most common "the server is slow"
root cause a DBA chases. This lesson supplies the actual queries: which sessions are
consuming tempdb space right now, and how much room every database file — tempdb
included — actually has left.

## What you'll learn

- `sys.dm_db_file_space_usage` — tempdb space usage by file
- `sys.dm_db_session_space_usage` — which session is consuming tempdb space
- `sys.database_files` and `FILEPROPERTY()` for real used/free space on any database
- Why tempdb's three workloads (user objects, internal objects, version store) fill it for different reasons

## Tempdb space usage by file

Tempdb space breaks down into user objects (real temp tables and table variables you
created), internal objects (sort/hash spills, worktables the optimizer builds behind
the scenes), and the version store (row versions kept for snapshot or read-committed
snapshot isolation). `sys.dm_db_file_space_usage` reports current allocation per file,
already split by category:

```sql
SELECT file_id,
       user_object_reserved_page_count      * 8 / 1024 AS user_objects_mb,
       internal_object_reserved_page_count  * 8 / 1024 AS internal_objects_mb,
       version_store_reserved_page_count    * 8 / 1024 AS version_store_mb,
       unallocated_extent_page_count        * 8 / 1024 AS free_mb
FROM tempdb.sys.dm_db_file_space_usage;
```

This has to be run against `tempdb` specifically — it's a tempdb-only DMV. A large
`version_store_mb` almost always traces back to one long-running transaction under
snapshot isolation that's preventing old row versions from being cleaned up.

## Which session is using all the tempdb space

`sys.dm_db_session_space_usage` attributes tempdb page allocations to the session that
made them, which is how you find the actual culprit rather than just the symptom:

```sql
SELECT session_id,
       user_objects_alloc_page_count -
         user_objects_dealloc_page_count  AS user_pages_net,
       internal_objects_alloc_page_count -
         internal_objects_dealloc_page_count AS internal_pages_net
FROM tempdb.sys.dm_db_session_space_usage
ORDER BY user_pages_net + internal_pages_net DESC;
```

Join this to `sys.dm_exec_sessions` on `session_id` to get the login name, and to
`sys.dm_exec_requests` to see what that session is currently running.

## Real free space on any database file

Tempdb space usage answers "what's using the space," but the underlying question is
often simpler: is this database (or the drive it lives on) about to run out of room?
`sys.database_files` combined with `FILEPROPERTY()` answers that per file, in the
current database context:

```sql
SELECT name AS logical_name,
       size / 128.0                                        AS size_mb,
       FILEPROPERTY(name, 'SpaceUsed') / 128.0              AS used_mb,
       size / 128.0 - FILEPROPERTY(name, 'SpaceUsed') / 128.0 AS free_mb,
       CASE WHEN max_size = -1 THEN 'Unlimited'
            ELSE CAST(max_size / 128.0 AS varchar(20)) END AS max_size_mb
FROM sys.database_files;
```

`size` and `FILEPROPERTY(..., 'SpaceUsed')` are both stored in 8 KB pages, so dividing
by 128 converts pages to megabytes. `max_size = -1` means the file is set to grow
without a cap — worth knowing before the drive itself runs out.

## Key terms

| Term | Meaning |
|---|---|
| Version store | Space in tempdb holding old row versions for snapshot / read-committed snapshot isolation |
| Internal objects | Tempdb space used by SQL Server itself for sort spills, hash spills, and worktables — not created explicitly by the user |
| `FILEPROPERTY()` | Built-in function returning file-level metadata, including `SpaceUsed`, for a named database file |

## Check yourself

A tempdb space report shows `version_store_mb` far larger than `user_objects_mb` or
`internal_objects_mb`. What kind of problem does that usually point to?
