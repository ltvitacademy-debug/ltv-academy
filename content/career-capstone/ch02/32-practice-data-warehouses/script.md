# Script — Practice Questions: Data Warehouses

## Segment 1 (title)

Warehouse questions are one of the most heavily-tested single topics on DP-700. This lesson works through scenarios at exam difficulty, focused specifically on Fabric Warehouse.

## Segment 2 (code: SQL connection scenario)

A BI tool connecting over a standard SQL connection string, issuing T-SQL joins and window functions with strict schema needs, is a Warehouse — the full T-SQL surface, not a Lakehouse's read-only SQL endpoint subset.

## Segment 3 (steps: transactions and read/write asymmetry)

A Warehouse supports full multi-table transactions with rollback, matching traditional SQL Server behavior. A Lakehouse gets its guarantees from Delta Lake's per-table ACID transactions instead. And only a Warehouse's SQL endpoint supports INSERT, UPDATE, and DELETE — a Lakehouse's SQL endpoint is read-only.

## Segment 4 (outro)

That read/write asymmetry between Warehouse and Lakehouse SQL endpoints is one of the single most exam-tested facts in this domain. Next up: practice questions on Eventstreams and KQL.
