# Script — Capstone: Install & Configure

## Segment 1 (title)

Discovery is done. Now you apply Chapters 1 through 4 to actually fix MERSQL01's foundation — none of it is glamorous, and none of it is optional.

## Segment 2 (code: separating the disk layout)

MERSQL01 has one drive holding everything. With infra's help you get four new volumes attached, and during a maintenance window — after taking a full and log backup — you take DispatchDB offline briefly and move its data file to D: and its log file to L:.

## Segment 3 (code: tempdb, one file per CPU)

tempdb was a single tiny file on the same crowded drive. MERSQL01 has four logical CPUs, so you give tempdb four equally sized data files on its own dedicated T: drive, with fixed megabyte growth instead of percent — the exact configuration Chapter 4 described.

## Segment 4 (steps: the maintenance window)

The whole window follows one order: back up first, then move and resize files and reconfigure tempdb, then cap max server memory so the engine leaves six gigabytes for the OS instead of fighting it for RAM.

## Segment 5 (outro)

Next up: with the foundation stable, it's time to lock down logins and put real maintenance jobs in place.
