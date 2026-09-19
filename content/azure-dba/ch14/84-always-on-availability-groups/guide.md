# Lesson 84 — Always On Availability Groups

**Chapter 14 · High Availability & Disaster Recovery · Lesson 84 of 95**

## What you'll learn

- What an Availability Group actually is: a group of databases that fail over together
- The real difference between synchronous and asynchronous replicas
- The genuine trade-off each mode makes, and why there's no free option
- The T-SQL that creates an AG and forces a manual failover

## A group of databases, failing over as one unit

An Always On Availability Group (AG) is exactly what the name says: a
named group of user databases that fail over **together**, as a single
unit, to a secondary replica. This is a real, on-prem/VM-hosted SQL Server
HA mechanism (also usable on Azure SQL Managed Instance) — not something
Azure SQL Database itself uses, since that PaaS tier has its own built-in
HA already (Lesson 82).

Each replica in the group holds a full copy of every database in that AG.
One replica is the **primary** — it accepts reads and writes. The others
are **secondaries** — they receive changes from the primary continuously
and can optionally serve read-only queries (offloading reporting load off
the primary).

## Synchronous vs. asynchronous: the real trade-off

Every secondary replica in an AG runs in one of two modes, and this is the
single most important decision an AG design makes:

| Mode | How it works | Trade-off |
|---|---|---|
| Synchronous commit | The primary waits for the secondary to confirm it received and hardened the transaction *before* telling the client the transaction committed | Zero data loss on failover — but adds latency to every write, since the primary waits on the network round-trip |
| Asynchronous commit | The primary commits and tells the client immediately, without waiting for the secondary to confirm | No latency penalty on writes — but some committed transactions can be lost if the primary fails before the secondary catches up |

There is no mode that gives you both zero data loss and zero latency
penalty — that's a physical trade-off, not a configuration bug. Synchronous
commit is what makes **automatic failover** possible (the secondary is
guaranteed current, so failing over loses nothing), which is why
synchronous replicas are typically kept close together, often in the same
region, to keep that latency penalty small. Asynchronous commit is what
you use for a replica far enough away that the network round-trip would
otherwise make every write unacceptably slow — which is exactly the
profile of a DR-oriented replica in a different region.

## Creating an Availability Group

```sql
-- Enable the Always On feature (per SQL Server instance, requires a restart)
-- via SQL Server Configuration Manager, then create the AG in T-SQL:

CREATE AVAILABILITY GROUP [SalesAG]
  WITH (AUTOMATED_BACKUP_PREFERENCE = SECONDARY)
  FOR DATABASE [SalesDB]
  REPLICA ON
    'SQLNODE1' WITH (
      ENDPOINT_URL = 'TCP://sqlnode1.contoso.com:5022',
      AVAILABILITY_MODE = SYNCHRONOUS_COMMIT,
      FAILOVER_MODE = AUTOMATIC),
    'SQLNODE2' WITH (
      ENDPOINT_URL = 'TCP://sqlnode2.contoso.com:5022',
      AVAILABILITY_MODE = SYNCHRONOUS_COMMIT,
      FAILOVER_MODE = AUTOMATIC),
    'SQLNODE3-DR' WITH (
      ENDPOINT_URL = 'TCP://sqlnode3dr.contoso.com:5022',
      AVAILABILITY_MODE = ASYNCHRONOUS_COMMIT,
      FAILOVER_MODE = MANUAL);
```

Two nodes synchronous with automatic failover for local HA, one
asynchronous node in a different region with manual failover for DR — a
single AG doing both jobs at once, each replica configured for the role it
actually plays.

## Forcing a manual failover

```sql
-- Run FROM the target secondary you want to promote to primary:
ALTER AVAILABILITY GROUP [SalesAG] FAILOVER;

-- Forced failover (only for an ASYNCHRONOUS replica, and only when the
-- primary is truly unreachable — this can lose data, since it skips
-- the normal commit confirmation):
ALTER AVAILABILITY GROUP [SalesAG] FORCE_FAILOVER_ALLOW_DATA_LOSS;
```

`FAILOVER` (without the `FORCE`) only works cleanly against a synchronous
replica, precisely because synchronous commit already guarantees no data
loss. The forced, data-loss-allowed version exists specifically for the
disaster case where a synchronous partner can't be reached at all.

## Key terms

| Term | Meaning |
|---|---|
| Availability Group (AG) | A named group of databases that fail over together to a secondary replica |
| Primary replica | The replica currently accepting reads and writes |
| Secondary replica | A replica receiving changes from the primary; may serve read-only queries |
| Synchronous commit | Primary waits for secondary confirmation before committing — zero data loss, added latency |
| Asynchronous commit | Primary commits immediately without waiting — no latency penalty, possible data loss |

## Check yourself

You're ready for Lesson 85 when you can explain, without looking: what
does an AG actually fail over as a unit, why does synchronous commit add
latency while asynchronous commit doesn't, and why is `FAILOVER` without
`FORCE_FAILOVER_ALLOW_DATA_LOSS` only safe against a synchronous replica?
