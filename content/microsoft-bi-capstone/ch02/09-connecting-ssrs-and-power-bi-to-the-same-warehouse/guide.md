# Lesson 9 — Connecting SSRS & Power BI to the Same Warehouse

**Chapter 2 · Building the Full Stack · Lesson 9 of 25**

## What you'll learn

- Why "both tools point at the same tables" isn't a minor detail —
  it's the entire reason the warehouse from Lessons 5-6 exists
- How SSRS connects to the warehouse through a **shared data source**,
  and how Power BI connects through its own **Import** connection —
  two different mechanisms, one identical destination
- What "single source of truth" actually breaks if it's violated
- How to verify, concretely, that both tools are reading the same
  tables and computing the same logic

## The problem this lesson exists to prevent

Lesson 7 built an SSRS report against `dw.FactWorkOrder`. Lesson 8
built a Power BI dashboard against the same table. It would be
possible — and it happens constantly in real BI shops — to instead
give each tool its **own** copy: an extract for SSRS, a separate
extract for Power BI, each refreshed on its own schedule, each
computing scrap rate with its own slightly different expression.

That's how two reports that are both "right" end up disagreeing with
each other in front of a plant manager, and it's the single most
common reason a BI team loses the business's trust in its numbers.
This capstone's whole point is to avoid it by design.

## The SSRS side: a shared data source

`WorkOrderProductionSummary.rdl` connects to the warehouse through a
**shared data source** — a connection definition stored once on the
report server and referenced by any report that needs it, rather than
a connection string embedded inside the one report:

![The Report Builder dialog for pointing a report at a shared data source instead of an embedded connection.](/courses/microsoft-bi-capstone/ch02/09-connecting-ssrs-and-power-bi-to-the-same-warehouse/use-shared-connection-or-report-model.png)
*The same real Report Builder UI SSRS Development's data-source lessons cover — one connection, reused by every report that points at this warehouse.*

If a second SSRS report gets added later in this project (a
scrap-reason breakdown, say), it points at the **same** shared data
source — one connection string to maintain, one place to update if the
warehouse ever moves servers.

## The Power BI side: an Import connection

Power BI Desktop connects to the identical warehouse database through
its own SQL Server connector — a completely different mechanism from
SSRS's shared data source, but pointed at the exact same server,
database, and tables:

![The Power Query Navigator for a SQL Server connection, listing tables to import.](/courses/microsoft-bi-capstone/ch02/09-connecting-ssrs-and-power-bi-to-the-same-warehouse/navigator-desktop.png)
*The same Navigator dialog from Lesson 8 — `dw.FactWorkOrder`, `dw.DimProduct`, and `dw.DimDate`, selected here exactly as they're selected there.*

Two tools, two connection mechanisms, two refresh schedules — but the
same server, same database, same schema, same table names, same
column names, same grain.

## What "single source of truth" actually means here

It's not just that both tools query the same server. It's that neither
tool is allowed to define its own version of a business rule:

| Rule | Where it lives | Not allowed |
|---|---|---|
| Scrap rate | `ScrappedQty / OrderQty`, computed identically in both an SSRS expression and a Power BI `DIVIDE()` measure | A spreadsheet macro that recomputes it a third way |
| On-time definition | `EndDateKey <= DueDateKey`, in both tools | One tool using a different date column by mistake |
| Grain | One row per work order, in the warehouse, before either tool touches it | Either tool pre-aggregating before it reads the data |

If the warehouse's grain, keys, and column definitions are correct
once (Lessons 5-6), every downstream tool inherits that correctness
for free. If they're wrong once, every downstream tool inherits that
too — which is exactly why Lesson 10 exists.

## How to verify it, concretely

Confirming "same warehouse" isn't a matter of trusting the
architecture diagram — check it directly:

- Open both the SSRS report's data source properties and Power BI's
  Power Query source step, and confirm they name the same server and
  database.
- Pick one product, pull its scrap rate from the SSRS report, then
  pull the same product's scrap rate from the Power BI dashboard.
  They should match to the decimal.
- If they don't match, the bug is almost never in either report — it's
  in a filter, date range, or rounding difference between the two
  expressions. Lesson 10 turns this exact check into a repeatable
  checklist.

## Key terms

| Term | Meaning |
|---|---|
| Shared data source | An SSRS connection definition stored once and referenced by multiple reports |
| Single source of truth | The principle that a business number is defined once, in one place, and every consuming tool inherits that same definition |
| Grain | The level of detail one row represents — here, one row per work order, fixed in the warehouse before either tool reads it |

## Lab

1. Open `WorkOrderProductionSummary.rdl`'s data source properties and
   write down the server and database name it points to.
2. Open the Power BI dashboard's Power Query source step (Home →
   Transform Data → the source query) and write down its server and
   database name.
3. Confirm both match exactly.
4. Pick one product with more than a handful of work orders. Compute
   its scrap rate by hand from raw `Production.WorkOrder` rows, then
   compare it against both the SSRS report and the Power BI dashboard.
   All three should agree.

## Check yourself

You're ready for Lesson 10 when you can explain, specifically, what
goes wrong for a business when two reports quietly disagree, and you
can point to exactly where in this project's architecture that
disagreement is currently prevented from happening.
