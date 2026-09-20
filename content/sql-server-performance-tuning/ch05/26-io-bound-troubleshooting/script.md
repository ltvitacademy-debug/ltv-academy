# Script — I/O-Bound Troubleshooting

## Segment 1 (title)

Storage is the slowest major subsystem SQL Server touches, and it's usually the first place to look when wait stats point away from the CPU. Here's the specific wait types that mean I/O, and the DMV that finds exactly which file is struggling.

## Segment 2 (code: the three I/O wait types)

PAGEIOLATCH_SH and PAGEIOLATCH_EX mean a data page had to be physically read from disk for shared or exclusive access. WRITELOG means a transaction log write is waiting to be hardened to disk — and because every commit needs one, it's a direct measure of log-write latency.

## Segment 3 (code: finding the offending file)

Instance-wide wait stats tell you the category; sys.dm_io_virtual_file_stats tells you exactly which physical file is stalling, with cumulative read and write stall milliseconds per file. Dividing by operation count gives an average stall — low single digits is healthy on decent storage, tens of milliseconds is worth escalating.

## Segment 4 (code: the log is a special case)

A high WRITELOG total is usually fixed differently than data-file pressure — fewer, larger transactions, faster or dedicated log storage, or checking for autogrowth events stalling every writer mid-workload. It is not generally fixed by adding data-file spindles — that's a separate volume entirely.

## Segment 5 (outro)

A PAGEIOLATCH spike doesn't always mean buy faster disks — it can mean an undersized buffer pool or a missing index forcing a scan. Next up: the wait types and counters that point specifically at memory pressure.
