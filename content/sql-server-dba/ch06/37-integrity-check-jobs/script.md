# Script — Integrity Check Jobs

## Segment 1 (title)

DBCC CHECKDB validates the logical and physical integrity of every object in a database — allocation consistency, page structure, index and table consistency. It's the single most important corruption-detection tool a DBA has.

## Segment 2 (code: the real statement)

SQL Server doesn't proactively surface corruption. A corrupt page can sit undetected until a query happens to touch it, often long after your backup rotation has already carried that corruption into every backup you have.

## Segment 3 (steps: why it has to be scheduled)

Running CHECKDB on a schedule turns corruption into something you catch on your terms, with lead time to restore from a known-good backup before the corrupted one becomes the only copy left.

## Segment 4 (steps: cadence tradeoffs by size)

Small to medium databases can run a full CHECKDB nightly with no real cost. Multi-terabyte databases often can't fit that in a window, so the realistic compromise is a weekly full CHECKDB with a faster PHYSICAL_ONLY check on the nights between — or restoring the backup to a separate server and checking it there instead.

## Segment 5 (outro)

Next up: Ola Hallengren's maintenance scripts — the free, open-source, de facto industry standard that replaces most hand-built maintenance plans in real production environments.
