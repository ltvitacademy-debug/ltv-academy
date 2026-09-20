# Isolation Levels in Practice

Isolation level controls how much a transaction is allowed to see of other transactions'
uncommitted or concurrent changes — and how many locks it takes to enforce that. Changing it
is one of the highest-leverage things a DBA can do to reduce blocking, but it trades away
consistency guarantees if used carelessly. This lesson covers the isolation levels you'll
actually encounter and what each one really does.

## What you'll learn

- The five ANSI isolation levels SQL Server implements, plus its two row-versioning modes
- The anomalies each level does and doesn't prevent
- How to set and check the isolation level a session is using

## The levels

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;   -- default
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
SET TRANSACTION ISOLATION LEVEL SNAPSHOT;
```

| Level | Dirty read | Non-repeatable read | Phantom read | Locking |
|---|---|---|---|---|
| `READ UNCOMMITTED` | Possible | Possible | Possible | Minimal — ignores locks held by others |
| `READ COMMITTED` (default) | Prevented | Possible | Possible | Shared locks released as soon as the read completes |
| `REPEATABLE READ` | Prevented | Prevented | Possible | Shared locks held until the transaction ends |
| `SERIALIZABLE` | Prevented | Prevented | Prevented | Range locks held until the transaction ends |
| `SNAPSHOT` | Prevented | Prevented | Prevented | No locking — reads see a versioned snapshot instead |

`READ UNCOMMITTED` is what `WITH (NOLOCK)` table hints simulate at the statement level — it
reads whatever is on the page right now, committed or not, which is why it's called a dirty
read. `SERIALIZABLE` is the strictest: it locks the *range* a query touched, not just the rows
that existed, so a second transaction can't insert a new row into that range either.

## Row versioning: SNAPSHOT and RCSI

`SNAPSHOT` isolation and `READ_COMMITTED_SNAPSHOT` (RCSI) both use tempdb's version store
instead of locks — readers never block writers and writers never block readers. They're
database-level settings that must be turned on before use:

```sql
ALTER DATABASE AdventureWorks2012 SET ALLOW_SNAPSHOT_ISOLATION ON;
ALTER DATABASE AdventureWorks2012 SET READ_COMMITTED_SNAPSHOT ON;
```

RCSI changes the *default* behavior of `READ COMMITTED` itself — no application code changes
needed, no `SET` statement required. Full `SNAPSHOT` isolation is opt-in per transaction via
`SET TRANSACTION ISOLATION LEVEL SNAPSHOT` and guarantees the entire transaction sees a
single consistent point-in-time view, not just each individual statement.

## Checking what a session is actually using

```sql
DBCC USEROPTIONS;

SELECT session_id, transaction_isolation_level
FROM sys.dm_exec_sessions
WHERE session_id = @@SPID;
```

`transaction_isolation_level` in `sys.dm_exec_sessions` returns a number: 1 = READ
UNCOMMITTED, 2 = READ COMMITTED, 3 = REPEATABLE READ, 4 = SERIALIZABLE, 5 = SNAPSHOT.

## Key terms

| Term | Meaning |
|---|---|
| Dirty read | Reading a value another transaction hasn't committed yet, which might roll back |
| Phantom read | A row appearing or disappearing between two reads in the same transaction because another transaction inserted or deleted it |
| RCSI | READ_COMMITTED_SNAPSHOT — a database setting that makes the default READ COMMITTED level use row versioning instead of locks |
| Version store | The tempdb area holding old row versions for snapshot-based isolation |

## Check yourself

Why does turning on RCSI eliminate reader/writer blocking without requiring any application
code changes?
