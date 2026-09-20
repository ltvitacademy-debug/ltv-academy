# RMAN Architecture & Configuration

RMAN isn't a single command — it's a client that connects to the target database, talks to
one or more **channels** to actually read and write backup pieces, and records what it did
somewhere durable. Where that "somewhere" is — the control file alone, or a separate
recovery catalog — is one of the first real architecture decisions an Oracle DBA makes, with
no equivalent decision in typical SQL Server backup work.

## What you'll learn

- RMAN's basic architecture: target database, channels, and where metadata lives
- The recovery catalog: what it adds over the control-file-only default
- Real `CONFIGURE` commands that shape RMAN's default behavior

## RMAN connects to a target and allocates channels to do the work

You start RMAN by connecting to the database you're backing up (the **target**):

```
rman TARGET /
```

Every backup or restore operation happens through a **channel** — a connection to a specific
device (disk or tape) that actually performs the read/write I/O. RMAN allocates channels
automatically based on configuration, or you can allocate them manually for a specific
operation:

```
RMAN> ALLOCATE CHANNEL ch1 DEVICE TYPE DISK;
RMAN> BACKUP DATABASE;
RMAN> RELEASE CHANNEL ch1;
```

Multiple channels let RMAN parallelize a backup across several disk or tape devices at once.

## Metadata about backups has to live somewhere — the control file by default

RMAN needs to know what backups exist, when they were taken, and what they cover. By default,
that metadata lives in the **target database's own control file**. This works, but has real
limitations: control file space for RMAN records is bounded by
`CONTROL_FILE_RECORD_KEEP_TIME` (days, default 7), so very old backup history can age out, and
if the control file itself is lost, RMAN's own memory of past backups goes with it.

## A recovery catalog is a separate, optional, recommended metadata store

A **recovery catalog** is a schema in a *separate* database, dedicated to storing RMAN
metadata for one or more target databases:

```
RMAN> CONNECT TARGET /
RMAN> CONNECT CATALOG rman_admin/password@catdb
RMAN> REGISTER DATABASE;
```

Real advantages over control-file-only: metadata survives even if the target's control file
is lost, retention isn't bounded by `CONTROL_FILE_RECORD_KEEP_TIME`, it can store reusable
RMAN scripts, and one catalog can track backup history for many target databases centrally —
valuable for a DBA managing more than a handful of databases. It's optional — plenty of
real environments run control-file-only — but recommended for anything beyond a small,
single-database shop.

## `CONFIGURE` sets persistent defaults so you don't repeat options every run

RMAN settings configured once apply to every future session until changed:

```
RMAN> CONFIGURE RETENTION POLICY TO REDUNDANCY 2;
RMAN> CONFIGURE RETENTION POLICY TO RECOVERY WINDOW OF 7 DAYS;
RMAN> CONFIGURE BACKUP OPTIMIZATION ON;
RMAN> CONFIGURE DEFAULT DEVICE TYPE TO DISK;
RMAN> CONFIGURE CONTROLFILE AUTOBACKUP ON;
```

- **Retention policy** decides which backups are considered *obsolete* (safe to delete),
  either by redundancy count ("keep the last N full backups") or a recovery window ("keep
  whatever's needed to restore to any point in the last N days"). You pick one mode, not
  both.
- **`BACKUP OPTIMIZATION`** skips re-backing-up files RMAN can tell haven't changed since a
  previous backup satisfying the retention policy — meaningfully faster repeat backups.
- **`CONTROLFILE AUTOBACKUP`** automatically backs up the control file (and spfile) after
  every backup and significant structural change, so you can restore even a completely lost
  control file using just the autobackup.

`CONFIGURE` settings can always be checked with `SHOW ALL;` and reset to Oracle's default
with `CONFIGURE ... CLEAR`.

## Key terms

| Term | Meaning |
|---|---|
| Target database | The database RMAN is backing up or restoring |
| Channel | A connection to a device (disk/tape) that performs the actual backup I/O |
| Recovery catalog | Optional separate schema storing RMAN metadata outside the control file |
| `CONTROL_FILE_RECORD_KEEP_TIME` | Days RMAN metadata is retained in the control file (default 7) |
| Retention policy | Rule (redundancy or recovery window) deciding which backups are obsolete |
| `CONTROLFILE AUTOBACKUP` | Automatic backup of the control file/spfile after backups and structural changes |

## Check yourself

A DBA manages twelve Oracle databases and relies solely on each one's control file for RMAN
metadata. Name two concrete problems this creates, and explain how a recovery catalog would
address them.
