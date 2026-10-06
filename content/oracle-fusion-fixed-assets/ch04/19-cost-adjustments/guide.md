# Lesson 19 — Cost Adjustments

**Chapter 4 · Depreciation and Adjustments · Lesson 19 of 33**

## What you'll learn

- What a cost adjustment actually changes on an asset
- Common real-world reasons a cost needs to change after addition
- How a cost increase and a cost decrease are treated differently
- How cost adjustments connect back to Lesson 18's catch-up depreciation

## When an asset's cost needs to change

An asset's cost isn't always final the moment it's added. A **cost adjustment** changes the recorded cost of an asset already in the system — increasing it (an additional invoice for freight that arrived late, a warranty-covered repair that turned out not to be covered, a later-discovered installation cost) or decreasing it (a billing error caught after the fact, a vendor credit for defective parts, a discount applied retroactively).

Mass additions (Chapter 3) can themselves become cost adjustments: recall from Lesson 14 that a mass addition line merged into an existing asset is treated as a cost adjustment, not a new asset. This lesson is about the broader category of cost adjustments, whether they arrive through mass additions or are entered directly against an existing asset.

## Increases versus decreases

Both directions change the asset's cost and therefore its future depreciation, but they interact with Lesson 18's catch-up logic in opposite ways:

- **Cost increase** — if Meridian's $120,000 CNC machine from Lesson 6 gets a $15,000 cost adjustment for a late-arriving installation invoice, the depreciable basis grows from $120,000 to $135,000. Depending on timing and policy, this can trigger catch-up depreciation (amortized or expensed, per Lesson 18) for the gap between what would have been depreciated on the higher cost all along versus what was actually taken on the lower original cost.
- **Cost decrease** — if $10,000 of that same machine's original cost turns out to have been a vendor billing error, the depreciable basis shrinks to $110,000, and the asset may have *over*-depreciated relative to the corrected, lower cost — again triggering a catch-up calculation, but in the other direction.

## Why timing and threshold matter

Many Oracle Fusion Assets implementations place real guardrails around cost adjustments — for example, limiting adjustments to a certain window after the original addition, or requiring additional approval for adjustments past a materiality threshold. This isn't arbitrary friction: a cost adjustment made years after an asset was added, with most of its life already depreciated, produces a much larger and more disruptive catch-up calculation than one made in the same fiscal year as the original addition. Catching cost issues early, during Prepare Mass Additions (Lesson 14) or shortly after a manual addition, keeps corrections small and manageable.

## Key terms

| Term | Meaning |
|---|---|
| Cost adjustment | A change to an asset's recorded cost after it has already been added |
| Depreciable basis | The amount actually being spread across an asset's life — changes whenever cost changes |

## Lab

Meridian's $120,000 CNC machine receives a $15,000 cost adjustment for a late installation invoice, six months after the original addition. Using the straight-line formula from Lesson 6, calculate the new annual depreciation rate on the corrected $135,000 cost (same 10-year life, $20,000 salvage value), and explain in one sentence why this adjustment likely triggers at least some catch-up depreciation.

## Check yourself

Without looking back, can you explain the difference between a cost increase and a cost decrease adjustment, and why implementations often put a time window or approval threshold around cost adjustments?
