# Lesson 20 — Reclassifying Assets

**Chapter 4 · Depreciation and Adjustments · Lesson 20 of 33**

## What you'll learn

- What a reclassification actually changes versus a cost adjustment or a transfer
- Why reclassification can affect depreciation even when nothing about the physical asset changed
- How to decide whether a correction is a reclassification, not something else
- What happens to accumulated depreciation when a category changes mid-life

## Reclassification changes what an asset is, not what it costs or where it is

Lesson 19 covered cost adjustments — correcting *how much* an asset cost. This lesson covers **reclassification**: correcting *what category* an asset belongs to, with no change to its cost, and (usually) no change to its physical location. If Meridian Fabrication Co. added a piece of specialized tooling under the general "Machinery" category, then later determined it actually belongs in a more specific "Tooling and Dies" category with a different standard life, that's a reclassification, not a cost adjustment and not a transfer (Lesson 23 covers physical/organizational moves).

## Why category alone can change the depreciation outcome

Recall from Chapter 2 that category books carry the default depreciation method, life, and prorate convention. If an asset moves from a category with a 10-year life to one with a 7-year life, reclassifying it changes its *going-forward* depreciation calculation even though the asset itself never moved, and its cost never changed. Oracle Fusion Assets has to decide what happens to the depreciation already taken under the old category's rules — generally treated the same way a life correction is: it can produce a catch-up amount (Lesson 18) depending on how much the new category's defaults differ from the old one's.

## A quick way to tell reclassification apart from its neighbors

Three very similar-sounding actions get confused constantly:

- **Cost adjustment (Lesson 19)** — the dollar amount is wrong; category and location are fine.
- **Reclassification (this lesson)** — the category is wrong; cost and location are fine.
- **Transfer (Lesson 23)** — the location or cost center is wrong, or genuinely changed; category and cost are fine.

An asset might need more than one of these in sequence — Meridian's tooling might get reclassified *and* later physically transferred to a different plant — but each is a distinct transaction answering a distinct question, and Oracle Fusion Assets tracks them separately in the asset's transaction history for exactly this reason.

## Working through an example

Meridian's specialized tooling, originally $40,000, added under "Machinery" (10-year life, $8,000 salvage), two years into depreciation ($6,400 taken at $3,200/year). Reclassified into "Tooling and Dies" (5-year life, no salvage): the corrected annual rate becomes $40,000 / 5 = $8,000/year, and two years should have taken $16,000 — a $9,600 catch-up, handled as amortized or expensed exactly as Lesson 18 describes, just triggered by a category change instead of a cost change.

## Key terms

| Term | Meaning |
|---|---|
| Reclassification | Changing an asset's category, with cost and (usually) location unchanged |
| Transaction history | The record of every reclassification, adjustment, transfer, and retirement applied to an asset over its life |

## Lab

Using Meridian's tooling example above, confirm the $9,600 catch-up calculation yourself, and explain in one sentence why this scenario is a reclassification rather than a cost adjustment, even though it changes the asset's depreciation expense.

## Check yourself

Without looking back, can you distinguish a reclassification from a cost adjustment and a transfer, and explain why changing only a category can still trigger catch-up depreciation?
