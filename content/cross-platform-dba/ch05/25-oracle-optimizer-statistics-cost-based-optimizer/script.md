# Script — Oracle Optimizer Statistics & the Cost-Based Optimizer

## Segment 1 (title)

Reading Oracle Execution Plans showed you a decision the optimizer already made. That decision comes from the Cost-Based Optimizer, and it's only as good as the statistics feeding it.

## Segment 2 (code: DBMS_STATS)

DBMS_STATS is the supported way to gather optimizer statistics — not ANALYZE TABLE, which is legacy. You can gather stats for one table, an entire schema, or let Oracle decide with method_opt set to FOR ALL COLUMNS SIZE AUTO, which adds histograms where the data actually needs them.

## Segment 3 (steps: what cost is estimated from)

Cost is an estimate, not a fact. The CBO leans on row counts, distinct values, and histograms that capture skew a simple average would hide. Stale statistics don't just produce a slower plan — they can produce a fundamentally wrong one, like a nested loop built for ten rows that actually has to process a million.

## Segment 4 (code: automatic job isn't always enough)

Oracle runs an automatic statistics job in the nightly maintenance window, refreshing tables that changed enough to matter. That handles routine drift, but after a huge one-time load or a truncate-and-reload, don't wait for it — gather statistics deliberately, right away, before the next query builds a plan on stale numbers.

## Segment 5 (outro)

Statistics tell the optimizer what to expect ahead of time. Next up: the tools Oracle gives you to see what actually happened after the fact — AWR and ASH.
