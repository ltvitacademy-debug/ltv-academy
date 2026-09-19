# Script — Automating DBA Maintenance

## Segment 1 (title)

Chapters 8 and 9 taught index maintenance, statistics maintenance, DBCC CHECKDB, and finding resource bottlenecks — all things a DBA can run by hand once, but nobody wants to run by hand every week across dozens of databases.

## Segment 2 (code: don't reinvent this)

Almost nobody hand-writes their own maintenance scripts from zero. Ola Hallengren's Maintenance Solution is the real, widely-adopted, free standard the community has converged on — smart rebuild-versus-reorganize decisions, statistics updates, and integrity checks, all in well-tested procedures you install once and schedule.

## Segment 3 (code: sequencing matters)

Integrity check first — no point optimizing indexes on a corrupted database. Index maintenance second, which updates statistics as a side effect. Statistics maintenance third, catching anything index maintenance didn't touch. Running these out of order wastes work.

## Segment 4 (code: platform differences)

Azure SQL Database has limited native Agent support, so a lot of this applies most directly to Managed Instance or VM-hosted SQL Server. Azure SQL Database already automates much of this maintenance itself — a DBA's job there shifts toward verifying that automation is actually working.

## Segment 5 (outro)

Automate what Chapters 8-9 taught you to do by hand, in the right order, using the tools the community has already built. Next up: pulling Chapters 7-10 together into one real maintenance and monitoring strategy.
