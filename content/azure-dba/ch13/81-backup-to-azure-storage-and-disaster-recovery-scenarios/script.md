# Script — Backup to Azure Storage & Disaster Recovery Scenarios

## Segment 1 (title)

This chapter covered three genuinely different backup mechanisms, not one idea with three names. This lesson's is the third: on-prem or VM-hosted SQL Server, backing up straight to Azure Blob Storage instead of local disk — off-site durability without giving up control of the schedule.

## Segment 2 (code: BACKUP TO URL syntax)

The syntax is almost identical to what you already know — BACKUP DATABASE TO URL instead of TO DISK, after a one-time CREATE CREDENTIAL step so SQL Server can authenticate to the storage account. Every restore-chain rule from earlier in this chapter still applies exactly as-is.

## Segment 3 (code: RPO as a direct consequence of frequency)

Recovery point objective is how much data loss is acceptable if disaster strikes right now, and it's a direct consequence of backup frequency — log backups every 15 minutes means an RPO of up to 15 minutes, nightly-only full backups means up to 24 hours. You don't get to declare an RPO without a schedule that actually supports it.

## Segment 4 (steps: three mechanisms, three DR trade-offs)

On-prem to local disk restores fastest but isn't durable unless you copy it off-site yourself. Azure SQL Database's automatic backups are already geo-durable with an RPO fixed by Microsoft. Backup to URL is the deliberate middle ground — off-site and durable, but the DBA still controls the schedule and the RPO.

## Segment 5 (outro)

Chapter 13 is done. Chapter 14, High Availability and Disaster Recovery — eight lessons, matching the real exam's 20 to 25 percent weight — picks up exactly here, with RPO's counterpart RTO and the architectures that make both numbers small in practice.
