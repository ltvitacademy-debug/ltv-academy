# Lesson 71 — Assessing SQL Server Before Migration

**Chapter 12 · Database Migration to Azure · Lesson 71 of 95**

## What you'll learn

- What the Data Migration Assistant (DMA) actually checks, at a conceptual level
- Why "compatibility issues" and "feature parity gaps" are different problems
- What sizing inputs turn into a real compute/storage tier recommendation

## The Data Migration Assistant's real job

The Data Migration Assistant is Microsoft's free, dedicated assessment
tool for exactly this step — and it's worth being precise about what it
actually reports, because "assessment" covers two genuinely different
kinds of finding:

- **Compatibility issues** — things that will actively break. A
  deprecated feature the source database uses, a blocking issue that
  prevents the migration itself from completing cleanly, a syntax
  construct the target doesn't support at all.
- **Feature parity gaps** — things that will keep working but behave
  differently, or that simply don't exist on the target. Cross-database
  queries and linked servers not existing in Azure SQL Database
  (Lesson 73) is a parity gap, not a compatibility break — the database
  migrates fine, but that specific capability doesn't come with it.

Confusing these two matters in practice: a compatibility issue blocks
the migration until it's fixed; a parity gap might just mean redesigning
one feature after the fact, or choosing Managed Instance instead
(Lesson 74) specifically because it doesn't have that gap.

## Sizing: the other half of assessment

Compatibility and parity answer "will this work at all." Sizing answers
"what should we actually pay for and provision." A real sizing pass
looks at:

- **Peak CPU and memory utilization** on the source server — not
  average, because average hides the actual bottleneck moment.
- **Storage size and growth trend** — not just today's size, but where
  it's headed over the next planning horizon.
- **IOPS and throughput requirements** — a database that's small but
  I/O-heavy needs a different tier than a large, mostly-idle one.

Those three inputs turn directly into a compute/storage tier
recommendation — the vCore or DTU choice from Lesson 9, now driven by
real measured numbers from the source server instead of a guess.

## Why this step can't be skipped

Skipping assessment and going straight to migration means finding
compatibility issues and parity gaps during the actual cutover — the
worst possible time, when a downtime window is already running.
Assessment turns those into a known list, addressed (or explicitly
accepted) before a single byte moves.

## Key terms

| Term | Meaning |
|---|---|
| Compatibility issue | A blocking problem that prevents a clean migration until fixed |
| Feature parity gap | A capability that doesn't exist on the target, without blocking the migration itself |
| Sizing | Measuring peak CPU/memory, storage growth, and IOPS to drive a real tier recommendation |

## Check yourself

Give one example of a compatibility issue and one example of a feature
parity gap, and explain why treating them the same way during planning
is a mistake.
