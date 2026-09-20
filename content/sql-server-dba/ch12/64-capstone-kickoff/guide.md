# Capstone Kickoff: You Inherit a Production Server

This is the capstone: one continuous scenario running across the rest of this course. You've
just been hired as the first dedicated Database Administrator at **Meridian Freight &
Logistics**, a regional trucking company running dispatch out of 40 terminals. Every lesson
from here to the end of the course follows the same server, the same database, and the same
incidents — you'll apply everything from Chapters 1 through 11 to it, in order.

## What you'll learn

- The realistic, specific state of the server you're inheriting
- How to run a first-week discovery pass instead of guessing
- How to turn a pile of problems into a prioritized remediation plan

## Meet MERSQL01

Meridian's dispatch application, **DispatchTrack**, runs against a single SQL Server named
**MERSQL01** — a physical Windows Server 2019 box, SQL Server 2019 Standard Edition, default
instance, installed in 2016 by Russ, an IT generalist who also handles printers, the phone
system, and the parking lot gate. Russ did his best. Nobody ever gave him a second person to
hand the database off to — until now. The one database that matters is **DispatchDB**: Loads,
Drivers, Dispatches, and Customers tables that every terminal touches every few minutes.

Your first week is discovery, not fixing. You run the same kind of queries this course has
built all along — `sys.databases`, `sys.master_files`, `sys.dm_os_sys_info`, `msdb.dbo.sysjobs`
— and you write down exactly what you find, because "it's a mess" isn't a plan and it isn't
something you can hand to a manager later.

## What discovery turns up

- **`sa` is enabled**, mixed mode, password unchanged since the 2016 install — and DispatchTrack's
  own connection string logs into the server *as* `sa`, in plaintext, in a config file on a
  shared drive every terminal can read.
- **`DispatchDB` is in FULL recovery** (correct, for point-in-time recovery) but **no transaction
  log backup has ever run**. `DispatchDB_log.ldf` has grown to 210 GB on a 500 GB `C:` drive
  that's now 91% full. The only backups that exist are Russ's occasional manual full backups —
  the last one is three weeks old, and it's sitting on the same drive as the database it's
  backing up.
- **`tempdb` is a single 8 MB data file** with 10% autogrowth, still on `C:`, alongside
  everything else — data files, log files, and backups all on one volume.
- **No maintenance jobs exist.** `msdb.dbo.sysjobs` has exactly one row: a disabled job left
  over from the vendor's install script. No index maintenance, no statistics updates, and
  `DBCC CHECKDB` has never once been run against `DispatchDB`.
- **No change history.** Developers make schema changes directly in SSMS against production,
  with no saved script and no record of what changed or when.

## Turning this into a plan

None of this is exotic — it's the accumulation of six years with nobody watching. The fix
follows the same order this course taught the material in: architecture and configuration
first (you can't secure or maintain a server you haven't stabilized), then security, then
maintenance automation, and only after the foundation is solid do you have the tooling in
place to handle the incident and the schema change that are coming in Lessons 67 and 68.

## Key terms

| Term | Meaning |
|---|---|
| Discovery pass | A first-week audit of an inherited server's actual configuration, before changing anything |
| RPO (Recovery Point Objective) | How much data loss is acceptable, measured in time — undefined here since log backups never ran |
| Break-glass account | An emergency-only admin credential, tightly controlled, instead of a shared everyday `sa` login |
| Schema drift | Undocumented differences between what a database looks like and what anyone has on record |

## Check yourself

`DispatchDB`'s recovery model is FULL, which is the *correct* choice for a database that needs
point-in-time recovery. So why is that setting actively dangerous the way MERSQL01 is currently
configured, and what single missing piece of automation would fix it?
