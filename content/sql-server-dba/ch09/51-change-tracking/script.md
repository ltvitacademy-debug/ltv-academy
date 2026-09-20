# Script — Change Tracking

## Segment 1 (title)

The last two lessons tracked schema changes. This one tracks data changes — knowing which rows changed, and SQL Server ships two distinct features for it.

## Segment 2 (code: Change Tracking)

Change Tracking answers a narrow question: which rows changed. Enabled per database and per table, it tracks primary keys with a version number — lightweight, but it doesn't store the actual old and new values, only that a row changed.

## Segment 3 (steps: Change Data Capture)

Change Data Capture answers a broader question: what exactly changed, to what values. It reads the transaction log via an Agent job and writes full before and after row images to change tables — heavier, but right for auditing, compliance, and warehouse loads.

## Segment 4 (outro)

Tracking what changed only matters if the schema doesn't quietly drift from what source control says it should be. Next up: database documentation.
