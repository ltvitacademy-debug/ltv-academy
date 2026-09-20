# Script — Relational Concepts That Transfer vs. What Doesn't

## Segment 1 (title)

Relational database facts transfer across platforms; platform-specific detail doesn't. This lesson makes that split concrete, with specific examples on both sides, before Chapter 2 starts Oracle in earnest.

## Segment 2 (steps: what transfers)

ACID transactions, normalization theory, indexing tradeoffs, and operational discipline like measuring before you change something all transfer directly — they're facts about how relational databases work, not about how one vendor built their product.

## Segment 3 (code: what doesn't transfer)

System catalog names, backup tool syntax, and memory architecture terminology don't transfer. SQL Server's sys.databases has no direct equivalent by that name in Oracle, RMAN isn't BACKUP DATABASE with different keywords, and Oracle's SGA is not the buffer pool wearing a new label.

## Segment 4 (outro)

Next up: an honest, high-level comparison of SQL Server, Oracle, MySQL, and PostgreSQL to orient you before the platform-by-platform chapters begin.
