# PostgreSQL Disaster Recovery Planning

This chapter covered logical backups, physical backups, and WAL-based point-in-time
recovery as separate tools. A real disaster recovery plan puts them together, sized against
actual business requirements — the same RPO/RTO discipline you've applied on every platform
in this path, now built out of PostgreSQL's specific toolset.

## What you'll learn

- Applying RPO and RTO to PostgreSQL's specific backup mechanisms
- What a complete PostgreSQL DR plan actually consists of
- Why an untested restore isn't a real backup here either

## RPO and RTO, built from PostgreSQL's tools

Recovery Point Objective (how much data you can afford to lose) and Recovery Time Objective
(how long recovery can take) drive every DR decision, regardless of platform. In
PostgreSQL, your RPO is set by how frequently WAL segments reach archive storage — if
`archive_command` ships a segment every few seconds, your worst-case data loss is roughly
that interval, not the time since your last full backup. Your RTO is shaped by how long a
base backup restore takes plus how much WAL there is to replay since it was taken — which
is exactly why periodic `pg_basebackup` runs matter even though WAL archiving alone could
theoretically replay from the beginning of time. A fresher base backup means less WAL to
replay, which means a faster recovery.

## What a complete plan actually contains

A real PostgreSQL DR plan documents, specifically:

- **Backup cadence**: how often `pg_basebackup` runs, and confirmation that
  `archive_command` is continuously succeeding (a silently failing archive command is a
  DBA's worst-case surprise — it means WAL segments are piling up unarchived, and disk
  fills before anyone notices).
- **Retention**: how long base backups and archived WAL are kept, balancing storage cost
  against how far back you might need to recover.
- **Globals**: a current `pg_dumpall --globals-only` output, since a physical restore
  rebuilds data files but a from-scratch cluster rebuild still needs roles and tablespaces
  recreated.
- **The restore procedure itself**, written down and rehearsed: which base backup to
  restore, how to configure `restore_command` and `recovery_target_time`, and how long that
  actually takes on real hardware — not an estimate.

## The same discipline, a different toolset

The instinct that an untested backup isn't a real backup — true on SQL Server, true on
Oracle, true on MySQL — applies here without modification. A `pg_basebackup` that was never
restored, or an `archive_command` nobody verified is actually succeeding, is exactly as
untrustworthy as a SQL Server `.bak` file nobody ever restored. What's platform-specific is
only the mechanism: base backups instead of full backups, WAL segments instead of
transaction log backups, `recovery_target_time` instead of `STOPAT`. The discipline
transfers completely; only the commands change.

## Key terms

| Term | Meaning |
|---|---|
| RPO (Recovery Point Objective) | Maximum acceptable data loss, measured in time |
| RTO (Recovery Time Objective) | Maximum acceptable time to restore service |
| Backup cadence | How frequently base backups are taken, directly shaping RTO |
| Archive verification | Confirming archive_command is actually succeeding, not just configured |

## Check yourself

Your archive_command has been silently failing for six hours before anyone notices. What's
the practical effect on your RPO right now, and what does that tell you about why archive
verification belongs in a DR plan, not just archive configuration?
