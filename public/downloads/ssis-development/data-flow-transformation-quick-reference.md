# Data Flow Transformation Quick Reference

A side-by-side cheat sheet for the transformations this course covers in Chapters 4 and 7 —
pull this up while you're configuring one of them, instead of rereading a whole lesson.

## Lookup Transformation (Chapter 4, Lesson 19)

| Cache mode | When to use it | Trade-off |
|---|---|---|
| Full cache | Reference table is small/medium and doesn't change mid-run | Fastest per-row lookups; one point-in-time snapshot loaded before the Lookup runs |
| Partial cache | Reference table is large; only a subset of keys actually get looked up | Caches rows as they're looked up; least-used entries get evicted |
| No cache | Reference data changes constantly and every lookup must see the current value | Slowest — queries live, every single row |

- Three outputs: **Match**, **No Match**, **Error**. By default, No Match is treated as an error —
  you must explicitly set "redirect rows to no match output" to handle it separately.
- Lookups are **case sensitive** and support **composite joins** (more than one column at once).
- If the reference dataset has multiple matching rows, only the **first** match is returned —
  never a fan-out.

## Conditional Split (Chapter 4, Lesson 20)

- Works like a CASE statement: conditions evaluate **top to bottom**, and the row goes to the
  **first** one that evaluates true. Every remaining condition is skipped for that row.
- A **default output** is required — every row goes to exactly one output, never zero, never more
  than one.
- Ordering gotcha: if you need a "high" and "medium" tier, put the **narrower/higher** condition
  first (`Total > 1000`) and the broader one second (`Total > 100`) with no upper bound — order
  already filtered out the high rows by the time the second condition is checked.

## Derived Column (Chapter 4, Lesson 21)

Four expression patterns you'll reach for constantly:

```
FullName    = FirstName + " " + LastName
Initial     = SUBSTRING(FirstName,1,1)
TaxRounded  = ROUND(SalesTax, 2)
OrderYear   = DATEPART("year", GETDATE())
```

- Choose **add as new column** vs. **replace** per expression — both run the same expression,
  only the destination differs.
- An expression that references a column the *same* transformation is also replacing still sees
  the **original, pre-derived** value, not the value about to be written.
- New-column data type/length/precision is auto-inferred and read-only; always check the inferred
  type before wiring it into a strongly-typed destination.

## Slowly Changing Dimension Transformation (Chapter 7, Lesson 37)

| Attribute type | Behavior | Example |
|---|---|---|
| Fixed | Value should never change; a change is flagged as an error | A customer's original signup date |
| Changing (Type 1) | Overwrite the old value in place, no history kept | A corrected name spelling |
| Historical (Type 2) | Expire the old row, insert a new current row | A customer's address, if you need to report on what it used to be |

- The **SCD Wizard** generates the whole supporting data flow for you: `OLE DB Command`
  components for in-place updates, a `Derived Column` to stamp expiration dates on historical
  rows, and a `Union All` feeding one shared destination.
- An **inferred member** is a minimal placeholder dimension row created when a fact row
  references a key that doesn't exist yet — skip this option if the dimension is always loaded
  before any fact that references it.

## Incremental load pattern, assembled from the above (Chapter 7, Lesson 36)

```
Read watermark -> Extract delta (WHERE changed_col > watermark)
   -> Lookup (business key) -> Conditional Split (Match -> update, No Match -> insert)
   -> Save new watermark
```

This is not a single component — it's Lookup + Conditional Split wired together, the same two
transformations from this page, doing a job neither one does alone.
