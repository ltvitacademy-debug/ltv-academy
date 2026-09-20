# Disk Layout for SQL Server

This closes out the storage chapter by putting every principle from the last four lessons
— separate I/O patterns, tempdb's special needs, growth strategy, RAID tradeoffs — into
one concrete recommendation: an actual drive map you could hand to whoever is provisioning
a new SQL Server box.

## What you'll learn

- A real, recommended drive layout for a standalone SQL Server instance
- Why each separation matters for performance *and* for recoverability specifically
- Why backups deserve their own volume as much as data and log do

## A recommended layout

| Drive | Contents | Why separate |
|---|---|---|
| C: | OS, SQL Server binaries | Isolates the OS from database I/O entirely |
| D: (or more) | Data files (.mdf / .ndf) | Random I/O; can be split across multiple drives/filegroups for parallelism |
| E: | Transaction log files (.ldf) | Sequential, write-ahead I/O; must not be interrupted by random data I/O |
| F: | tempdb data and log files | Highest churn, no durability requirement; ideally the fastest storage available |
| G: | Backups | Must not share physical disks with the data it's backing up |

This is a starting point, not a law — a small server might combine data and tempdb if
there's genuinely no contention, and a large environment might split data across several
drives by filegroup. The reasoning behind each line matters more than memorizing the
letters.

## Two different reasons for the same layout

Every separation in this table earns its place for **two** independent reasons, not one:

- **Performance.** Data's random I/O, the log's sequential I/O, and tempdb's high-churn
  temporary I/O genuinely interfere with each other when they share a disk — this is the
  reasoning from Lesson 21 and 22.
- **Recoverability.** If the disk holding data fails, a log file on an *untouched* disk
  means you can still take a tail-log backup and recover every committed transaction up to
  the failure. If backups live on the *same* disk as the data, a single disk failure can
  take out both your database and your only copy of it — which defeats the entire purpose
  of taking backups in the first place.

That second reason is why the backup drive matters as much as the data and log drives,
even though backups themselves generate a comparatively simple, sequential I/O pattern —
it's not about backup performance, it's about not losing the backup along with the
database.

## Key terms

| Term | Meaning |
|---|---|
| Drive/volume separation | Assigning data, log, tempdb, and backups to distinct physical volumes |
| Fault isolation | Ensuring a single disk failure can't take out both a database and its backup |
| Tail-log backup | A final log backup taken after a failure, capturing transactions since the last log backup |

## Check yourself

A production server keeps its nightly full backups on the same physical drive as the data
files, to "keep things simple." The data drive fails. What exactly is lost, and how would
correct disk layout have changed the outcome?
