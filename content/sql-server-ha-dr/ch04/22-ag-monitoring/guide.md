# AG Monitoring

Configuring an AG correctly once isn't the job — knowing, on any given day, whether it's actually
healthy is. This lesson covers the real dynamic management views (DMVs) and the built-in SSMS
dashboard used to monitor Availability Group health, replication state, and synchronization lag.

## What you'll learn

- The two core DMVs for AG health: replica-level and database-level
- What synchronization state and health state actually report
- How the SSMS Always On dashboard presents this same information visually

## `sys.dm_hadr_availability_replica_states`

This DMV reports, per replica, its **role** (`PRIMARY` or `SECONDARY`), its **operational state**,
and its **connected state** to the rest of the AG. Key columns:

- `role_desc` — `PRIMARY` or `SECONDARY`
- `connected_state_desc` — whether the replica is currently connected to the AG
- `synchronization_health_desc` — `HEALTHY`, `PARTIALLY_HEALTHY`, or `NOT_HEALTHY` at the replica
  level, aggregating the databases underneath it

```sql
SELECT replica_server_name, role_desc, connected_state_desc, synchronization_health_desc
FROM sys.dm_hadr_availability_replica_states ars
JOIN sys.availability_replicas ar ON ars.replica_id = ar.replica_id;
```

## `sys.dm_hadr_database_replica_states`

This is the more granular, per-database DMV — since an AG can hold multiple databases (Enterprise
Edition), and any one of them could individually fall behind or lose sync even if the replica
overall looks connected. Key columns:

- `synchronization_state_desc` — `SYNCHRONIZED`, `SYNCHRONIZING`, `NOT SYNCHRONIZING`, or
  `REVERTING`, reported per database, per replica
- `log_send_queue_size` and `redo_queue_size` — how much log data is waiting to be sent, or waiting
  to be replayed on the secondary, in KB — the real lag indicators
- `last_hardened_time` — when the secondary last confirmed durably logging a record from the
  primary

```sql
SELECT d.name AS database_name, drs.synchronization_state_desc,
       drs.log_send_queue_size, drs.redo_queue_size, drs.last_hardened_time
FROM sys.dm_hadr_database_replica_states drs
JOIN sys.databases d ON drs.database_id = d.database_id;
```

A growing `redo_queue_size` over time on a secondary that should be keeping up is the earliest
sign of a secondary falling behind — this DMV is the first place to look when someone reports an
AG "seems slow" or "seems out of sync."

## The SSMS Always On dashboard

SQL Server Management Studio provides a visual **Always On Dashboard** (right-click the
Availability Group node → **Show Dashboard**) that presents the same underlying DMV data as a
color-coded grid: replica roles, synchronization health (green/yellow/red), failover readiness,
and estimated data loss for asynchronous replicas. It's the fastest way to eyeball overall AG
health without writing a query, though the DMVs are what to actually script into alerting, since
the dashboard is a manual, look-at-it-yourself tool.

## Key terms

| Term | Meaning |
|---|---|
| `sys.dm_hadr_availability_replica_states` | DMV reporting replica-level role, connection, and sync health |
| `sys.dm_hadr_database_replica_states` | DMV reporting per-database sync state and lag (log send/redo queue) on each replica |
| `redo_queue_size` | KB of log data received but not yet replayed on a secondary — a key lag indicator |

## Check yourself

A secondary replica shows `connected_state_desc = CONNECTED` at the replica level, but one
specific database on it shows `synchronization_state_desc = NOT SYNCHRONIZING`. Which DMV surfaced
that database-specific detail, and why wouldn't checking only the replica-level DMV have caught
it?
