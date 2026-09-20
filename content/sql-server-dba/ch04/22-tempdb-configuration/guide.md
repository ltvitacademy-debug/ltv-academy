# TempDB Configuration

Every workload on an instance shares one `tempdb` — temp tables, table variables, row
versioning for `READ_COMMITTED_SNAPSHOT` and snapshot isolation, sort and hash spills, and
online index rebuild all land here. A default, single-file `tempdb` becomes a real
bottleneck under concurrency, and Microsoft's own guidance on fixing that has become
standard practice.

## What you'll learn

- Why a single tempdb data file causes contention under concurrent load
- Microsoft's current recommendation for the number and sizing of tempdb data files
- Why Instant File Initialization matters specifically for tempdb

## Why one file isn't enough

`tempdb`'s data pages are allocated using special allocation pages (like `PFS` pages) that
track free space. Under high concurrency, many sessions creating and dropping temp objects
simultaneously contend for the same allocation pages within a single data file — a real,
measurable bottleneck visible as `PAGELATCH` waits. Splitting tempdb's data across
multiple files gives SQL Server multiple sets of allocation pages to spread that
contention across.

## The current recommendation

Microsoft's guidance — and what SQL Server Setup does automatically since SQL Server
2016 — is: multiple tempdb data files, **all the same initial size and the same
growth setting**, one file per logical CPU core up to a maximum of **8 files**. Equal
sizing matters because SQL Server's proportional-fill algorithm allocates more to whichever
file has proportionally more free space — uneven files defeat the point of splitting them.
Beyond 8 logical CPUs, add more files only in multiples of 4 if you're still seeing
allocation-page contention after monitoring, rather than automatically scaling files to
core count.

```sql
ALTER DATABASE tempdb ADD FILE
    (NAME = tempdev2, FILENAME = 'T:\TempDB\tempdb2.ndf',
     SIZE = 1024MB, FILEGROWTH = 256MB);
-- Repeat with matching size/growth for tempdev3, tempdev4, ...
```

## Instant File Initialization matters here too

Unlike a user database's data files, `tempdb`'s data files are recreated fresh every time
SQL Server restarts. **Instant File Initialization (IFI)** lets SQL Server skip
zero-writing newly allocated space in a data file, making both the initial create and any
growth event dramatically faster. Since tempdb is rebuilt on every restart and is one of
the most frequently-growing databases on a busy instance, IFI is especially valuable
there. It requires the SQL Server service account be granted the **"Perform volume
maintenance tasks"** Windows right, and — like all data-file growth — it does not apply to
the log file.

## Key terms

| Term | Meaning |
|---|---|
| tempdb | Shared system database for temp objects, spills, and row versioning; recreated on every restart |
| PAGELATCH contention | Blocking on tempdb's allocation pages under high concurrency with too few data files |
| Proportional fill | SQL Server allocates more to whichever file in a filegroup has more free space |
| Instant File Initialization (IFI) | Skips zero-writing new space in data files; requires a Windows service-account right |

## Check yourself

A server with 16 logical CPUs shows heavy PAGELATCH waits on tempdb allocation pages, and
tempdb currently has one data file. How many files would you configure, how would you size
them relative to each other, and what would you check before adding even more?
