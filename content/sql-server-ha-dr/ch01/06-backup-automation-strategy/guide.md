# Backup Automation Strategy

This chapter has designed a strategy (Lesson 2), made the backups smaller and safer (Lesson
3), spread them across locations (Lesson 4), and verified them (Lesson 5). None of that
matters if it depends on someone remembering to run it by hand. This lesson closes Chapter 1
by wiring the strategy to a real, industry-standard scheduling mechanism — and by naming
exactly what the rest of this course assumes is already in place.

## What you'll learn

- How SQL Server Agent jobs turn a backup strategy into something that runs unattended
- Why almost nobody hand-rolls backup T-SQL in production — the real, honest answer is Ola
  Hallengren's Maintenance Solution
- How this chapter's backup foundation is the assumption every remaining chapter builds on

## SQL Server Agent: the scheduling mechanism itself

SQL Server DBA covered SQL Server Agent as the tool for running scheduled jobs. Applied here,
each piece of the Lesson 2 strategy becomes its own Agent job with its own schedule — a
weekly full, a nightly differential, and a log backup every 15 minutes, matching whatever RPO
was decided on:

```sql
EXEC msdb.dbo.sp_add_job @job_name = N'Nightly Differential Backup';

EXEC msdb.dbo.sp_add_jobstep
    @job_name = N'Nightly Differential Backup',
    @step_name = N'Run Differential',
    @subsystem = N'TSQL',
    @command = N'BACKUP DATABASE Sales TO DISK = ''D:\Backup\Sales_Diff.bak'' WITH DIFFERENTIAL, COMPRESSION;';

EXEC msdb.dbo.sp_add_schedule
    @schedule_name = N'Nightly at 1 AM',
    @freq_type = 4, @freq_interval = 1,
    @active_start_time = 010000;
```

That's the mechanism. It works. But almost nobody in a real production shop writes and
maintains dozens of these hand-rolled job steps across every database on a server.

## The honest, real answer: Ola Hallengren's Maintenance Solution

The actual industry-standard way most shops automate SQL Server backups is Ola Hallengren's
free Maintenance Solution scripts — the same tool referenced in SQL Server DBA for index and
statistics maintenance. Its `DatabaseBackup` stored procedure handles full, differential, and
log backups for every user or system database on an instance with one call per backup type,
including compression, checksum verification, and automatic cleanup of aged-out backup
files:

```sql
EXECUTE dbo.DatabaseBackup
    @Databases = 'USER_DATABASES',
    @BackupType = 'FULL',
    @Compress = 'Y',
    @CheckSum = 'Y',
    @Verify = 'Y',
    @CleanupTime = 336;

EXECUTE dbo.DatabaseBackup
    @Databases = 'USER_DATABASES',
    @BackupType = 'LOG',
    @Compress = 'Y';
```

`@CleanupTime = 336` deletes backup files older than 336 hours (14 days) automatically.
`@Verify = 'Y'` runs `RESTORE VERIFYONLY` against every backup it takes — Lesson 5's
verification step, built in. Each of these calls becomes the single command inside one Agent
job step, scheduled per Lesson 2's cadence: the `FULL` call in a weekly job, `DIFF` in a
nightly job, `LOG` on a 15-minute schedule.

## Why the honest answer matters more than the hand-rolled one

Hand-rolled backup jobs aren't wrong, but they mean re-solving problems Ola Hallengren's
scripts already solve correctly: handling databases added after the job was written,
skipping databases that are offline or read-only without failing the whole job, log backups
that correctly skip databases in SIMPLE recovery instead of erroring, and cleanup that
doesn't silently fill a disk with backups nobody ever deletes. Recognizing this script suite
by name — and reading its own documentation before deviating from it — is a real,
transferable skill, not a shortcut.

## This chapter is the foundation everything ahead assumes

Chapter 2 covers restore scenarios that assume a real backup chain exists to restore.
Chapters 3 through 8 cover HA and DR technologies — Availability Groups, failover
clustering, log shipping, replication — that assume the underlying databases are already
correctly backed up regardless of what else happens to them. None of that content re-derives
backup fundamentals; it's built directly on top of what this chapter established. A gap here
— a missing log backup schedule, an unverified backup, a single point of failure in where
backups land — is a gap in everything that follows, not just in Chapter 1.

## Key terms

| Term | Meaning |
|---|---|
| SQL Server Agent job | The native scheduling mechanism for running T-SQL or other commands on a recurring schedule |
| Ola Hallengren's Maintenance Solution | Free, industry-standard scripts for backup, integrity checking, and index/statistics maintenance |
| `DatabaseBackup` | The Maintenance Solution's stored procedure that runs full, differential, or log backups across databases |
| `@CleanupTime` | `DatabaseBackup` parameter that automatically deletes backup files older than the given number of hours |

## Check yourself

A shop has hand-rolled Agent jobs that run `BACKUP DATABASE` for a fixed list of database
names. Six months later, three new databases have been created on the same instance and are
receiving no backups at all. What about Ola Hallengren's `DatabaseBackup` procedure, called
with `@Databases = 'USER_DATABASES'`, would have prevented this specific gap?
