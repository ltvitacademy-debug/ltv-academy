# Lesson 22 — Lineage Case Study: A Revenue Report

**Chapter 5 · Applied Lineage · Lesson 22 of 25**

## What you'll learn

- A full, illustrative walkthrough of a wrong number on a revenue report, traced using everything from Chapters 1-4
- The problem → trace → impact → fix structure you'll reuse on real investigations
- How column-level lineage (Lesson 4) turns a vague suspicion into a specific, provable root cause
- Why the fix here is a lineage-documentation gap, not just a code bug

## The scenario (fictional, illustrative)

**Brightleaf Outfitters**, a fictional mid-sized outdoor-gear retailer, is used here purely as a realistic composite scenario to practice the full lineage workflow — not a real company, and not based on any specific real company's data or events.

## Problem

Finance flags that this month's revenue report shows $2.1M, but the point-of-sale system's own daily totals, added up by hand, come to roughly $2.3M. Nobody can immediately say where the $200K went missing — the report has looked "probably fine" for over a year, and nobody currently working on it built the original pipeline.

## Trace

The analyst pulls up the existing technical lineage record (Lesson 3) for the `NetRevenue` figure on the report and walks it hop by hop:

1. **Source**: `POS.Transactions` — every sale and return, recorded at checkout
2. **Extraction**: a nightly job loads yesterday's rows into `stg.Transactions_Raw`
3. **Transformation**: `stg.Transactions_Clean` computes `NetAmount = SaleAmount - ReturnAmount`, filtering out rows where `TransactionType = 'Voided'`
4. **Load**: `dw.FactSales.NetRevenue` sums `stg.Transactions_Clean.NetAmount` by month
5. **Report**: the executive dashboard's `NetRevenue` tile reads directly from `dw.FactSales`

Using column-level lineage (Lesson 4) rather than stopping at the table level, the analyst checks the actual filter condition in step 3 and finds it: `TransactionType = 'Voided'` was supposed to exclude only truly voided transactions, but a recent change to the POS system started tagging all **returns processed after store close** with that same `'Voided'` type — a POS-side labeling change nobody told the data team about. Those late returns were correctly excluded, but so were a batch of legitimate after-hours **sales** that happened to share a transaction batch ID with voided ones, due to a join condition in the same transformation step.

## Impact

Before touching anything, the analyst checks what else reads from `stg.Transactions_Clean` and `dw.FactSales.NetRevenue` (impact analysis, Lesson 14 — not yet built but previewed here): three other reports depend on the same transformation step, meaning this isn't a one-report bug — it's been quietly undercounting revenue, inventory depletion, and commission calculations for everyone downstream of that one `stg.Transactions_Clean` step.

## Fix

The transformation logic in step 3 is corrected to only exclude rows where the POS system's new, more specific `VoidReason` field is populated — not just rows tagged `'Voided'` broadly. Just as important: the lineage record itself gets updated to note the actual filter condition precisely (not just "excludes voided transactions"), and a note is added that this transformation depends on a POS-side field whose meaning changed once already — exactly the kind of fragile dependency Lesson 21 (maintaining lineage, from Chapter 4) warns about.

## Key terms

| Term | Meaning |
|---|---|
| Root cause | The specific hop and condition where a data problem actually originated, as opposed to where it was first noticed |
| Fragile dependency | A lineage hop that depends on an upstream field whose meaning can silently change without notice |

## Lab

Using the five hops listed in the Trace section, draw your own version of this lineage chain on paper — five boxes, four arrows. Mark which single hop was the actual root cause, and circle which other reports (from the Impact section) were silently affected by the same bug.

## Check yourself

Can you explain, without rereading the lesson, why checking the lineage at the *column* level (the specific filter condition) was necessary here, and a table-level arrow alone (`stg.Transactions_Clean → dw.FactSales`) would not have found the bug?
