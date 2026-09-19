# Lesson 88 — Log Shipping & Hybrid HA/DR

**Chapter 14 · High Availability & Disaster Recovery · Lesson 88 of 95**

## What you'll learn

- What log shipping actually is, and how it differs from an AG or geo-replication
- Why it's higher latency and higher data-loss than the mechanisms already covered
- Why it's still real and still used, especially in hybrid on-prem-to-Azure scenarios
- The three SQL Server Agent jobs that make log shipping run

## The oldest mechanism in this chapter, still doing real work

Log shipping predates Availability Groups. It's simple, and that
simplicity is exactly why it's still in production today, especially in
**hybrid** scenarios — an on-prem primary shipping to a secondary hosted
on an Azure VM, or vice versa — where the more modern mechanisms either
don't apply (AGs need Enterprise Edition or specific setups; geo-
replication is Azure SQL Database-only) or are simply more than the
situation calls for.

Log shipping does exactly what the name says: it periodically **backs up
the transaction log on the primary, copies that backup file to the
secondary, and restores it there** — over and over, on a schedule. There's
no continuous streaming of transactions like an AG's replication. It's
backup-copy-restore, repeated.

## Why it's higher latency and higher data-loss than everything else in this chapter

| | AG (async) / geo-replication | Log shipping |
|---|---|---|
| Mechanism | Continuous transaction streaming | Periodic backup, copy, restore |
| Typical lag | Seconds | Minutes to tens of minutes (whatever the job schedule is) |
| RPO | Seconds to low minutes | Bounded by the log-backup interval — commonly 15 minutes or more |
| Failover | A replica can be promoted quickly | A manual, multi-step recovery process |
| SQL Server edition required | Enterprise (for full AGs) | Works on Standard Edition too |
| Works across versions | Same/adjacent versions typically | Works across a wider range of SQL Server versions |

Log shipping's RPO is directly set by how often the log-backup job runs —
this is the same restore-chain logic from Chapter 13's backup fundamentals,
just automated and continuously pointed at a warm secondary instead of
cold storage. Run the log backup job every 15 minutes, and 15 minutes is
your best-case RPO with log shipping, full stop.

## When a DBA actually reaches for log shipping

- **Hybrid topologies** — an on-prem SQL Server shipping logs to a
  secondary on an Azure VM (or the reverse), where log shipping doesn't
  care that the primary and secondary are in fundamentally different
  environments, only that both can run SQL Server Agent and reach a
  shared file location.
- **Older SQL Server versions or Standard Edition**, where full
  Availability Groups aren't available.
- **A secondary that just needs to exist as a warm standby or for
  reporting**, without the operational complexity of a cluster.
- **Sending a copy of the data somewhere for compliance/read access**,
  where sub-minute RPO isn't actually a requirement.

## The three jobs underneath log shipping

Log shipping is implemented as three SQL Server Agent jobs (Chapter 10),
each on a schedule:

```
Primary server:      Backup job   -> backs up the transaction log,
                                      writes it to a shared network folder

Secondary server:    Copy job     -> copies the backup file from that
                                      shared folder to a local folder

Secondary server:    Restore job  -> restores the copied log backup onto
                                      the secondary database
                                      (secondary stays in STANDBY or
                                       NORECOVERY mode until needed)
```

Because it's just backup-copy-restore, log shipping's failover is a
deliberate, manual recovery operation — bring the secondary out of
standby/norecovery mode and point applications at it — not an automatic
promotion.

## Key terms

| Term | Meaning |
|---|---|
| Log shipping | Periodically backing up, copying, and restoring transaction log backups to a secondary |
| Hybrid HA/DR | A topology spanning on-prem SQL Server and Azure (VM or Managed Instance) |
| Backup/Copy/Restore jobs | The three SQL Server Agent jobs that implement log shipping |
| STANDBY / NORECOVERY | The modes a log-shipped secondary database sits in until it's brought online |

## Check yourself

You're ready for Lesson 89 when you can explain, without looking: why is
log shipping's RPO directly tied to the log-backup job's schedule, and why
does a hybrid on-prem-to-Azure topology often reach for log shipping over
an Availability Group?
