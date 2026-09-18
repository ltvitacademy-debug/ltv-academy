# Script — Task Dependencies

## Segment 1 (title)

A dragged dependency line in the Workflows UI sets one field: depends_on. By default it means "runs after success" — but that's only one of six real options.

## Segment 2 (code: six Run if conditions)

Beyond the default All succeeded, a task's Run if can be At least one succeeded, None failed, All done, At least one failed, or All failed — the last two build a real cleanup-or-alert task that runs because something broke.

## Segment 3 (code: fan-out fan-in)

Fan-out is one upstream task feeding several parallel downstream tasks. Fan-in is several upstream tasks all required before one downstream task starts. Both use the same depends_on field — just more entries in the list.

## Segment 4 (code: Excluded vs Failed)

A task whose Run if condition isn't met is marked Excluded, not Failed — skipped, and its own dependents cascade to excluded too. A genuinely failed task marks dependents Upstream failed instead, a meaningfully different status.

## Segment 5 (outro)

Six real conditions, two real patterns, one meaningful distinction. Next up: choosing job clusters versus all-purpose clusters for these tasks.
