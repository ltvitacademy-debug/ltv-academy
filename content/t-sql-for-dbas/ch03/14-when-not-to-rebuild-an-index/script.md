# Script — When Not to Rebuild an Index

## Segment 1 (title)

Lesson 11 gave the documented fragmentation thresholds. This lesson is the judgment layer on top: the real tradeoffs that make "just rebuild it" the wrong answer more often than the thresholds alone suggest.

## Segment 2 (code: a rebuild has a cost too)

Alter index rebuild is a fully logged operation. Rebuilding a large index generates a large amount of transaction log, which competes directly with the application's own writes for log-drive I/O — on a busy table during business hours, that can cause exactly the slowness a DBA is meant to prevent.

## Segment 3 (code: ONLINE = ON isn't free)

ONLINE equals ON lets reads and writes continue through most of the operation instead of taking a table-level lock. But it still takes a brief schema-modification lock at the start and end, and it adds its own tempdb and log overhead from row versioning. Online describes concurrency, not resource cost.

## Segment 4 (steps: check before you rebuild)

Before rebuilding anything in production, check current load, whether the log file has room to grow without triggering autogrowth mid-operation, and whether this can genuinely wait for the maintenance window. Reorganizing now and rebuilding later is often the correct call, not a compromise.

## Segment 5 (outro)

Fragmentation thresholds tell you what's possible; judgment tells you when. Next up: Chapter Four begins, finding open transactions — the sessions holding locks open longer than they should.
