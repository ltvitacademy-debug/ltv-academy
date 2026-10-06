# Depreciation

**Chapter 2 · Running the Business · Lesson 15 of 25**

January's depreciation run processes every asset in LTV US Corporate Book — including FA-10452, exactly as lesson 14 capitalized it. This lesson turns last lesson's category mistake into a precise, calculable number.

## What you'll learn

- How Oracle Fusion Assets calculates a straight-line monthly depreciation charge
- The exact depreciation amount FA-10452 generates as currently configured
- What the correct amount would have been, and the size of the gap
- Why depreciation errors are consistent and recurring, not one-time

## Running January depreciation

Derek Shaw runs the standard monthly depreciation program for **LTV US Corporate Book**, period Jan-26. For a straight-line asset, the monthly charge is simply cost divided by useful life in months. FA-10452 depreciates based on whatever category it was capitalized under in lesson 14 — the program has no way to know that category was a mistake; it simply calculates correctly against the data it has.

## The calculation, as configured

- **Cost:** $145,000.00
- **Category (as entered):** Office Equipment, 5-year useful life = 60 months
- **Monthly depreciation:** $145,000.00 ÷ 60 = **$2,416.67**

This posts as: debit Depreciation Expense — Machinery & Equipment (7610), credit Accumulated Depreciation — Machinery & Equipment (1715), $2,416.67, under cost center 410 (the wrong cost center from lesson 14), Company 1000.

## The calculation, as it should have been

- **Cost:** $145,000.00
- **Category (correct):** Manufacturing Equipment — Machinery, 10-year useful life = 120 months
- **Monthly depreciation:** $145,000.00 ÷ 120 = **$1,208.33**

## The gap

$2,416.67 minus $1,208.33 leaves a difference of **$1,208.34** — January's depreciation expense is overstated by that amount, and it's booked in cost center 410 (Assembly) instead of 420 (Fabrication), where the machine actually runs. Nothing about this run fails or looks unusual: depreciation posts, Create Accounting picks it up, and the amount lands in the General Ledger looking like any other properly calculated charge.

## Why this keeps happening, not just once

A straight-line miscalculation isn't a one-time error the way a single wrong invoice amount would be — it repeats every single month FA-10452 stays miscategorized. By the time Chapter 3 investigates, this is one month deep; if it went uncorrected for a full year, the error would compound to over $14,500.00. Catching a depreciation miscategorization early, in the very first period it occurs, is exactly why Chapter 3 happens at January 31 instead of later.

## Key terms

| Term | Meaning |
|---|---|
| Straight-line depreciation | Cost divided evenly across an asset's useful life, in equal periodic charges |
| Depreciation program | The Oracle Fusion Assets process that calculates and generates the period's depreciation charge for every eligible asset in a book |

## Recap

FA-10452 depreciates at $2,416.67 for January as currently categorized, versus a correct $1,208.33 — a $1,208.34 overstatement, recurring every month it stays wrong, and booked to the wrong cost center besides. Next up, lesson 16: bank reconciliation, where January's statement surfaces the duplicate EFT payment from lesson 11.
