# Change Tracking

The last two lessons covered tracking *schema* changes. This lesson is about tracking *data*
changes — knowing which rows in a table were inserted, updated, or deleted since the last time
something checked, which matters for incremental ETL, syncing data to another system, or
auditing. SQL Server actually ships two distinct features for this, and picking the wrong one
is a common, avoidable mistake.

## What you'll learn

- What SQL Server's Change Tracking feature does and how lightweight it is
- What Change Data Capture (CDC) does differently, and why it's heavier
- How to choose between them based on what a consumer actually needs

## Change Tracking: lightweight and synchronous

**Change Tracking** answers a narrow question well: "which rows changed?" It's enabled at the
database level (`ALTER DATABASE ... SET CHANGE_TRACKING = ON`) and then per table
(`ALTER TABLE ... ENABLE CHANGE_TRACKING`). Once on, SQL Server maintains internal tracking
tables recording the primary key of every row that was inserted, updated, or deleted, tagged
with a monotonically increasing version number. A consumer calls `CHANGETABLE(CHANGES ...)`
with the version number it last saw, and gets back exactly the rows that changed since then —
which it then has to re-query from the base table itself to get current values.

Change Tracking does not store the actual old and new values — only *that* a row changed, by
key. That's what makes it lightweight: overhead is small, and `sys.change_tracking_tables`
shows you which tables have it enabled and their current retention. It's a good fit for
"give me the rows I need to re-sync," like an app cache or search index that just needs to
know what to refresh.

## Change Data Capture: heavier, and it captures the actual values

**Change Data Capture (CDC)** answers a broader question: "what exactly changed, and to what
values?" It works by reading the transaction log via a SQL Server Agent job and writing full
before/after row images into dedicated change tables — so a consumer can see not just that a
row changed, but the actual old and new column values, and the type of operation (insert,
update, delete). This makes CDC the right fit for auditing, compliance, or feeding a data
warehouse's incremental load, where the actual values genuinely matter, not just "something
changed."

The cost is real: CDC requires SQL Server Agent to be running (the capture job depends on it),
adds meaningfully more storage and I/O than Change Tracking, and — notably — was Enterprise
Edition-only in older versions, though it's been available more broadly since SQL Server 2016
SP1. It's a heavier feature for a heavier job.

## Choosing between them

The honest decision comes down to what the consumer needs. If a downstream process only needs
to know *which rows* to go re-fetch, Change Tracking is simpler, cheaper, and enough. If a
downstream process needs the actual historical values — what a column *was* before an update,
for an audit trail or a warehouse load — Change Tracking can't provide that, and CDC is the
right tool despite its extra overhead. Reaching for CDC when Change Tracking would have done
the job is a common, avoidable source of unnecessary log and storage pressure.

## Key terms

| Term | Meaning |
|---|---|
| Change Tracking | Lightweight feature recording which rows (by key) changed, without storing old/new values |
| Change Data Capture (CDC) | Heavier feature reading the transaction log to capture full before/after row values |
| `CHANGETABLE` | Function used to query Change Tracking data for rows changed since a given version |
| Capture job | The SQL Server Agent job CDC depends on to read the log and populate change tables |

## Check yourself

A nightly job needs to know exactly what a customer's address column changed *from* and *to*,
for an audit log. Would Change Tracking satisfy that requirement? Why or why not?
