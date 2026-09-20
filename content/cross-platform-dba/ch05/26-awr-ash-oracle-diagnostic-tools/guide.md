# AWR, ASH & Oracle Diagnostic Tools

Oracle Performance Tuning Methodology already introduced AWR and ADDM in passing. This
lesson goes deeper on the two repositories that make Oracle's whole DB-Time-based
methodology possible: the **Automatic Workload Repository (AWR)** for history, and
**Active Session History (ASH)** for a fine-grained, near-real-time view. Neither one is a
relabeled Query Store — they're a genuinely different model, built around a different unit
of measurement, with a licensing detail that matters.

## AWR: a snapshot-based history of the whole instance

AWR automatically takes a **snapshot** of instance performance data — wait event
statistics, SQL execution stats, time model data, system and session metrics — on a
schedule, by default every 60 minutes, storing it in the `SYSAUX` tablespace with a default
retention of 8 days. Unlike SQL Server's Query Store, which tracks per-query plans and
runtime stats specifically, AWR captures a much broader system-wide picture: everything the
time model tracks, not just query-level detail. You generate a readable report comparing two
snapshots with `@?/rdbms/admin/awrrpt.sql`, or query the underlying `DBA_HIST_*` views
(`DBA_HIST_SNAPSHOT`, `DBA_HIST_SQLSTAT`, `DBA_HIST_ACTIVE_SESS_HISTORY`) directly for
scripted analysis. AWR is the foundation ADDM analyzes automatically after every snapshot,
and it's also what you'd pull up to answer "was the database actually slower at 2 AM last
Tuesday, and why."

## ASH: what's happening right now, sampled every second

**Active Session History (ASH)** samples the state of every *active* session (one that's
either on CPU or waiting for a non-idle event) once per second, capturing the SQL being
run, the wait event, the session, and the module/action. That data lives first in a
circular buffer in the SGA, queryable live through `V$ACTIVE_SESSION_HISTORY`, and a subset
of each snapshot's worth of ASH data gets flushed into AWR as `DBA_HIST_ACTIVE_SESS_HISTORY`
for longer retention. Because ASH samples every second rather than aggregating, it's what
you reach for to diagnose a short-lived spike — a two-minute lock storm that would get
smoothed away in an hourly AWR summary shows up clearly session-by-session in ASH. An ASH
report (`@?/rdbms/admin/ashrpt.sql`) summarizes a time window of this raw session data into
top wait events, top SQL, and top sessions, similar in spirit to an AWR report but focused
on a narrow window at much finer granularity.

## Why this isn't just "Oracle's Query Store"

SQL Server's Query Store tracks per-query execution plans and runtime statistics over time,
built into every edition since SQL Server 2016, no separate license required. AWR and ASH
cover more ground — the entire time model, wait events, system metrics, not just query
plans — but that breadth comes at a cost: both are part of the **Diagnostics Pack**, a
licensed option for Oracle Database Enterprise Edition. A DBA moving from SQL Server needs
to know AWR/ASH aren't automatically available the way Query Store is; if the Diagnostics
Pack isn't licensed, querying `DBA_HIST_*` views or running `awrrpt.sql` is a licensing
violation, not just a technical option — a genuinely important fact to confirm before you
touch these tools in a real environment.

## Key terms

| Term | Meaning |
|---|---|
| AWR | Automatic Workload Repository — scheduled snapshots of instance-wide performance data |
| ASH | Active Session History — per-second sampling of every active session's state |
| Snapshot | An AWR data capture point, by default taken hourly and retained 8 days |
| V$ACTIVE_SESSION_HISTORY | In-memory (SGA) view of current ASH samples |
| DBA_HIST_ACTIVE_SESS_HISTORY | Historical ASH data persisted into AWR |
| Diagnostics Pack | Licensed Oracle Enterprise Edition option required to use AWR and ASH |

## Check yourself

A user reports the application "felt slow for about ninety seconds" around 10:14 AM, but
the hourly AWR snapshot for that window looks unremarkable on average. Which tool would you
reach for instead, and why would it catch what the AWR summary missed?
