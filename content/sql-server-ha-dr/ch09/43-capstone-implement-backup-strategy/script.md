# Script — Capstone: Implement the Backup Strategy

## Segment 1 (title)

Before touching the Availability Group itself, Bellhaven needs a real backup chain. An AG protects
against server and site loss, but it does nothing to stop a bad update or a dropped table from
replicating just as fast as the good data.

## Segment 2 (code: the schedule)

The RPO of 5 minutes drives the schedule directly: a full backup nightly at 1 AM, a differential
every 6 hours, and a log backup every 5 minutes — matching the RPO exactly. Full backups run
COPY_ONLY, so they don't disturb the AG's own backup chain assumptions.

## Segment 3 (steps: why COPY_ONLY, and which replica runs what)

Once this database sits inside an Availability Group, only COPY_ONLY full backups and log backups
are supported on a secondary — differential backups aren't, because the differential bitmap can't
be tracked there. So the full backup runs on the secondary SQLPRD02, the differential has to run
on the primary SQLPRD01, and the log backup job checks sys.fn_hadr_backup_is_preferred_replica
before running at all.

## Segment 4 (outro)

That schedule bounds data loss at 5 minutes, matching the stated RPO exactly. Up next: building
AG_Bellhaven itself — the Availability Group that meets the RTO side of this scenario.
