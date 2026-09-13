# Script — Capstone: Performance, Monitoring & Presenting Your Project

## Segment 1 (title)

The final milestone: one real performance decision backed by evidence, a working Power BI connection you can justify, and a walkthrough you can actually give. This is also the last lesson of the entire course.

## Segment 2 (steps: performance, backed by evidence)

Not a checklist of every optimization — one decision, justified by Query Profile data you actually looked at. High partitions scanned against a query that always filters the same column points to a clustering key. Queueing under concurrent load points to warehouse sizing instead. Checking first is what picks the right one.

## Segment 3 (steps: Power BI, deliberately)

Not whichever mode happened to connect first. Import if your reporting tables are a comfortable size and near-real-time freshness doesn't matter. DirectQuery if your Streams and Tasks pipeline keeps data changing fast enough that Import's refresh lag would show stale numbers. Either way, be able to say why.

## Segment 4 (steps: the walkthrough, in order)

A live account is more convincing than a slide deck. The layering and the dimensional model first. Task history proving real incremental runs, and SHOW GRANTS proving the RBAC boundary is real. Then the performance evidence behind your one decision, and finally the Power BI report itself.

## Segment 5 (steps: what actually transfers)

None of this was really about Snowflake syntax in isolation — it was a workflow: load honestly, model without losing history, automate it, secure it, make it fast enough and connected well enough that someone trusts the number. That workflow transfers to any platform. If you're on the Analytics Engineer path, dbt is next — it takes this exact transformation layer and shows you how a real project organizes and version-controls it.

## Segment 6 (outro)

That's the Snowflake course — 60 lessons, 15 chapters, from architecture and virtual warehouses all the way to a live, secured, Power BI-connected pipeline you built yourself.
