# Data File & Log File Management

Chapter 3 covered filegroups and database options; this chapter goes underneath all of
that, to the physical storage itself. Data files and log files behave completely
differently at the I/O level, and treating them the same — putting them on the same disk,
sizing them the same way — is one of the most common storage mistakes a new DBA makes.

## What you'll learn

- Why data files and log files have fundamentally different I/O patterns
- Why that difference means they belong on separate physical disks
- What a VLF is, and why too many of them causes real problems

## Two very different I/O patterns

Data files (`.mdf` / `.ndf`) see **random I/O**. Pages get read and written wherever the
data they hold happens to live — a query might touch pages scattered across the entire
file, and so might a checkpoint flushing dirty pages back to disk.

The log file (`.ldf`) sees **sequential I/O**. SQL Server implements write-ahead logging:
every change to data is written to the log first, in strict order, before the
corresponding data page is written to the data file. As long as nothing else is competing
for that disk, log writes are one continuous, sequential stream — which is exactly the
I/O pattern that spinning disks (and even SSDs, to a lesser extent) handle fastest.

## Why this means separate physical disks

Put a randomly-accessed data file and a sequentially-written log file on the same disk,
and the data file's random I/O breaks up the log's sequential pattern — every seek for a
data page interrupts the log's streaming writes. On busy systems this measurably slows
down every write transaction, since no transaction commits until its log record is durably
written. Separating them onto different physical disks (or genuinely separate LUNs on a
SAN) keeps the log's sequential writes uninterrupted, and gives you a second, independent
benefit: if the data disk fails outright, the log disk — untouched by the failure — can
still be backed up (a "tail-log backup") to recover every transaction right up to the
moment of failure.

## VLFs: the log file's internal structure

Internally, a log file isn't one undifferentiated stream — it's divided into **Virtual
Log Files (VLFs)**, each a physically contiguous chunk. SQL Server grows the log by adding
new VLFs and can reuse (truncate) VLFs once their contents are no longer needed. A log
file that grew through many small, repeated autogrowth events ends up with a huge number
of small VLFs — "VLF fragmentation" — which slows down log-related operations like crash
recovery and database restarts, since SQL Server has to process every VLF. `DBCC LOGINFO`
shows the current VLFs for a database; sizing the log file correctly upfront, rather than
letting it grow in small increments, is the real fix.

```sql
ALTER DATABASE Sales
MODIFY FILE (NAME = Sales_Log, SIZE = 8192MB, FILEGROWTH = 1024MB);
```

## Key terms

| Term | Meaning |
|---|---|
| Random I/O | Reads/writes scattered across a file; the data file's typical access pattern |
| Sequential I/O | Continuous, ordered writes; the log file's access pattern via write-ahead logging |
| Write-ahead logging | Every change is logged before the data page is written, guaranteeing durability |
| VLF (Virtual Log File) | An internal, contiguous chunk of the log file; too many small ones causes VLF fragmentation |

## Check yourself

A server has one disk holding both the data file and the log file for a busy OLTP
database. Write throughput is worse than expected. What's happening at the I/O level, and
what single change would help most?
