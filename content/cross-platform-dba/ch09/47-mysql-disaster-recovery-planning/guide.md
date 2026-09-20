# MySQL Disaster Recovery Planning

DR planning discipline doesn't change platform to platform: define RPO and RTO, build a
backup strategy that actually meets them, test the restore, and document the runbook so
someone other than you can execute it at 3 AM. What changes on MySQL is which real tools
you're assembling into that plan. This lesson closes out the chapter by applying that
discipline specifically to `mysqldump`, XtraBackup, and binary logs.

## What you'll learn

- How to translate RPO/RTO targets into a concrete MySQL backup strategy
- How `mysqldump`, XtraBackup, and binlogs combine into one coherent DR plan
- Why testing the restore path is non-negotiable, same as everywhere else in this path

## Start from RPO and RTO, not from tools

Recovery Point Objective (how much data loss is acceptable, measured in time) and Recovery
Time Objective (how long recovery is allowed to take) should drive tool choice, not the
other way around. A database where losing the last 24 hours of data is acceptable and a
4-hour recovery window is fine has very different needs than one where losing even five
minutes is unacceptable and recovery must complete in 15 minutes. This is the same starting
question a SQL Server DBA asks before picking a backup strategy — it doesn't change here.

## Assembling the MySQL-specific plan

For a small database with a loose RPO, a nightly `mysqldump --single-transaction
--all-databases` plus binlog retention covering the gap between dumps is often sufficient —
restore the dump, replay binlogs if you need finer recovery granularity than "last night."

For a large, high-write production database where mysqldump's restore time is unacceptable,
the real plan looks like: a periodic full XtraBackup (weekly, say), daily XtraBackup
incrementals on top of it, and continuous binary logging retained at least as long as the
gap between full backups. Recovery from a failure means restoring the most recent full
XtraBackup, applying the incrementals since then, and then replaying binlogs with
`mysqlbinlog` from that point up to just before the incident — full physical restore for
speed, binlog replay for precision.

Either plan should also account for *where* backups live: copies on the local server alone
aren't disaster recovery, they're accident recovery. Off-server, ideally off-site or
cloud-object-storage copies protect against the server itself failing or being lost
entirely, the same reasoning that applies to any platform's DR plan.

## Testing is what makes it a real plan

An untested backup isn't a real backup — that principle applies with zero modification to
MySQL. A backup script that's "supposed to work" and has never had its restore path
actually exercised is a plan on paper, not a working recovery capability. A genuine test
means: take the backup, restore it to a separate environment, verify the data is actually
there and correct, and time the whole process against your RTO. If a mysqldump restore that
was assumed to take 20 minutes actually takes 3 hours on real data volume, you need to know
that during a scheduled test, not during a real outage.

## Key terms

| Term | Meaning |
|---|---|
| RPO (Recovery Point Objective) | Maximum acceptable data loss, measured in time |
| RTO (Recovery Time Objective) | Maximum acceptable time to restore service after a failure |
| Runbook | A documented, step-by-step recovery procedure usable by someone other than its author |
| Restore test | Actually restoring a backup to verify it works and to measure real recovery time against the RTO |

## Check yourself

A production MySQL database has an RPO of 5 minutes and an RTO of 30 minutes. Sketch the
combination of tools from this chapter — mysqldump, XtraBackup, binlogs — that could
realistically meet both targets, and explain why a nightly-mysqldump-only plan would fail
the RPO.
