# Lesson 24 — Fixing and Validating Across All Three Deliverables

**Chapter 7 · Resolving the Discrepancy and Wrap-Up · Lesson 24 of 26**

## What you'll learn

- How to apply Lesson 23's one-character fix correctly, and where
- Why the fix happens only in Finance's workbook — never in the
  warehouse, Power BI, or Tableau
- How to re-run the full three-way validation from Lesson 22 and
  confirm it actually resolves
- Why documenting *why* a number changed matters as much as making
  the number change

## Applying the fix

The fix lives in exactly one place: Finance's `SUMIFS` formula.

```
=SUMIFS(
    Data[LineTotal],
    Data[OrderDate], ">=" & DATE(2013,7,1),
    Data[OrderDate], "<" & DATE(2013,10,1)
)
```

Every other quarter-total formula in this workbook that follows the
same pattern — if Finance built one per quarter, or one per territory
per quarter — needs the identical correction: whatever date marks the
start of the *next* period becomes an exclusive (`<`) upper bound, not
an inclusive (`<=`) one.

## Why the fix doesn't touch anything else

It's worth being explicit about what does **not** change:

| Deliverable | Changed? | Why |
|---|---|---|
| `dw.*` warehouse (Chapter 2) | No | Already used correct half-open logic via `dw.DimDate`'s discrete rows |
| Python validation (Chapter 3) | No | Validates row counts and keys, not quarter boundaries |
| Power BI (Chapter 4) | No | Already correct — never had this bug |
| Tableau (Chapter 5) | No | Already correct — never had this bug |
| Excel (Chapter 6) | **Yes** | This is the only place the bug actually lived |

This matters because it's the same **read-only consumer** principle
Lesson 2 established at the very start of this capstone: Finance found
a problem in *their own* deliverable, so Finance's own deliverable is
what gets fixed — nobody reaches back into the warehouse or either of
the other two tools to "fix" something that was never broken there.

## Re-running the three-way check

With the corrected formula in place, repeat Lesson 22's comparison:

1. Re-run the corrected `SUMIFS` formula and record the new total.
2. Compare it against Power BI's `[Total Sales (All Territories)]`
   and Tableau's `{ FIXED : SUM([Line Total]) }` for the same quarter.
3. Confirm all three now match exactly — not approximately, exactly.
   A quarter boundary fix should close the gap completely, not
   partially; if a gap of any size remains, the fix isn't finished.

## Documenting the fix

A number that silently changed is almost as risky as a number that
was silently wrong — anyone who saw last week's total needs to know
*why* this week's is different. Add a short note directly in the
workbook (a cell comment, or a dedicated "Change Log" sheet) stating:
what was wrong (inclusive upper bound double-counting the quarter's
first boundary day), when it was found, and what changed (`<=`
became `<`). This is the same discipline Lesson 7's late schema
change documented in T-SQL comments, now applied to a spreadsheet fix
instead of a warehouse change.

## Key terms

| Term | Meaning |
|---|---|
| Read-only consumer | A front-end that only queries the warehouse; a bug found in one consumer gets fixed in that consumer, not upstream |
| Exact match | Full agreement between independently-computed totals, with zero remaining gap — the real bar for "resolved," not an approximate closeness |
| Change log | A recorded explanation of what changed, why, and when, kept alongside the artifact it describes |

## Lab

1. Apply the one-character fix to your own `SUMIFS` formula.
2. Re-run the three-way comparison and confirm an exact match across
   Power BI, Tableau, and Excel.
3. Add a short documented note of the fix directly in your workbook.

## Check yourself

You're ready for Lesson 25 when you can state which single
deliverable actually got changed, explain why the warehouse and the
other two front-ends were correctly left untouched, and explain why
documenting the fix matters as much as making it.
