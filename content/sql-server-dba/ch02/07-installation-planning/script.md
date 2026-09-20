# Script — Installation Planning

## Segment 1 (title)

Installing SQL Server is a design decision, not a next-next-finish wizard. Planning before setup.exe runs separates a smooth production rollout from a DBA fixing collation mismatches for the next two years.

## Segment 2 (steps: The expensive-to-change decisions)

Three decisions are expensive to change after go-live. Service accounts should be dedicated and least-privilege, ideally a domain gMSA. Collation determines sort order and comparisons for every database — changing it later means rebuilding system databases. File layout for data, log, and tempdb should be planned before install, not after.

## Segment 3 (code: Have a plan, verify after install)

Max server memory and MAXDOP are set post-install but should already have a plan — how much RAM to leave the OS, and how many cores a single query can use in a parallel plan. Sizing files for a year or two of growth avoids constant small autogrowth events from day one.

## Segment 4 (outro)

Get these right before install and the rollout is smooth. Next up: installing SQL Server — walking through setup.exe with that plan already in hand.
