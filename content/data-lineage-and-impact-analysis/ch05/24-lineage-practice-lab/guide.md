# Lesson 24 — Lineage Practice Lab

**Chapter 5 · Applied Lineage · Lesson 24 of 25**

## What you'll learn

- How to trace a complete lineage path through a small system by hand, with no software required
- How to perform impact analysis for a proposed column change before it ships
- How to use lineage to decide where to look first when a number is unexpectedly wrong
- A repeatable worked example you can reuse as a template on real systems later

## The system (fictional, illustrative)

**Northfield Pantry**, a fictional small grocery chain with six stores across two regions, is used here purely as a realistic, illustrative system to practice on — not a real company. It has four simple tables:

- **`POS.Sales`** — one row per item sold: `StoreID`, `ItemID`, `QtyUnits`, `SalePrice`, `SaleDate`
- **`Stores.RegionMap`** — which region each store belongs to: `StoreID`, `Region`
- **`Reporting.DailyStoreSummary`** — built nightly from `POS.Sales`: `StoreID`, `SaleDate`, `TotalRevenue` (= sum of `SalePrice × QtyUnits`), `TotalUnitsSold` (= sum of `QtyUnits`)
- **`Reporting.WeeklyRegionalReport`** — built weekly: joins `DailyStoreSummary` to `Stores.RegionMap` on `StoreID`, then sums `TotalRevenue` by `Region` and `WeekEnding`

## Exercise 1 — table-level, then column-level

Draw the table-level lineage first: `POS.Sales → Reporting.DailyStoreSummary → Reporting.WeeklyRegionalReport`, with `Stores.RegionMap` joining in at the second hop. That's four boxes and three arrows.

Now go one level deeper, column by column, for just the final figure, `WeeklyRegionalReport.TotalRevenue`:

- `POS.Sales.SalePrice` and `POS.Sales.QtyUnits` → multiplied together, then summed into `DailyStoreSummary.TotalRevenue`
- `POS.Sales.SaleDate` → used only to decide which day's summary row a sale belongs to (not part of the revenue math itself)
- `DailyStoreSummary.TotalRevenue` → summed again into `WeeklyRegionalReport.TotalRevenue`
- `Stores.RegionMap.Region` → doesn't touch the revenue number at all, but determines *which* `WeeklyRegionalReport` row a store's revenue lands in

Notice `SaleDate` and `Region` both matter to the pipeline, but neither is part of the actual revenue *calculation* — they're grouping keys. A column-level lineage diagram that only showed "math" columns and skipped grouping keys would miss exactly the kind of thing Exercise 2 is about to break.

## Exercise 2 — impact analysis for a proposed change

Northfield Pantry is opening a seventh store, in Canada, and wants to rename `POS.Sales.SalePrice` to `POS.Sales.UnitPriceLocal`, adding a new `CurrencyCode` column so Canadian-dollar sales can be converted to USD before they're combined with the US stores' revenue.

Using the column-level trace from Exercise 1, check every place `SalePrice` is used: it's referenced directly in the `TotalRevenue` calculation inside `DailyStoreSummary`. That means the rename **and** the currency-conversion logic both need to be applied inside that one transformation step — if the conversion is forgotten, `WeeklyRegionalReport.TotalRevenue` will silently sum raw Canadian-dollar amounts together with US-dollar amounts as if they were the same currency, producing a wrong total that looks perfectly normal on the dashboard.

## Exercise 3 — root cause, using the lineage path

`WeeklyRegionalReport` shows $0 for the Midwest region for one specific week, even though the Midwest stores' rows in `DailyStoreSummary` show normal revenue for those same days. Using the lineage path from Exercise 1, where should you look first?

Walk the path backward from the broken figure: `WeeklyRegionalReport` gets its grouping from `Stores.RegionMap` joined on `StoreID`. Since `DailyStoreSummary` already has the right numbers, the break has to be downstream of that point — in the join to `RegionMap`, or in the final summarization step. (A plausible real cause: one Midwest store's `StoreID` was changed or re-issued, and `RegionMap` still has the old `StoreID`, so the join silently drops that store's rows out of the Midwest total entirely.) The lesson here is procedural, not the specific answer: lineage tells you *where to look first* — the join — instead of re-checking every table from scratch.

## Key terms

| Term | Meaning |
|---|---|
| Grouping key | A column used to determine which output row a value belongs to, without itself being part of a calculation |
| Impact analysis | Tracing every downstream use of a column before changing it, to find all the places that also need to change |

## Lab

Add one more table to Northfield Pantry on paper: `Promotions.DiscountCodes` (`ItemID`, `DiscountPercent`, `ValidFrom`, `ValidTo`), which a new transformation step applies to `POS.Sales.SalePrice` before it reaches `DailyStoreSummary`. Redraw the column-level trace for `TotalRevenue` with this new step included, then answer: if `DiscountPercent` were accidentally applied twice (once in `POS.Sales` already, and again in the new step), which specific hop would you inspect first, and why?

## Check yourself

Without looking back at the lesson, can you redraw the four-table lineage chain from memory, correctly placing `Stores.RegionMap` as a join rather than a sequential hop, and explain why `SaleDate` and `Region` are grouping keys rather than part of the revenue calculation itself?
