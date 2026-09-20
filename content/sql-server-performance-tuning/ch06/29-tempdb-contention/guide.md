# TempDB Contention

TempDB is the one database every single session on the instance shares — for sort
spills, hash join workspace, table variables, temp tables, and version store rows for
snapshot isolation. That shared nature makes it a uniquely common bottleneck, with a
uniquely well-understood fix.

## What you'll learn

- Why TempDB's internal allocation pages, not disk speed, are usually the real bottleneck
- The specific wait types that signal TempDB allocation contention
- GAM, SGAM, and PFS pages, and why they get hot under concurrency
- The multiple-equally-sized-files fix, and why "equally sized" is not optional

## The symptom: PAGELATCH waits on tempdb

When many sessions simultaneously create and drop temp objects (temp tables, table
variables), they all need to allocate and deallocate pages within TempDB's data files.
That allocation process itself needs to update special *allocation bitmap* pages, and
because there are relatively few of those pages, many concurrent sessions end up
contending for the same few pages in memory. This shows up as:

```sql
SELECT wait_type, waiting_tasks_count, wait_time_ms, signal_wait_time_ms
FROM sys.dm_os_wait_stats
WHERE wait_type LIKE 'PAGELATCH%';
```

Note the specific wait names: `PAGELATCH_UP` and `PAGELATCH_EX`. These are latches, not
locks — lightweight, short-duration synchronization on an in-memory page, distinct from
the `PAGEIOLATCH_*` waits from Lesson 26 (which are waits for the page to be physically
*read from disk*). A `PAGELATCH` wait means the page is already in memory; sessions are
just contending to access it.

## Which specific pages get hot: GAM, SGAM, PFS

Three types of TempDB allocation pages are the classic contention points:

- **GAM (Global Allocation Map)** pages — track which extents (groups of 8 pages) are
  allocated at all.
- **SGAM (Shared Global Allocation Map)** pages — track which extents are mixed extents
  with at least one free page available.
- **PFS (Page Free Space)** pages — track roughly how full each individual page is.

Every session creating or dropping a temp table has to touch these bookkeeping pages,
and because a single GAM or PFS page covers a large number of data pages, high-concurrency
workloads with lots of small, short-lived temp objects converge on the *same physical
pages* to update allocation metadata — hence the latch contention.

## The fix: multiple, equally sized TempDB data files

The standard, well-established fix is to give TempDB multiple data files instead of one —
this spreads the GAM/SGAM/PFS allocation load across separate files (and separate
allocation page sets), directly reducing contention on any single page. A common starting
guideline is one data file per logical CPU core up to about 8 files, then reassessing
based on observed contention (not blindly continuing to add files past that without
evidence it helps):

```sql
ALTER DATABASE tempdb ADD FILE (
    NAME = tempdev2,
    FILENAME = 'D:\TempDB\tempdb2.ndf',
    SIZE = 8192MB,
    FILEGROWTH = 512MB
);
-- repeat for tempdev3, tempdev4, ... — same SIZE and FILEGROWTH
```

## Why "equally sized" isn't optional

SQL Server's proportional-fill algorithm allocates new extents across TempDB's data
files in proportion to how much free space each file has. If the files are *not* equally
sized, the algorithm favors the file(s) with more free space, which defeats the entire
point of adding files — allocation activity concentrates unevenly again, right back
toward contention on a subset of files. Every TempDB data file should be the same `SIZE`
and the same `FILEGROWTH`, and ideally autogrowth should rarely need to fire at all in
normal operation (files pre-sized generously up front, since TempDB resets to its
configured size on every restart anyway).

## Key terms

| Term | Meaning |
|---|---|
| `PAGELATCH_UP` / `PAGELATCH_EX` | Waits for access to an in-memory page already resident in the buffer pool — contention, not disk I/O |
| GAM / SGAM page | Global/Shared Global Allocation Map pages tracking which extents are allocated or have free space |
| PFS page | Page Free Space page tracking roughly how full each individual page is |
| Proportional fill | SQL Server's algorithm for spreading new allocations across a filegroup's files by relative free space |

## Check yourself

A DBA adds four new TempDB data files to fix `PAGELATCH_UP` contention, but sizes each
new file at 1 GB while the original file is 20 GB with autogrowth left on. Contention
barely improves. Based on this lesson, what's the most likely reason the fix didn't work?
