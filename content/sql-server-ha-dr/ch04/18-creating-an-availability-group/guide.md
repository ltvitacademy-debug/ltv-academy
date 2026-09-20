# Creating an Availability Group

Lesson 17 covered the architecture. This lesson walks through the real high-level T-SQL flow for
actually creating one — not every prerequisite step (enabling the Always On feature in SQL Server
Configuration Manager, setting up the WSFC, and configuring endpoints happen outside this T-SQL),
but the core sequence of statements that turns a standalone database into an AG-protected one.

## What you'll learn

- The prerequisite steps that happen before any `CREATE AVAILABILITY GROUP` statement
- The real T-SQL for creating the AG, adding a database, and joining a secondary
- Why the order of operations matters

## Before the T-SQL: prerequisites

1. Enable the **Always On Availability Groups** feature on every instance that will host a
   replica, via SQL Server Configuration Manager (this requires a service restart).
2. Ensure every instance is a node in the same WSFC.
3. Create a **database mirroring endpoint** on each instance — AGs reuse the database mirroring
   endpoint infrastructure for replica-to-replica communication, typically on TCP port 5022.
4. Take a full backup of the database (and a log backup, since it must be in FULL recovery) so it
   can be restored on the secondary as a starting point.

## Creating the availability group

On the instance that will start as primary:

```sql
CREATE AVAILABILITY GROUP [AG_Sales]
FOR DATABASE [SalesDB]
REPLICA ON
  'SQLNODE1' WITH (
    ENDPOINT_URL = 'TCP://sqlnode1.corp.local:5022',
    AVAILABILITY_MODE = SYNCHRONOUS_COMMIT,
    FAILOVER_MODE = AUTOMATIC
  ),
  'SQLNODE2' WITH (
    ENDPOINT_URL = 'TCP://sqlnode2.corp.local:5022',
    AVAILABILITY_MODE = SYNCHRONOUS_COMMIT,
    FAILOVER_MODE = AUTOMATIC
  );
```

`FOR DATABASE` lists the database(s) being protected (Enterprise Edition allows multiple; Basic AG
allows exactly one). Each `REPLICA ON` clause describes one participating instance, its endpoint
URL, and its availability/failover mode — settings covered in depth in Lessons 19 and 21.

## Joining the secondary and restoring the database

On the secondary instance, the AG metadata must be joined, and the database itself restored from
the primary's backups with `NORECOVERY` so it stays in a state ready to receive log records:

```sql
-- On the secondary instance:
ALTER AVAILABILITY GROUP [AG_Sales] JOIN;

RESTORE DATABASE [SalesDB]
FROM DISK = 'F:\Backups\SalesDB_Full.bak'
WITH NORECOVERY;

RESTORE LOG [SalesDB]
FROM DISK = 'F:\Backups\SalesDB_Log.trn'
WITH NORECOVERY;

ALTER DATABASE [SalesDB] SET HADR AVAILABILITY GROUP = [AG_Sales];
```

Modern SQL Server versions also support **automatic seeding**
(`SEEDING_MODE = AUTOMATIC` on the replica definition), which has SQL Server stream the initial
data over the network instead of requiring a manual backup/restore — convenient for smaller
databases, though a manual restore is often still preferred for very large ones to avoid tying up
network bandwidth for hours.

## Why the order matters

The AG must exist and know about a replica before that replica can join it — `CREATE AVAILABILITY
GROUP` on the primary happens first. The database must be restored with `NORECOVERY` so SQL Server
can still apply incoming log records to it; a database that's already been recovered (brought
online normally) cannot be joined to an AG until it's put back into a restoring state.

## Key terms

| Term | Meaning |
|---|---|
| Database mirroring endpoint | The TCP endpoint (commonly port 5022) AG replicas use to communicate |
| `NORECOVERY` | Restore option that leaves a database in a restoring state, required before joining it to an AG |
| Automatic seeding | AG feature that streams initial data over the network instead of a manual backup/restore |

## Check yourself

A DBA restores a database normally (bringing it fully online) before attempting to join it to an
Availability Group. What step needs to be redone, and with what option, before the join will
succeed?
