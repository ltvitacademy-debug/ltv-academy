# Deadlock Investigation

A deadlock is what happens when two transactions each hold a lock the other one needs — neither
can proceed, so SQL Server picks one to kill as the "deadlock victim" and lets the other continue.
Unlike ordinary blocking, a deadlock resolves itself in milliseconds. The DBA's job isn't to
break it — it's already broken — but to read the deadlock graph afterward and fix the root cause
so it stops recurring.

## What you'll learn

- Where SQL Server captures deadlock graphs automatically
- How to read the key parts of a deadlock graph
- `DEADLOCK_PRIORITY` and how the victim gets chosen

## The system_health session captures every deadlock

Since SQL Server 2008, the built-in `system_health` Extended Events session captures every
deadlock automatically — no setup required. Query it with `sys.dm_xe_session_targets`:

```sql
SELECT
    xed.value('@timestamp', 'datetime2') AS creation_time,
    xed.query('.') AS deadlock_graph
FROM (
    SELECT CAST(target_data AS XML) AS TargetData
    FROM sys.dm_xe_session_targets st
    JOIN sys.dm_xe_sessions s ON s.address = st.event_session_address
    WHERE s.name = 'system_health' AND st.target_name = 'ring_buffer'
) AS Data
CROSS APPLY TargetData.nodes('RingBufferTarget/event[@name="xml_deadlock_report"]')
    AS XEventData(xed);
```

This returns the raw XML deadlock graph for every deadlock still in the ring buffer (it's a
fixed-size buffer, so old ones eventually roll off). SSMS can render this XML visually — save
the `deadlock_graph` value to a `.xdl` file and open it to get a graphical process/resource
diagram instead of reading raw XML.

## Reading the graph

A deadlock graph has two main sections:

- **`process-list`**: one `<process>` node per session involved, showing what each one was
  executing, what resource it was waiting on, and its `isolationlevel`. The process marked
  as the victim carries a `victimProcessId` attribute at the top of the graph.
- **`resource-list`**: the actual locks in conflict — which process owns which resource, and
  which process is waiting for it. This is where you see the circular wait: Process A owns a
  lock Process B wants, while Process B owns a lock Process A wants.

The practical fix almost always comes down to the same handful of causes: two transactions
accessing tables in a different order, a missing index forcing a larger scan (and more locks)
than the query needed, or a transaction held open longer than necessary.

## DEADLOCK_PRIORITY

When SQL Server has to pick a victim, it defaults to killing whichever transaction is
cheapest to roll back. You can override that:

```sql
SET DEADLOCK_PRIORITY LOW;
-- or NORMAL, HIGH, or a specific number from -10 to 10
```

A session with a lower priority is more likely to be chosen as the victim. This is useful
when one side of a recurring deadlock is a low-value background job — set its priority low so
the more important transaction always wins and the batch job absorbs the retry instead.

## Key terms

| Term | Meaning |
|---|---|
| Deadlock | A circular lock wait between two or more transactions, resolved automatically by SQL Server killing one |
| Deadlock victim | The transaction SQL Server chooses to roll back to break the deadlock |
| `system_health` | A built-in Extended Events session that captures deadlock graphs automatically |
| `DEADLOCK_PRIORITY` | A session-level setting influencing which transaction gets picked as the victim |

## Check yourself

Why doesn't a DBA need to set up any monitoring in advance to investigate a deadlock that
happened last night?
