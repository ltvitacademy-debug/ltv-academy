# Script — TempDB Contention

## Segment 1 (title)

TempDB is the one database every session on the instance shares — sort spills, hash join workspace, temp tables, version store rows. That shared nature makes it a uniquely common bottleneck, with a uniquely well-understood fix.

## Segment 2 (code: PAGELATCH waits)

When many sessions create and drop temp objects at once, they all need to update TempDB's allocation bitmap pages. That shows up as PAGELATCH_UP and PAGELATCH_EX — latches on a page already in memory, contention to access it, distinct from PAGEIOLATCH waits for a page being read from disk.

## Segment 3 (code: GAM, SGAM, PFS)

GAM pages track which extents are allocated at all, SGAM tracks mixed extents with free space, and PFS tracks how full each page is. A single one of these pages covers a huge number of data pages, so high-concurrency workloads with lots of small temp objects converge on the same physical pages.

## Segment 4 (code: the fix and the catch)

The standard fix is multiple TempDB data files instead of one, spreading allocation load across separate files — roughly one file per core up to about eight, then reassessing. But every file has to be the exact same size and growth setting, or SQL Server's proportional-fill algorithm favors whichever file has more free space, undoing the fix entirely.

## Segment 5 (outro)

Equally sized isn't a nice-to-have here — it's the whole mechanism the fix depends on. Next up: what happens when a query's memory grant itself becomes the bottleneck.
