# Script — Assessing SQL Server Before Migration

## Segment 1 (title)

The Data Migration Assistant is Microsoft's free assessment tool for exactly this step, and it reports two genuinely different kinds of finding: compatibility issues, things that will actively break, and feature parity gaps, things that keep working but behave differently or don't exist on the target at all.

## Segment 2 (steps: compatibility vs parity)

Confusing the two matters in practice. A compatibility issue blocks the migration until it's fixed. A feature parity gap — like cross-database queries not existing in Azure SQL Database — doesn't block anything, it just means redesigning a feature, or picking a target that doesn't have that gap.

## Segment 3 (steps: sizing)

Compatibility and parity answer whether it'll work at all. Sizing answers what to actually provision — peak CPU and memory, not average, storage growth trend, not just today's size, and IOPS requirements, since a small I/O-heavy database needs a different tier than a large idle one.

## Segment 4 (outro)

Skipping assessment means finding these issues during the actual cutover — the worst possible time. Assessment turns them into a known list, addressed before a single byte moves. Next up: online versus offline migration — the real trade-off you present to the business.
