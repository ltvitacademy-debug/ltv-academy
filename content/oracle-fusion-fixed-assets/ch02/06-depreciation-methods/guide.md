# Lesson 6 — Depreciation Methods

**Chapter 2 · Depreciation Setup · Lesson 6 of 33**

## What you'll learn

- The four depreciation method types Oracle Fusion Assets calculates
- The formula behind straight-line (calculated) depreciation, worked through an example
- How flat-rate and units of production methods differ from straight-line
- Why the method you choose has to match how the asset actually loses value

## Four method types

Oracle Fusion Assets groups depreciation methods into four calculation types:

- **Calculated (straight-line) methods** — divide the asset's depreciable basis evenly across its useful life. The simplest, most common method for financial reporting.
- **Table-based methods** — look up a rate from a predefined table using the asset's life and which year of life it's in. This is how many accelerated tax depreciation schedules (like US MACRS) are implemented — not a formula calculated fresh each period, but a published rate pulled from a table.
- **Flat-rate methods** — apply a fixed percentage rate to either the asset's recoverable cost or its current net book value each period, multiplied by the fraction of the year held. Applying the rate to net book value rather than cost is what produces a declining-balance pattern: a bigger number early, shrinking every year.
- **Units of production methods** — calculate depreciation based on actual usage (units produced, hours run, miles driven) rather than the passage of time, using the asset's cost, salvage value, and total expected capacity.

## Working the straight-line formula

Straight-line is the easiest to reason about by hand. Depreciable basis is cost minus salvage value, divided by useful life:

```
Annual depreciation = (Cost - Salvage Value) / Useful Life (years)

Example — Meridian Fabrication Co. CNC machine (illustrative):
Cost:            $120,000
Salvage value:     $20,000
Useful life:      10 years

Annual depreciation = ($120,000 - $20,000) / 10 = $10,000 per year
```

That $10,000 is the steady-state annual figure — Lesson 7 covers how the *first* year's depreciation is actually prorated based on when the asset was placed in service, since few assets go into service exactly on the first day of a fiscal year.

## Flat-rate: the declining-balance pattern

A flat-rate method applied to net book value produces a different shape entirely. If Meridian instead depreciated that same $120,000 machine at a flat 20% rate against net book value: year one would take 20% of $120,000 ($24,000), year two would take 20% of the now-lower $96,000 ($19,200), and so on — a curve that front-loads the expense rather than spreading it evenly. This is common in tax depreciation and in jurisdictions where accelerated write-offs are expected or incentivized.

## Matching the method to how the asset loses value

The right method depends on how the asset actually consumes its economic benefit, not just on convention:

- An office building loses value steadily over decades → straight-line.
- A delivery vehicle used heavily early and lightly later, or a jurisdiction's tax code demanding accelerated recovery → flat-rate / declining balance or a table-based method.
- A mining excavator whose wear tracks tonnage moved, not calendar time → units of production.

## Key terms

| Term | Meaning |
|---|---|
| Depreciable basis | Cost minus salvage value — the amount actually spread across the asset's life |
| Salvage value | The estimated residual value of an asset at the end of its useful life |
| Declining balance | A pattern where depreciation is calculated against net book value, producing a shrinking annual charge |
| Units of production | A method tying depreciation to actual usage rather than elapsed time |

## Lab

Using Meridian Fabrication Co.'s $120,000 CNC machine (10-year life, $20,000 salvage value), calculate year-one depreciation under straight-line. Then calculate year-one and year-two depreciation under a flat 20% rate applied to net book value. Write one sentence on which method is more appropriate for Meridian's financial statements, and why.

## Check yourself

Without looking back, can you write the straight-line depreciation formula from memory, and explain why applying a flat rate to net book value produces a declining pattern instead of a level one?
