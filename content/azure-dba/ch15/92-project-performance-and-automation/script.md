# Script — Project: Performance & Automation

## Segment 1 (title)

The environment's migrated and secured. Now the two problems left from Lesson 90: the 7-9am dispatch timeout, and years of manual maintenance nobody's actually kept up with.

## Segment 2 (steps: diagnosing the timeout)

Start with a baseline — what OrderManagement looks like outside 7-9am, so the window has something to compare against. Then check Azure Monitor and wait-stats DMVs for CPU, IO, and memory pressure during the actual window. Then check Query Store specifically for a regressed plan, because a regressed query and a maxed-out tier need two completely different fixes.

## Segment 3 (code: the Telemetry storage decision)

Telemetry is growing 50 gigabytes a month with no cross-database dependency. Partitioning it by date lets old data get compressed separately from the hot, recent range dispatch actually queries — doing that now, while it's still manageable, is far cheaper than doing it after the table is ten times the size.

## Segment 4 (steps: automation that replaces silent failure)

Scheduled maintenance jobs for indexes, statistics, and integrity checks, on a real schedule instead of whenever someone remembers. Alerts and operators so a failed job pages a person instead of failing silently for months. And Bicep, so the environment's own configuration is rebuildable from code — the concrete answer to the CFO's wish to stop buying hardware every four years.

## Segment 5 (outro)

Performance is diagnosed with an actual method, not a guess, and the maintenance that used to fail silently now pages someone. Next: the site actually goes dark, and you have to prove the disaster recovery plan works.
