# Script — Diagnosing Warehouse & Permissions Problems

## Segment 1 (title)

Most "it just doesn't work" tickets boil down to three things: a suspended or queued warehouse, a role missing a privilege, or a resource monitor that shut compute down. All three are diagnosable with SQL in under a minute, once you know where to look.

## Segment 2 (steps: three failure modes)

A query that just sits there is almost always a warehouse problem, not a SQL problem. A blunt access-control error is a privileges problem. A warehouse that suddenly won't start, with nothing else changed, is usually a resource monitor doing exactly what it was configured to do.

## Segment 3 (code: warehouse state and load history)

SHOW WAREHOUSES gives you the state column — started, suspended, resizing. WAREHOUSE_LOAD_HISTORY goes further: a nonzero average queued load means queries were genuinely waiting on compute, not failing — the fix is a bigger warehouse or multi-cluster scaling, not rewriting the query.

## Segment 4 (code: grants)

For a privileges error, check SHOW GRANTS TO ROLE to see what the role can actually do, and SHOW GRANTS ON TABLE to see who has access to the specific object. And always check CURRENT_ROLE first — the most common real cause isn't a missing grant at all, it's running as the wrong role for the session.

## Segment 5 (code: resource monitors)

If a warehouse that worked yesterday won't start today, check SHOW RESOURCE MONITORS for credit quota versus used credits. A monitor firing isn't a bug — it did its job. The fix is raising the quota, waiting for reset, or splitting the workload, not just turning it off.

## Segment 6 (outro)

Next lesson: tying Query History, load diagnostics, and these three failure modes together in one realistic end-to-end scenario — the daily load didn't run, and here's how you'd actually find out why.
