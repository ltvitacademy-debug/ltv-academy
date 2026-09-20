# Script — Patching Strategy

## Segment 1 (title)

Lesson 61: patching strategy. For modern SQL Server, patching means one thing — Cumulative Updates.

## Segment 2 (code: What are you actually running?)

Before deciding whether to patch, check what you're actually running. @@VERSION is quick but returns one string. SERVERPROPERTY gives you structured, scriptable values — ProductVersion, ProductLevel, and the CU level — so you can compare against Microsoft's published build list and confirm a patch actually took.

## Segment 3 (steps: One patching mechanism, one cadence)

Service Packs were phased out after SQL Server 2016 — Cumulative Updates are the whole patching lifecycle now, and each CU is fully cumulative. Never let production be the first place a new CU runs — test and staging first, with a soak period. And don't let a supported instance drift more than a CU or two behind current.

## Segment 4 (outro)

That test-first discipline only works if you actually know how to test an upgrade. Next up: testing upgrades — restoring to staging, replaying workload, and comparing plans with Query Store.
