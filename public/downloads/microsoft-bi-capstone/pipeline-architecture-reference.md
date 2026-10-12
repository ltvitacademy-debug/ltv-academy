# WorkOrder Pipeline Architecture Reference

A one-page reference for this capstone's real architecture, decided in
Lesson 2 and built across Lessons 3-11. Keep this open while you build
— every lesson from Chapter 2 on references these exact object names.

## The five-tool pipeline

| Stage | Object | Role |
|---|---|---|
| Source | `Production.WorkOrder`, `Production.Product`, `Production.ScrapReason` (`AdventureWorks2012`) | Raw, untouched source data |
| Staging | `stg.WorkOrder` | Raw landing copy — no transformation yet |
| ETL | `WorkOrderETL.dtsx` | The SSIS package moving data from staging into the warehouse |
| Warehouse (fact) | `dw.FactWorkOrder` | One row per work order — an accumulating snapshot |
| Warehouse (dimensions) | `dw.DimProduct`, `dw.DimScrapReason`, `dw.DimDate` | What the fact table's foreign keys point to |
| Reporting | `WorkOrderProductionSummary.rdl` | An SSRS paginated report, grouped by product |
| Visualization | A Power BI report reading `dw.FactWorkOrder` directly | Trend and comparison visuals a paginated report isn't built for |

## The grain

**One row per work order.** Every column added to `dw.FactWorkOrder`
has to be true at that grain. Every candidate dimension has to join to
it at that grain without fanning rows out or collapsing them.

## Key modeling decisions, at a glance

| Decision | What it is | Why |
|---|---|---|
| `dw.FactWorkOrder` is an **accumulating snapshot** | Inserted when a work order starts, updated as it progresses, completed when it ends | A work order has a defined lifecycle (start → progress → end) rather than a single instant — unlike a transaction fact |
| Three FKs, one `DimDate` table | `StartDateKey`, `EndDateKey`, `DueDateKey` all reference the same physical `dw.DimDate` | A **role-playing dimension** — building three separate date tables would triple the maintenance cost of a table that never changes shape |
| `WorkOrderID` stays on the fact table | A **degenerate dimension** — no separate one-column dimension table | It identifies the row itself and has no other attributes worth modeling separately |
| `dw.DimProduct` is Type 1 | Overwritten in place, no history | This capstone's reporting doesn't need to track how a product's name changed over time |
| `dw.DimScrapReason` is Type 0 | Small, essentially static reference data | `Production.ScrapReason` rarely changes; there's no SCD logic to apply |
| `Production.Location` is **out of scope** | No `LocationKey` on the fact table | It lives at the `WorkOrderRouting` (operation) grain — one level finer than the work-order grain this fact table chose. Attaching it would either fan the fact table out or force an arbitrary "pick one location" rule |

## Nullable columns, and why

| Column | Nullable? | Why |
|---|---|---|
| `ScrapReasonKey` | Yes | Most work orders scrap nothing — there's no reason to resolve |
| `EndDateKey` | Yes | `NULL` until the work order actually finishes — that's what makes this an *accumulating* snapshot rather than a row inserted only once it's already complete |
| `ProductKey`, `StartDateKey`, `DueDateKey` | No | Every work order has a product, a start date, and a due date the moment it's created |

## The accumulating-snapshot load sequence

1. **Insert** the moment a work order starts. `StartDateKey` and
   `DueDateKey` are known; `EndDateKey` is `NULL`; `StockedQty` and
   `ScrappedQty` are both `0`.
2. **Update** that same row as production progresses — `StockedQty`
   and `ScrappedQty` increase on the existing row. This table is not
   insert-only.
3. **Complete** the row once the work order ends — `EndDateKey` gets
   filled in, and the quantities reach their final values.

## The five-stop change ripple (for any future schema change)

When a new column shows up in the source system after this pipeline
is already live (Lesson 11's `ShiftCode` scenario is the worked
example), it has to pass through these five stops, in this order —
skipping one breaks whatever comes after it:

1. **`stg.WorkOrder`** — add the new column, matching the source.
2. **SSIS package mapping** — map the new source column into the new
   staging column.
3. **Warehouse** — add a new dimension if the column is a descriptive
   attribute (not a raw column bolted onto the fact table), plus the
   new nullable FK on `dw.FactWorkOrder`.
4. **SSRS report** — add the new attribute as an optional row group or
   parameter.
5. **Power BI model** — import the new dimension, relate it, add it to
   the relevant visuals.

A genuinely additive change (new nullable column, new dimension) never
forces an *immediate* change in SSRS or Power BI — both can ship the
addition on their own schedule, because nothing either tool already
depends on moved.

## Validating the pipeline

Four checks, re-run after every change — the full queries live in
`workorder-pipeline-validation-checks.sql` in this same resource vault:

1. **Row-count parity** — source, staging, and fact row counts match.
2. **No orphaned keys** — every FK on the fact table resolves to a
   real dimension row (or is a legitimate `NULL`).
3. **Cross-tool agreement** — the same product's scrap rate, computed
   in raw SQL, in the SSRS report, and in the Power BI dashboard, all
   agree to the decimal.
4. **Dates in range** — the warehouse's date range matches what the
   source data actually covers.

## Single source of truth

Neither SSRS nor Power BI is allowed to define its own version of a
business rule. Both read `dw.FactWorkOrder` and its dimensions
directly, and both compute scrap rate and the on-time definition the
same way the warehouse's grain and keys already guarantee:

| Rule | Definition | Lives in |
|---|---|---|
| Scrap rate | `ScrappedQty / OrderQty` | The warehouse's grain — both tools just sum and divide it the same way |
| On-time | `EndDateKey <= DueDateKey` | Both tools compare the same two columns |
