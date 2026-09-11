# Lesson 11 — Handling a Late Schema Change

**Chapter 2 · Building the Full Stack · Lesson 11 of 25**

## What you'll learn

- The scenario: `ShiftCode` gets added to `Production.WorkOrder` in
  the source system, after this pipeline is already built and running
- The five places a schema change like this actually has to be
  touched, in order, and why skipping one breaks something downstream
- How to decide whether a new column belongs on the fact table or on a
  new dimension — a real modeling decision, not a formatting one
- Why this is the most realistic "production incident" this capstone
  simulates, and how Lesson 10's checklist is what catches it

## The scenario

Midway through a real BI project, the source system changes. Here,
the plant adds a `ShiftCode` column to `Production.WorkOrder` —
tracking which shift (`Day`, `Swing`, `Night`) ran each work order,
something the business now wants to report on:

```sql
ALTER TABLE Production.WorkOrder
ADD ShiftCode CHAR(1) NULL;
```

This single, small `ALTER TABLE` is where the change originates. From
here, it has to ripple through every stage this capstone already
built — and the point of this lesson is that it can, without breaking
any of the four pieces already in production.

## Where ShiftCode belongs: fact, or new dimension?

Before touching any code, this is a real dimensional-modeling
decision, not a formatting one. `ShiftCode` is a low-cardinality
descriptive attribute — three or four fixed values — describing a
*characteristic* of the work order, the same shape as
`Production.ScrapReason` already modeled as `dw.DimScrapReason`.

That points at a new **`dw.DimShift`** dimension (Type 0, since a
shift code doesn't change once assigned), with a new `ShiftKey`
foreign key added to `dw.FactWorkOrder` — not a raw `ShiftCode` column
added directly to the fact table. Storing the raw code on the fact
table would work today, but it duplicates the same descriptive-text
problem this course's earlier warehousing lessons already ruled out:
if the business later wants "Day" renamed to "First Shift" everywhere,
a bare fact-table column means updating every historical row instead
of updating one dimension row once.

## The five-stop ripple

Once the modeling decision is made, the change has exactly five real
stops, in this order:

| Stage | What changes |
|---|---|
| 1. `stg.WorkOrder` | Add a `ShiftCode` column to the staging table, matching the source |
| 2. SSIS package mapping | `WorkOrderETL.dtsx`'s Data Flow Task adds a mapping from the new source column to the new staging column |
| 3. Warehouse | Add `dw.DimShift` (new dimension); add `ShiftKey` to `dw.FactWorkOrder` (new FK, nullable until backfilled) |
| 4. SSRS report | Add `ShiftCode`/`ShiftName` as an optional row group or parameter on `WorkOrderProductionSummary.rdl` |
| 5. Power BI model | Import `dw.DimShift`, relate it to `FactWorkOrder` on `ShiftKey`, add it to relevant visuals |

Each stop only works because the one before it already landed. Adding
the SSIS mapping before the staging column exists fails immediately;
adding the report's parameter before the warehouse column exists just
produces blanks.

## Why nothing already in production breaks

This is the actual payoff of building the pipeline the way Lessons 3-9
did:

- The staging and warehouse changes are **additive** — a new nullable
  column and a new dimension, not a change to any existing column's
  type or meaning. Every existing report and dashboard keeps working
  unmodified, because nothing they already depend on moved.
- `WorkOrderProductionSummary.rdl` and the Power BI dashboard don't
  *have* to add `ShiftCode` immediately — they can ship the change
  later, on their own schedule, because the warehouse change doesn't
  force an immediate change in either consuming tool.
- Historical rows loaded before this change simply get `ShiftKey =
  NULL` (or a resolved "Unknown Shift" member, if you want to avoid
  nulls in a fact table's FK column) — a normal, expected state for a
  Type 0 dimension backfilled after the fact.

## Re-running Lesson 10's checklist

After making this change, Lesson 10's four checks run again, exactly
as written, with one addition: confirm `ShiftKey` on
`dw.FactWorkOrder` either resolves to a real `dw.DimShift` row or is
legitimately `NULL` for pre-change historical rows — not silently
wrong for rows that should have a shift.

## Key terms

| Term | Meaning |
|---|---|
| Late schema change | A source-system structural change discovered after a pipeline is already built and running |
| Additive change | A schema change that adds new nullable columns or new tables without altering the meaning of anything that already exists |
| DimShift | The new Type 0 dimension this lesson adds, modeling the ShiftCode reference attribute |

## Lab

1. Write the `ALTER TABLE` statement adding `ShiftCode` to
   `Production.WorkOrder`, and the matching one for `stg.WorkOrder`.
2. Sketch `dw.DimShift`'s columns (`ShiftKey`, `ShiftCode`,
   `ShiftName`) and the new `ShiftKey` FK on `dw.FactWorkOrder`.
3. List, in order, the five stops this change has to pass through,
   and one sentence for each explaining why it can't be skipped.
4. Re-run Lesson 10's four validation checks (conceptually, or for
   real if your build has progressed that far) against the changed
   schema, plus the added `ShiftKey` orphan check.

## Check yourself

You're ready for Lesson 12 when you can explain why `ShiftCode`
becomes a new dimension instead of a raw fact-table column, list the
five-stop ripple in order from memory, and explain why an additive
schema change doesn't force SSRS or Power BI to change on the same day
the warehouse does.
