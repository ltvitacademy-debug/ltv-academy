# Instance-Level Settings for Performance

Lessons 38–40 covered `MAXDOP`, `cost threshold for parallelism`, `max server memory`, and
`optimize for ad hoc workloads` — the `sp_configure` options most instances actually need
reviewed. This lesson closes out the configuration review with what's left: trace flags
worth knowing about (and knowing are now obsolete), and two Windows-level settings that
matter just as much as anything in `sp_configure`.

## What you'll learn

- Why several once-essential trace flags (1117, 1118) are now automatic default behavior
- How a global trace flag like 4199 was superseded by a per-database scoped configuration
- Lock Pages in Memory and Instant File Initialization — real Windows-level settings, not
  `sp_configure` options

## Trace flags: mostly history now, and that's honest to say

A **trace flag** is a global (or session-level) switch, historically started with
`sqlservr -T1117` or set with `DBCC TRACEON`, enabling non-default engine behavior. Two of
the most commonly cited trace flags in older tuning material are functionally retired:

- **TF 1117** made every file in a filegroup autogrow together, instead of just the one
  file that filled up (avoiding a lopsided, single-file-heavy filegroup). Since SQL Server
  2016, this is a per-database option — `ALTER DATABASE ... SET AUTOGROW_ALL_FILES ON` —
  and tempdb specifically autogrows this way automatically, with no flag or setting needed.
- **TF 1118** forced uniform full-extent allocation instead of mixed extents, reducing
  `SGAM` page contention under heavy concurrent object creation. As of SQL Server 2016,
  uniform extent allocation is simply the default behavior for every database — the flag
  has nothing left to turn on, on a modern version.

```sql
-- The modern, per-database equivalent of TF 1117 -- no restart, no global flag
ALTER DATABASE MyDb SET AUTOGROW_ALL_FILES ON;
```

**TF 4199** is a live exception, and it illustrates the pattern well: it enables the
accumulated set of query-optimizer bug fixes that shipped in cumulative updates but were
left off by default (to protect existing plans from unexpectedly changing). It's still a
real, current flag — but since SQL Server 2016, the same effect is available per database,
without a server restart, through database-scoped configuration:

```sql
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = ON;
```

The honest takeaway: don't reach for a trace flag from an older blog post without checking
whether the version in front of you already does it by default, or offers the same control
at the database level instead.

## Lock Pages in Memory: a Windows privilege, not sp_configure

**Lock Pages in Memory (LPIM)** prevents Windows from trimming SQL Server's working set —
including the buffer pool — under OS-level memory pressure. It isn't an `sp_configure`
option at all; it's a Windows local security policy right (`Lock pages in memory`,
technically `SeLockMemoryPrivilege`) granted to the SQL Server service account through
`secpol.msc` (or Group Policy on a domain), and it only takes effect after the SQL Server
service is restarted. It's typically paired with a deliberately-set `max server memory`
(Lesson 40) — LPIM keeps the OS from reclaiming that memory once granted, so the ceiling
still needs to be set sensibly, or SQL Server can end up holding more memory than the box
can actually spare.

## Instant File Initialization: skipping the zero-fill

**Instant File Initialization (IFI)** lets SQL Server skip zero-filling newly allocated
space in **data files** — on database creation, restore, or autogrow — instead of writing
zeros across every new byte before it can be used. This is also a Windows privilege,
`Perform volume maintenance tasks` (`SeManageVolumePrivilege`), granted to the service
account the same way as LPIM. It applies only to data files, never the transaction log,
which SQL Server always zero-initializes for crash-recovery correctness. Where it matters:
a data file growing by several gigabytes, or a large database restore, without IFI enabled
spends real, visible time zero-filling that space before the operation can proceed — with
it enabled, that time essentially disappears. Whether it's active is visible in the SQL
Server error log at startup (`Database Instant File Initialization: enabled`).

## Key terms

| Term | Meaning |
|---|---|
| Trace flag | A global or session switch enabling non-default engine behavior; several older ones are now default |
| AUTOGROW_ALL_FILES | Per-database option (2016+) replacing TF 1117's effect, without a restart |
| QUERY_OPTIMIZER_HOTFIXES | Database-scoped configuration (2016+) replacing TF 4199's effect, per database |
| Lock Pages in Memory (LPIM) | Windows privilege preventing the OS from trimming SQL Server's memory under pressure |
| Instant File Initialization (IFI) | Windows privilege letting data files skip zero-fill on growth, creation, or restore |

## Check yourself

A colleague suggests enabling trace flags 1117 and 1118 on a new SQL Server 2022 instance
because "that's what the tuning guide says." Per this lesson, why is that suggestion
outdated, and what should you check instead?
