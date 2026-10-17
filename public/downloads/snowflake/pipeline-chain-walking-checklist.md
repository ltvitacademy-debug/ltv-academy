# Pipeline Chain-Walking Diagnostic Checklist

From Lesson 56. For "the daily load didn't run" — walk in order,
don't guess which link broke.

## 1. Pipe — did the file even load?

```sql
SELECT SYSTEM$PIPE_STATUS('<pipe_name>');
-- Check: pendingFileCount should be 0, lastIngestedTimestamp recent

SELECT file_name, status, first_error_message
FROM TABLE(INFORMATION_SCHEMA.COPY_HISTORY(
  table_name => '<schema>.<table>',
  start_time => DATEADD(hours, -24, CURRENT_TIMESTAMP())
));
```

**If this is broken:** stuck `pendingFileCount`, or `COPY_HISTORY`
shows an error status — fix ingestion before looking downstream.

## 2. Stream — did it capture the change?

```sql
SELECT SYSTEM$STREAM_HAS_DATA('<stream_name>');
SELECT COUNT(*) FROM <stream_name>;
```

**If this is `FALSE`/empty, with data clearly loaded in Step 1:**
the Stream was consumed by an earlier run (Streams reset once read
in a committed transaction), or was recreated and lost its offset.

## 3. Task — did it run, and did it succeed?

```sql
SELECT name, state, scheduled_time, completed_time, error_message
FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(
  task_name => '<task_name>',
  scheduled_time_range_start => DATEADD(hours, -24, CURRENT_TIMESTAMP())
))
ORDER BY scheduled_time DESC;
```

**Three states to distinguish:**
- `SUCCEEDED` — this link is fine, move to Step 4.
- `SKIPPED` — the Task's `WHEN` condition evaluated false (often tied
  to `SYSTEM$STREAM_HAS_DATA`) — consistent with an empty Stream at
  Step 2.
- `FAILED` — read `error_message`. An access-control error means
  check `SHOW GRANTS TO ROLE <role>`, not the query logic. A SQL
  error means the query itself needs fixing.

## 4. Table — did the result actually land?

```sql
SELECT MAX(loaded_at) AS last_refresh, COUNT(*) AS row_count
FROM <reporting_table>;
```

Confirms the fix landed, not just that the Task ran.

## Related: permissions-specific check

If Step 3 shows an access-control error:

```sql
SHOW GRANTS TO ROLE <role_name>;
```

Compare against what the Task's query actually needs (read access on
its source Stream/table, write access on its target).

## After the fix

If a run was missed (not just delayed), manually trigger it rather
than waiting for the next schedule:

```sql
EXECUTE TASK <task_name>;
```
