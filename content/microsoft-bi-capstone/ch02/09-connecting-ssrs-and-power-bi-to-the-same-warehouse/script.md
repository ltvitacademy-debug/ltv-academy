# Script — Connecting SSRS & Power BI to the Same Warehouse

## Segment 1 (title)

Lesson 7 built an SSRS report. Lesson 8 built a Power BI dashboard. This lesson proves they're reading the exact same warehouse — not two separate copies quietly drifting apart.

## Segment 2 (screenshot: shared data source)

SSRS connects through a shared data source — a connection definition stored once on the report server and referenced by any report that needs it, rather than embedded per-report. Add a second report later, and it points at this same connection.

## Segment 3 (screenshot: navigator)

Power BI connects through its own SQL Server connector — a completely different mechanism, pointed at the exact same server, database, and tables: FactWorkOrder, DimProduct, DimDate.

## Segment 4 (steps: what single source of truth means)

Single source of truth isn't just "same server." It means neither tool defines its own version of a business rule — scrap rate is Scrapped Qty over Order Qty, computed identically in both an SSRS expression and a Power BI measure. The on-time definition compares the same two date columns in both tools. And the grain — one row per work order — is fixed in the warehouse before either tool touches it.

## Segment 5 (outro)

Next lesson turns "these should match" into an actual repeatable checklist — validating the full pipeline, end to end.
