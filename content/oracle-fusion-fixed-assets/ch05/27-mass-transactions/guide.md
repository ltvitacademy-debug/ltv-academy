# Lesson 27 — Mass Transactions

**Chapter 5 · Transfers and Retirements · Lesson 27 of 33**

## What you'll learn

- Why one-at-a-time transactions don't scale for real asset populations
- The main mass transaction types and what each applies in bulk
- How mass transactions select which assets they affect
- Why review before submission matters even more at scale

## When one asset at a time isn't realistic

Lessons 20, 23, and 24 covered reclassification, transfer, and retirement as if each happens to a single asset. In practice, many real-world events affect dozens or hundreds of assets at once: a warehouse closes and every asset in it needs to transfer to a different location on the same day; a product line is discontinued and forty pieces of related tooling all retire together; a company restructures and an entire category of assets needs reclassifying under a new scheme. Doing each one individually isn't just slow — it's a realistic source of inconsistency, where asset #47 gets a slightly different treatment than asset #48 purely from manual entry drift.

**Mass transactions** apply the same transaction type to a selected group of assets in a single operation, built on the same underlying logic as the individual transactions from earlier lessons.

## The main mass transaction types

- **Mass Transfers** — move a selected group of assets to a new location, assignment, or distribution in one operation, exactly matching Lesson 23's transfer logic applied in bulk.
- **Mass Retirements** — retire a selected group of assets together, following the same gain/loss calculation per asset as Lesson 26, just triggered for many assets in one submission.
- **Mass Reclassifications** — move a selected group of assets from one category to another in bulk, with the same catch-up depreciation logic from Lesson 20 applying individually to each asset affected.
- **Mass Changes** — update category-level defaults themselves (life, method, or account) and optionally apply that change retroactively to existing assets already in that category, distinct from changing an individual asset's data.

## How a mass transaction selects its assets

Rather than clicking into each asset one at a time, a mass transaction typically works from a **selection criteria** step — filtering by category, location, cost center, date range, or asset number range — producing a candidate list, which is then reviewed before the transaction actually commits. Meridian Fabrication Co. closing its Ohio satellite warehouse might select every asset whose location flexfield points to that warehouse, review the resulting list of 60-some assets, and submit a single mass transfer moving all of them to the main plant at once.

## Review matters more, not less, at scale

Because a mass transaction can affect a large number of assets in a single submission, a mistake in the selection criteria is a mistake multiplied by however many assets matched it. If Meridian's selection criteria for the warehouse closure accidentally also matched assets at a *different* location that happened to share the same cost center, a single bad filter could transfer assets that should have stayed put. This is exactly why mass transaction tools typically show the full candidate list for review before final submission — the same "review before it's irreversible" principle from Lesson 14's mass additions queue applies here too.

## Key terms

| Term | Meaning |
|---|---|
| Mass transaction | Applying one transaction type (transfer, retirement, reclassification, change) to a selected group of assets at once |
| Selection criteria | The filter (category, location, date range, etc.) used to build the candidate list a mass transaction will affect |
| Mass Changes | Updating category-level defaults and optionally applying the change retroactively to existing assets |

## Lab

Meridian closes its Ohio satellite warehouse, which holds 60 assets. Describe the selection criteria you'd use to build the candidate list for a mass transfer to the main plant, and explain one way a poorly specified filter could accidentally include or exclude the wrong assets.

## Check yourself

Without looking back, can you name the four main mass transaction types, and explain why review of the candidate list matters especially for mass transactions?
