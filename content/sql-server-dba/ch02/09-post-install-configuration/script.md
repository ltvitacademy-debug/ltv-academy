# Script — Post-Install Configuration

## Segment 1 (title)

Setup finishing doesn't mean the instance is tuned. A short list of settings ships with out-of-box defaults built for works-everywhere, not for your specific production server, and skipping this checklist is a common reason a new install underperforms from day one.

## Segment 2 (code: Two settings, one query)

Max server memory ships effectively unlimited — set it explicitly, leaving headroom for the OS and any co-hosted services. Backup compression default ships off in most editions — turning it on gives smaller, often faster backups at the cost of a bit more CPU.

## Segment 3 (steps: Parallelism, tuned)

MAXDOP controls how many cores one query's parallel plan can use — commonly capped around 8 for OLTP workloads. Cost threshold for parallelism works alongside it, and its default of 5 is decades old and far too low for modern hardware — raising it to 25 or 50 is common practice.

## Segment 4 (steps: The single-file trap)

TempDB ships with a single data file by default, and every session on the instance shares it, causing allocation page contention. Current guidance is multiple equally-sized data files, roughly one per core up to about eight — equal sizing matters because proportional fill favors larger files.

## Segment 5 (outro)

Next up: instance configuration — sp_configure and the broader set of options every DBA should know.
