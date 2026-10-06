# Depreciation Concepts

Depreciation is, at heart, just the deferred-expense pattern from lesson 22 applied to a very specific, very common kind of asset: equipment, vehicles, buildings, and other noncurrent assets that get used up over years rather than months.

## What you'll learn

- Why depreciation exists, conceptually
- The straight-line depreciation method, worked step by step
- The difference between an asset's cost, its book value, and its salvage value
- Why Oracle Fusion Assets exists as its own dedicated module

## Why depreciation exists

Recall the matching principle: expenses belong in the period that benefits from them. A delivery truck that costs $40,000 and lasts 8 years doesn't benefit only the year it was purchased — it benefits all 8 years the business uses it to make deliveries. Expensing the full $40,000 the moment it's purchased would badly violate the matching principle, making that first year look artificially unprofitable and every following year look artificially better than it really is. **Depreciation** is the systematic process of spreading a long-term asset's cost across the periods it actually benefits.

## Key terms

- **Cost**: what the business paid for the asset.
- **Salvage (residual) value**: the asset's estimated worth at the end of its useful life.
- **Useful life**: how long the business expects to use the asset.
- **Depreciable base**: Cost minus Salvage Value — the amount that actually gets spread across the useful life.
- **Book value**: Cost minus Accumulated Depreciation so far — what the asset is still "worth" on the books at any point.

## Straight-line depreciation, step by step

The simplest and most common method, **straight-line depreciation**, spreads the depreciable base evenly across the useful life:

$$\text{Annual Depreciation} = \frac{\text{Cost} - \text{Salvage Value}}{\text{Useful Life (years)}}$$

## Worked example

A fictional delivery company, **Cobalt Courier Services**, buys a delivery truck for $40,000, expects to use it for 8 years, and estimates it will be worth $4,000 (salvage value) at the end of that time.

```
Depreciable base = $40,000 - $4,000 = $36,000
Annual depreciation = $36,000 / 8 years = $4,500 per year

Each year-end adjusting entry:
  Debit  Depreciation Expense    $4,500
  Credit Accumulated Depreciation         $4,500
```

Notice the credit goes to **Accumulated Depreciation**, not directly to the Equipment account itself. Accumulated Depreciation is a "contra-asset" — it's reported alongside Equipment on the balance sheet but reduces its net presented value, so the original cost of $40,000 stays visible on the books even as the asset ages. After 3 years, Accumulated Depreciation would total $13,500, and the truck's **book value** would be $40,000 − $13,500 = $26,500.

## Why Oracle Fusion Assets exists

Calculating and posting depreciation by hand across hundreds or thousands of fixed assets, each with its own cost, useful life, salvage value, and depreciation method, would be an enormous manual burden. **Oracle Fusion Assets** (Fixed Assets) exists specifically to track every asset's depreciation schedule and automatically generate the correct depreciation journal entries, period after period, exactly matching the straight-line (or other) calculation you just learned to do by hand.

## Recap

Depreciation spreads a long-term asset's cost across the periods it benefits, following the matching principle. Straight-line depreciation divides the depreciable base (cost minus salvage value) evenly across the useful life, crediting Accumulated Depreciation rather than the asset account directly. Next up, lesson 24: foreign currency basics, the final accounting concept before Chapter 6's financial statements.
