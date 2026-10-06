# Lesson 24 — Retiring Assets

**Chapter 5 · Transfers and Retirements · Lesson 24 of 33**

## What you'll learn

- What retirement actually means in Oracle Fusion Assets, and what it doesn't
- The difference between retiring by cost and retiring by units
- What a full retirement looks like versus a partial retirement
- The information a retirement transaction captures

## Retirement ends an asset's depreciating life

**Retirement** is the fifth and final lifecycle stage from Lesson 1: an asset is sold, scrapped, donated, or otherwise permanently taken out of service. Retiring an asset stops its depreciation going forward and triggers the gain/loss calculation covered in depth in Lesson 26. Retirement is not the same as a transfer — the asset isn't moving anywhere, it's leaving the books (or at least leaving active, depreciating status) entirely.

## Retiring by cost or by units

When an asset has multiple units (recall Lesson 11's "units" field — how many identical items one addition record represents), a retirement can target either:

- **Retire by cost** — removing a specific dollar amount of the asset's cost, used when you know the financial amount being disposed of more precisely than the physical unit count.
- **Retire by units** — removing a specific number of units, with Oracle Fusion Assets calculating the proportional cost being retired based on the asset's current cost per unit.

If Meridian Fabrication Co. has an asset record representing 20 identical warehouse shelving units added at $500 each ($10,000 total), and 5 of them are damaged beyond repair and scrapped, retiring by units (5 of 20) lets Oracle Fusion Assets calculate the $2,500 of cost being retired automatically, rather than requiring someone to work out that dollar figure by hand.

## Full versus partial retirement

- **Full retirement** — the entire asset (100% of its cost, or all of its units) leaves service. The asset's status changes, and no further depreciation is calculated for it.
- **Partial retirement** — only a portion leaves service, like the 5-of-20 shelving example above. The remaining 15 units continue depreciating normally, now based on the reduced cost basis.

## What a retirement transaction captures

Retiring an asset isn't just flipping a status flag. The transaction captures:

- **Retirement date** — when the asset actually left service, which affects how much depreciation it's entitled to up through that point.
- **Proceeds of sale** — cash or other value received, if the asset was sold rather than scrapped.
- **Cost of removal** — any expense incurred specifically to retire the asset (demolition, decommissioning, disposal fees).
- **Retirement type/reason** — sale, abandonment, theft, casualty loss, and similar classifications, useful for reporting and for understanding patterns in why assets leave service.

All of this feeds directly into the gain/loss calculation in Lesson 26 — proceeds and cost of removal aren't just reference data, they're inputs to that formula.

## Key terms

| Term | Meaning |
|---|---|
| Retirement | Permanently removing an asset (or a portion of it) from active, depreciating service |
| Retire by cost | Retiring a specific dollar amount of an asset's cost |
| Retire by units | Retiring a specific count of units, with cost calculated proportionally |

## Lab

Meridian's 20-unit shelving asset ($500/unit, $10,000 total) has 5 units damaged and scrapped with no proceeds and no removal cost. Calculate the cost being retired, and explain whether this is a full or partial retirement and why the remaining units keep depreciating afterward.

## Check yourself

Without looking back, can you explain the difference between retiring by cost and retiring by units, and name three pieces of information a retirement transaction captures?
