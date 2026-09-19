# Lesson 89 — Monitoring, Testing & Troubleshooting HA/DR

**Chapter 14 · High Availability & Disaster Recovery · Lesson 89 of 95**

## What you'll learn

- Why you don't actually have a DR plan until you've tested a real failover
- What to monitor continuously for early signs of replication trouble
- The DMVs that answer "is my AG/geo-replication actually healthy right now"
- How this closes Chapter 14, and what Chapter 15 does with everything since Chapter 1

## A DR plan you haven't tested is a theory, not a plan

Every mechanism in this chapter — AGs, FCIs, geo-replication, failover
groups, log shipping — can be configured correctly and still fail you
during a real disaster, for reasons that only show up when a failover
actually happens: a firewall rule blocking the secondary's port, an
application connection string that was never updated, a runbook step that
assumes access nobody actually has anymore. **You do not know your DR plan
works until you've deliberately triggered a failover and watched it
happen.** This is a discipline, not a one-time setup task — a real testing
cadence (quarterly is common) that treats "prove it still works" as an
ongoing responsibility, the same way Chapter 13 treated restore testing
as separate from just having backups.

## What a real failover test actually checks

A test failover should verify, deliberately, not assume:

1. **The failover itself completes** — the secondary actually becomes
   primary within the expected RTO.
2. **The application reconnects** — through a failover group's listener
   endpoint, or by hand if using plain geo-replication/log shipping —
   and this is exactly where untested plans break: an app with the old
   server name hardcoded somewhere it shouldn't be.
3. **Data loss matches the expected RPO** — not more. If the test reveals
   more data loss than the RPO promised, the replication/backup frequency
   feeding that RPO wasn't actually meeting it.
4. **Failing back is possible** — getting back to the original primary
   afterward is a real, separate operation, and an untested fail-back is
   just as risky as an untested failover.

## Monitoring for trouble before it becomes a disaster

Waiting for a full outage to discover a problem is the failure mode this
section exists to prevent. The signal to watch for, continuously, is
**replication lag and health** — is the secondary actually keeping up, or
quietly falling behind:

```sql
-- Always On AG health and synchronization state
SELECT ags.name AS ag_name, ar.replica_server_name,
       ars.role_desc, ars.synchronization_health_desc,
       ars.connected_state_desc
FROM sys.dm_hadr_availability_replica_states ars
JOIN sys.availability_replicas ar ON ars.replica_id = ar.replica_id
JOIN sys.availability_groups ags ON ar.group_id = ags.group_id;

-- How far behind a secondary database actually is
SELECT database_name, synchronization_state_desc,
       log_send_queue_size, redo_queue_size
FROM sys.dm_hadr_database_replica_states;
```

`synchronization_health_desc` returning anything other than `HEALTHY`, or
a `log_send_queue_size`/`redo_queue_size` that's climbing instead of
staying flat, is the early warning — the kind of signal that, caught in
routine monitoring, gets fixed calmly, instead of discovered during an
actual outage when it's too late to do anything but accept the data loss.

For Azure SQL Database's geo-replication and failover groups, the
equivalent signal is the **replication lag** shown in the Azure Portal on
the failover group's overview, or queried via `sys.dm_geo_replication_link_status`
on the primary — the same principle, Azure-managed infrastructure instead
of a self-managed cluster.

## Chapter 14 is done. Chapter 15 is next.

That closes Chapter 14 — High Availability & Disaster Recovery. Eight
lessons, matching the real DP-300 exam's 20-25% weight for this domain:
the HA/DR distinction, deriving RPO/RTO from business requirements, and
five real mechanisms (Always On AGs, FCIs, geo-replication, failover
groups, log shipping), closing with the discipline of actually testing
and monitoring all of it.

**Chapter 15, Real-World Azure DBA Project, is next** — one continuous
capstone scenario, not a new set of isolated topics. It pulls together
everything since Chapter 1: migrating and securing a real environment,
tuning and automating it, and — closing the loop on this exact chapter —
simulating a real disaster against it.

## Key terms

| Term | Meaning |
|---|---|
| Failover test | A deliberately triggered failover, verified against expected RTO/RPO, not assumed to work |
| Fail-back | Returning to the original primary after a test or real failover — a separate, real operation |
| `sys.dm_hadr_database_replica_states` | DMV showing AG synchronization state and replication queue sizes |
| `sys.dm_geo_replication_link_status` | The equivalent lag/health view for Azure SQL Database geo-replication |

## Check yourself

You're ready for Lesson 90 when you can explain, without looking: what
four things does a real failover test need to verify beyond "did it
fail over," and what DMV column tells you a secondary is falling behind
before an actual outage forces the question?
