# Script — Partitioning Strategies · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Lesson 8 fixed the fact table's grain and shape. Now it needs to actually live somewhere at ten billion rows — partitioning is how one logical table splits into physical chunks a query engine can read selectively.

## S2 · CODE CARD (partition by date)

Most fact tables get partitioned by date, because most queries filter by a date range. This lines the physical layout up with how the table actually gets queried — the same rule DE Foundations already taught for choosing a partition column.

## S3 · CODE CARD (partition pruning)

Partition pruning means the query engine skips folders it can see can't match, without opening a single file inside. At this scale, that's the difference between scanning the whole table and scanning one month of it.

## S4 · CODE CARD (the real trade-off)

Too many tiny partitions, and pruning barely helps while small-file overhead piles up. Too few, oversized ones, and pruning can't narrow a query down at all. Date-level partitioning usually lands in between, matching the real query pattern.

## S5 · OUTRO CARD

Partitioning splits a table up within one storage system. Next up: sharding — what happens when one storage system isn't enough on its own.
