# I/O-Bound Troubleshooting

Storage is the slowest major subsystem SQL Server touches, and it's usually the first
place to look when wait stats point away from the CPU. This lesson covers the specific
wait types that mean "I/O," and the DMV that tells you exactly which database file is
struggling.

## What you'll learn

- The three I/O wait types and what each one specifically means
- Why `PAGEIOLATCH_SH`/`PAGEIOLATCH_EX` point at data files, and `WRITELOG` points at the
  log
- How to use `sys.dm_io_virtual_file_stats` to find the actual offending file
- Why a symptom at the wait-stats level can have causes far from the disk itself

## The three core I/O wait types

- **`PAGEIOLATCH_SH`** — waiting for a data page to be physically read from disk into the
  buffer pool for a *shared* (read) access. This is the classic "buffer pool doesn't have
  what I need" wait.
- **`PAGEIOLATCH_EX`** — the same physical read wait, but for a page about to be modified
  (exclusive access). Less common than the `_SH` variant, but points at the same
  underlying cause: reads coming from disk instead of cache.
- **`WRITELOG`** — waiting for a write to the transaction log to be hardened to disk.
  Because every transaction commit requires a log write, this wait type is a direct
  measure of log-write latency, and it's especially sensitive to slow storage since log
  writes are synchronous by design.
- **`IO_COMPLETION`** — a more general wait for a non-buffer-pool I/O operation to finish
  (things like backup, or certain read-ahead operations); less specific than the other
  three, but still worth noting if it's prominent.

```sql
SELECT wait_type, waiting_tasks_count, wait_time_ms, signal_wait_time_ms
FROM sys.dm_os_wait_stats
WHERE wait_type IN ('PAGEIOLATCH_SH','PAGEIOLATCH_EX','WRITELOG','IO_COMPLETION')
ORDER BY wait_time_ms DESC;
```

Notice that `PAGEIOLATCH_*` and `WRITELOG` point at *different* files — one at your data
files, the other exclusively at the transaction log. That distinction changes where you
look next.

## Finding the specific offending file

Instance-wide wait stats tell you "I/O is the category," but `sys.dm_io_virtual_file_stats`
tells you exactly which physical file is stalling:

```sql
SELECT
    DB_NAME(vfs.database_id) AS database_name,
    mf.physical_name,
    vfs.num_of_reads, vfs.num_of_writes,
    vfs.io_stall_read_ms, vfs.io_stall_write_ms,
    vfs.io_stall_read_ms / NULLIF(vfs.num_of_reads, 0) AS avg_read_stall_ms,
    vfs.io_stall_write_ms / NULLIF(vfs.num_of_writes, 0) AS avg_write_stall_ms
FROM sys.dm_io_virtual_file_stats(NULL, NULL) AS vfs
JOIN sys.master_files AS mf
    ON vfs.database_id = mf.database_id AND vfs.file_id = mf.file_id
ORDER BY vfs.io_stall_read_ms + vfs.io_stall_write_ms DESC;
```

`io_stall_read_ms` and `io_stall_write_ms` are cumulative milliseconds spent waiting on
reads and writes for that specific file, since the file was last opened (a restart or
file-move resets it — the same "clear before measuring" caution from Lesson 24 applies
conceptually here too). Dividing by the operation count gives an average stall per
operation — a number in the low single digits of milliseconds is healthy for a well-
performing SSD-backed volume; numbers climbing into the tens of milliseconds are worth
escalating.

## The transaction log is a special case

Because `WRITELOG` waits are tied to the log file specifically, a high `WRITELOG` total
often has a different fix than data-file I/O pressure: it's frequently addressed by
reducing transaction size/frequency (fewer, larger commits instead of many tiny ones),
moving the log to faster or dedicated storage, or in some cases, investigating whether
autogrowth events are happening mid-workload (a growing log file stalls every writer
during the grow). It is *not* generally fixed by adding more data-file spindles — that's
a separate volume.

## Correlate before you conclude

A `PAGEIOLATCH_SH` spike doesn't always mean "buy faster disks." It can mean the buffer
pool is too small for the working set (Lesson 27's territory), a missing index is forcing
full scans that read far more pages than necessary (Chapter 3's territory), or a report
query is doing a legitimate large read that simply has to touch disk. Correlating the
wait-type evidence with `sys.dm_io_virtual_file_stats`'s per-file numbers, and with what
queries were actually running during the window, keeps you from treating every I/O wait
as a storage-hardware problem.

## Key terms

| Term | Meaning |
|---|---|
| `PAGEIOLATCH_SH` / `PAGEIOLATCH_EX` | Waiting for a data page to be physically read from disk into the buffer pool, for shared/exclusive access |
| `WRITELOG` | Waiting for a transaction log write to be hardened to disk — direct measure of log-write latency |
| `sys.dm_io_virtual_file_stats` | DMV exposing cumulative read/write counts and stall time per physical database file |
| I/O stall | Cumulative milliseconds a file's reads or writes have spent waiting, since the file was opened |

## Check yourself

A server shows high `WRITELOG` wait time but `PAGEIOLATCH_SH`/`EX` are both negligible.
Based on this lesson, is "add more data-file storage spindles" a sensible fix here? What
would you check and consider instead?
