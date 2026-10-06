# Lesson 21 — Asset Revaluation

**Chapter 4 · Depreciation and Adjustments · Lesson 21 of 33**

## What you'll learn

- What revaluation does that a cost adjustment doesn't
- The role of the revaluation reserve and revaluation amortization
- Why revaluation is tied to accounting standards, not routine correction
- How a revaluation changes an asset's going-forward depreciation

## A different kind of change: restating value, not correcting an error

Every adjustment covered so far in this chapter — cost adjustments, reclassifications — corrects something that was originally **wrong**: a miscoded invoice, a category that should never have been assigned. **Revaluation** is different. It's used when an asset's carrying value needs to be formally restated to better reflect current conditions, typically because of inflation, a change in market value, or a specific accounting policy election — not because the original entry was a mistake.

Revaluation is primarily relevant under accounting frameworks that explicitly allow it, such as IFRS's revaluation model for property, plant, and equipment (IAS 16) — it is not a routine US GAAP practice, where historical cost is the general rule. This is a lesson about the mechanics inside Oracle Fusion Assets; whether and when to actually revalue is a decision driven by the applicable accounting standard and company policy.

## The revaluation reserve and revaluation amortization

When an asset is revalued upward, Oracle Fusion Assets doesn't just change the cost figure and move on. It uses two dedicated accounts to track the effect of the revaluation separately from the asset's original cost:

- **Revaluation reserve** — captures the increase in the asset's value from the revaluation, typically recorded in equity rather than flowing through the income statement immediately (consistent with how accounting standards treat a revaluation surplus).
- **Revaluation amortization** — as the revalued asset continues to depreciate, a portion of that reserve can be amortized over the asset's remaining life, recognizing the effect of the revaluation gradually rather than all at once.

This separation matters because it keeps the revaluation surplus distinguishable from ordinary depreciation expense — an auditor, or Lesson 31's reconciliation, needs to be able to trace exactly how much of an asset's recorded value came from its original cost versus from a later revaluation.

## Effect on going-forward depreciation

Once an asset is revalued, its net book value — and therefore its future depreciation — is based on the new, revalued amount rather than the original cost. If Meridian Fabrication Co. revalued a building with a $400,000 remaining net book value and 20 years of remaining life up to a $500,000 fair value, the $100,000 increase goes to the revaluation reserve, and depreciation going forward is calculated on the higher $500,000 basis over the remaining 20 years — a materially different annual depreciation charge than before the revaluation.

## A deliberate, infrequent process

Because revaluation changes the fundamental basis an asset depreciates on, it's not something run casually or often. Companies that use revaluation typically do it on a defined cycle (say, every few years, or when a specific triggering event occurs) and apply it consistently across an entire category or class of assets, not selectively to individual assets, to avoid distorting comparisons within the same asset population.

## Key terms

| Term | Meaning |
|---|---|
| Revaluation | Formally restating an asset's carrying value to reflect current conditions, not correcting an original error |
| Revaluation reserve | The account capturing the increase in value from a revaluation, typically recorded in equity |
| Revaluation amortization | Gradually recognizing the revaluation reserve's effect over the asset's remaining life |

## Lab

Meridian revalues a building from a $400,000 net book value up to $500,000 fair value, with 20 years of remaining life. Calculate the new annual depreciation on the revalued basis, and explain in one sentence why the $100,000 increase doesn't simply flow through as current-period income.

## Check yourself

Without looking back, can you explain the difference between a cost adjustment and a revaluation, and describe what the revaluation reserve is used for?
