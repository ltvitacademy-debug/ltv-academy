# Script — Project 2: Source Assessment and Migration Plan

## Segment 1 (title)

Three sources, three different grains, three different keys — decided by three different teams, years ago, with no coordination. That mismatch, not data volume, is the real migration risk.

## Segment 2 (code: the key conflict)

The order system's ID resets yearly and was never globally unique. The CRM's customer GUID is unique but unrelated to the order system's own text-entered names. Consolidating means building a conformed key across systems that never agreed to agree.

## Segment 3 (code: migration order by dependency)

Not by convenience, by dependency. Customers migrate first because everything else references them. Inventory is independent, safe in parallel. Orders migrate last, because it depends on the other two being correct first.

## Segment 4 (code: reconciliation before cutover)

Both old and new run in parallel, comparing totals nightly, until reconciliation holds clean for a full business cycle — only then does the actual cutover get scheduled.

## Segment 5 (outro)

A conformed key, a dependency-ordered migration, and a reconciliation check that has to pass before anything gets retired. Next up: building the actual target warehouse.
