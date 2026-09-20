# Script — Storage Best Practices

## Segment 1 (title)

This lesson pulls together random versus sequential I/O, tempdb's shared nature, and growth behavior into concrete storage recommendations for standing up or reviewing a real layout.

## Segment 2 (steps: separate volumes)

Data files, log files, and tempdb each have a distinct I/O profile. Where possible, give each its own physical volume or a genuinely separate LUN — that isolates contention between them and means a problem on one volume doesn't take down the others.

## Segment 3 (code: RAID tradeoffs)

RAID 10 is the standard recommendation for both data and log — strong read and write performance with real redundancy. RAID 5's parity penalty makes it a poor fit for the write-heavy log, though it's fine for read-heavy data. And don't forget antivirus exclusions on the data, log, and backup paths.

## Segment 4 (outro)

Good storage layout is cheap insurance against both slow queries and slow disasters. Next up: disk layout for SQL Server — putting it all together into one recommended drive map.
