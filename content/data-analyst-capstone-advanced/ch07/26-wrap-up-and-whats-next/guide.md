# Lesson 26 — Wrap-Up: What You Built, and What's Next

**Chapter 7 · Resolving the Discrepancy and Wrap-Up · Lesson 26 of 26**

## What you'll learn

- A full, honest recap of everything this capstone actually built,
  end to end
- Why the Chapter 7 discrepancy was the real test of this capstone's
  architecture, not a detour from it
- How this capstone connects to the rest of the Data Analyst → BI
  Engineer path
- What a genuinely senior version of this same QBR request would add
  next

## Everything you built

| Layer | What it is | Chapter |
|---|---|---|
| Warehouse | `dw.FactProductSales` + four dimensions, a real T-SQL star schema built from AdventureWorks2012 | 2 |
| Validation | A pandas script checking row-count parity, nulls, duplicates, and orphaned keys, scheduled nightly and logged to `dw.DataQualityLog` | 3 |
| Executive front-end | A Power BI model and two-page dashboard, published with a gateway-driven scheduled refresh | 4 |
| Board front-end | A Tableau workbook connected live to the same warehouse, formatted and published to Tableau Public | 5 |
| Finance front-end | An Excel workbook built from a flattened CSV export, with a PivotTable and a `SUMIFS` reconciliation | 6 |
| The real test | A genuine cross-tool discrepancy, found, diagnosed, fixed, and re-validated | 7 |

Every one of these pieces is real: real AdventureWorks2012 tables, real
T-SQL, real pandas, real DAX, real Tableau LOD expressions, real Excel
formulas — nothing in this capstone was simulated or faked to make
the story work.

## Why Chapter 7 was the point, not a detour

It would be easy to look back at this capstone and describe Chapters
2 through 6 as "the real work" and Chapter 7 as an unplanned problem
that came up along the way. That's backwards. The entire reason this
capstone built three independent front-ends on one shared warehouse,
instead of one dashboard screenshotted three ways, was to make a
moment exactly like Chapter 7 possible — catching a real, specific
error *because* three independent paths to the same number existed to
disagree with each other. If Chapter 7 had never happened, the
architecture's value would have been real but invisible. Because it
did happen, you got to see, directly, what a shared source of truth
actually buys a business.

## Where this fits in the bigger path

This Advanced capstone is the third and final tier of a three-part
capstone sequence for the Data Analyst → BI Engineer path, building on
the Beginner and Intermediate tiers' own work for the same fictional
company, Thornbury Cycle Supply Co. Where the Beginner tier introduced
a single clean report and the Intermediate tier introduced a
week-over-week comparison with its own discrepancy to resolve, this
Advanced tier is the first to genuinely operate at the scale a real BI
engineer's role actually reaches: multiple tools, an automated
validation layer, and a cross-functional audience with real,
different needs.

## What a genuinely senior version of this would add next

Finishing this capstone doesn't mean every real-world version of this
problem is solved. A senior analyst or BI engineer facing this exact
scenario in a real role would likely push further in directions this
capstone deliberately scoped out:

- **Automated reconciliation**, not a manual quarterly check — a
  script comparing all three tools' totals on the same schedule as
  Chapter 3's data-quality checks, alerting on any gap above a small
  tolerance
- **Row-level lineage**, tracing a specific dollar figure in any
  front-end back to its exact source rows in AdventureWorks2012, for
  audit purposes
- **A formal change-management process** for the kind of late schema
  change Chapter 2 handled once, so the next one follows a documented
  procedure instead of an improvised one

None of these were in scope for this capstone, and that's a deliberate
choice, not an oversight — but naming them honestly is itself part of
the job this capstone has been teaching throughout.

## Key terms

| Term | Meaning |
|---|---|
| Source of truth | The single underlying dataset every downstream deliverable is built to agree with |
| Lineage | The traceable path from a reported number back to its original source data |

## Lab

1. Write a two-paragraph summary of this capstone, in your own words,
   as if explaining it to someone who hasn't seen it — what was
   built, and what Chapter 7 proved about why it was built that way.
2. Pick one of the three "what's next" items above and sketch, in a
   few sentences, how you'd actually start building it.

## Check yourself

This capstone — and the Data Analyst → BI Engineer path's core
sequence — is complete when you can explain, without notes, why this
capstone built three front-ends on one warehouse instead of one
dashboard, and what Chapter 7 actually demonstrated about the value of
that decision.
