# Lesson 18 — Depreciation Adjustments

**Chapter 4 · Depreciation and Adjustments · Lesson 18 of 33**

## What you'll learn

- Why a change to an asset after depreciation has already started creates a catch-up problem
- The two ways Oracle Fusion Assets can handle that catch-up: amortized versus expensed
- How to work through both options on the same example
- Why the choice between them is a real accounting decision, not a system default to accept blindly

## The catch-up problem

An asset doesn't always get everything right on day one. Maybe its life was entered as 10 years when it should have been 8, or its method needs to change, discovered two years into depreciation. The moment you correct something that affects the depreciation calculation **after** periods have already closed with the old numbers, Oracle Fusion Assets faces a real question: what happens to the depreciation that *would have been* taken under the corrected numbers, for all those already-closed periods?

This is the catch-up problem, and Oracle Fusion Assets gives you two ways to resolve it.

## Amortized versus expensed adjustment

- **Amortized adjustment** — spreads the catch-up amount across the asset's **remaining** life, rather than hitting the current period all at once. This keeps the depreciation expense pattern smoother, avoiding a sudden spike.
- **Expensed adjustment** — recognizes the entire catch-up amount immediately, in the current open period, as a one-time adjustment to depreciation expense.

## Working through an example

Meridian Fabrication Co. has a machine with a $100,000 cost, originally set up with a 10-year straight-line life and no salvage value ($10,000/year). Two years in, after $20,000 of depreciation has been taken, Meridian discovers the life should have been 8 years all along ($12,500/year, since $100,000/8 = $12,500). At the 8-year rate, $25,000 *should* have been taken in those same two years — a $5,000 shortfall.

```
Original life: 10 years -> $10,000/year
Corrected life:  8 years -> $12,500/year

Depreciation taken (2 years, old rate):   $20,000
Depreciation that should have applied
  (2 years, corrected rate):              $25,000
Catch-up shortfall:                        $5,000
```

Under an **expensed** adjustment, that entire $5,000 hits depreciation expense in the current period, all at once — a visible bump. Under an **amortized** adjustment, that $5,000 is instead spread across the asset's remaining 6 years, adding roughly $833 per year on top of the new $12,500 going forward, smoothing the correction into future periods instead of front-loading it.

## This is an accounting decision, not a technicality

Which option to use isn't arbitrary. A company's accounting policy, its auditors, and sometimes the specific circumstances of the correction (a genuine estimate change versus an outright data-entry error) drive whether a catch-up should hit the income statement immediately or smooth in over time. This is exactly the kind of decision an implementation documents up front, rather than leaving every accountant to choose case by case.

## Key terms

| Term | Meaning |
|---|---|
| Catch-up depreciation | The difference between what was actually depreciated and what should have been depreciated under corrected information |
| Amortized adjustment | Spreading a catch-up amount across an asset's remaining life |
| Expensed adjustment | Recognizing a catch-up amount entirely in the current period |

## Lab

Using Meridian's machine ($100,000 cost, corrected from a 10-year to an 8-year life, two years of depreciation already taken), calculate the catch-up shortfall yourself from scratch, then write one sentence on which adjustment type you'd recommend if Meridian's policy strongly favors smooth, predictable expense from quarter to quarter.

## Check yourself

Without looking back, can you explain the catch-up problem in your own words, and describe the difference between an amortized and an expensed depreciation adjustment?
