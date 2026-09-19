# Script — Planning a SQL Server Migration to Azure

## Segment 1 (title)

Chapter 11 automated things that already existed in Azure. Chapter 12 gets something into Azure in the first place — a real production database moving from on-prem. Mess up an Elastic Job and you re-run it. Mess up a migration cutover and a business application is down. Planning first isn't caution here, it's the job.

## Segment 2 (steps: the planning order)

Three steps, in this order and no other: inventory what exists, every instance, database, and dependency, before anything else. Define success criteria — downtime tolerance, a performance floor, a cost ceiling — as concrete numbers before evaluating any target. Only then pick a target, because the right choice depends entirely on what the first two steps found.

## Segment 3 (code: starting the inventory)

The inventory step doesn't need new tools — it needs the system-catalog queries you already know from T-SQL Development, redirected toward a new purpose. One row per database, each one needing a plan before cutover.

## Segment 4 (outro)

Picking a target first is the most common planning mistake — teams choose the cheapest option, discover a dependency mid-migration, and end up re-planning. Next up: what the Data Migration Assistant actually does, and sizing a database for the move.
