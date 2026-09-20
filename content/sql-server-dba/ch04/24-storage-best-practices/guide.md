# Storage Best Practices

This lesson pulls together everything the last three lessons established — random vs.
sequential I/O, tempdb's shared nature, growth behavior — into concrete storage
recommendations a DBA can apply when standing up new storage or reviewing existing layout.

## What you'll learn

- Why data, log, and tempdb belong on separate physical volumes
- Real RAID-level tradeoffs for each workload type
- A practical checklist item most DBAs forget: antivirus exclusions

## Separate volumes for data, log, and tempdb

Lesson 21 established that data files and log files have different I/O patterns and
belong on different disks. tempdb adds a third distinct profile: extremely high write
churn (created and dropped constantly) with no durability requirement at all, since it's
rebuilt on every restart. Where possible, give each of data, log, and tempdb its own
physical volume (or, on shared storage, a genuinely separate LUN with its own underlying
disks) — this isolates I/O contention between them and means a problem on one volume
doesn't necessarily take down the others.

## RAID-level tradeoffs

- **RAID 10** (striped mirrors) is the standard recommendation for both data and log on
  traditional disk: it gives strong read and write performance with real redundancy (one
  disk from each mirrored pair can fail without data loss), at the cost of using twice the
  raw disk capacity.
- **RAID 5** (striping with distributed parity) is more space-efficient, but every write
  incurs a parity-calculation penalty — acceptable for read-heavy data volumes, a poor fit
  for the log, which is a write-heavy, latency-sensitive sequential stream.
- **RAID 1** (mirroring) is reasonable for a smaller log volume or the OS/binaries volume,
  where capacity needs are modest but redundancy still matters.

On modern SSD/NVMe storage the parity-penalty gap narrows, but the fault-isolation logic
for separating data, log, and tempdb onto distinct volumes still holds even when the
underlying media is fast.

## Don't forget antivirus exclusions

Real-time antivirus scanning that touches `.mdf`, `.ndf`, and `.ldf` files as SQL Server
writes to them is a genuine, often-overlooked performance and correctness risk — file
locking from a scanner mid-write can even cause I/O errors. Microsoft's guidance is to
exclude SQL Server's data, log, and backup file paths (and the `sqlservr.exe` process
itself) from real-time scanning.

## Key terms

| Term | Meaning |
|---|---|
| RAID 10 | Striped mirrors; strong read/write performance and redundancy, standard for data and log |
| RAID 5 | Striping with parity; space-efficient but a write penalty makes it a poor fit for the log |
| Volume isolation | Placing data, log, and tempdb on separate physical volumes to isolate I/O contention |
| AV exclusion | Excluding SQL Server's data/log/backup paths from real-time antivirus scanning |

## Check yourself

A new SQL Server build puts data, log, and tempdb all on one RAID 5 array to save cost.
Where specifically does this layout hurt the most, and what would you change first if you
could only change one thing?
