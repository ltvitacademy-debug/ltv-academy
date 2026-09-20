# Script — SQL Server Upgrade Planning

## Segment 1 (title)

Chapter eleven is upgrades and patching. First up: planning a major-version upgrade before you touch production.

## Segment 2 (code: A separate dial from the version)

The physical version and a database's compatibility level are two different dials. After an in-place upgrade, databases keep their old compatibility level by default. That's deliberate — a new level activates a new optimizer and cardinality estimator, which can cause plan regressions. You get the new engine's fixes immediately, and raise compatibility level later as its own tested step.

## Segment 3 (steps: Two real upgrade paths)

There are only two real upgrade paths. In-place upgrade replaces the binaries on the existing instance — fast, but risky, with no easy rollback. Side-by-side migration stands up a new instance and moves databases over with backup and restore, keeping the old instance as a fallback. Before either, run Microsoft's Data Migration Assistant to assess deprecated features and breaking changes.

## Segment 4 (outro)

Side-by-side is the default for anything business-critical. Next up: patching strategy — Cumulative Updates, cadence, and how to check your current build.
