# Lesson 16 — Capitalization and Placing Assets in Service

**Chapter 3 · Adding Assets · Lesson 16 of 33**

## What you'll learn

- What construction-in-process (CIP) assets are and why they don't depreciate
- How costs accumulate on a CIP asset before it's finished
- What "capitalizing" a CIP asset actually does
- Why the date placed in service — not the addition date — is what starts depreciation

## Not every asset is ready to depreciate the moment it's added

Lesson 1 introduced construction in process: an asset still being built or assembled, tracked for cost but not yet depreciating. This lesson covers that stage in detail, because a meaningful share of large asset purchases — a new production line, a building addition, custom equipment assembled over months — don't go straight from "purchased" to "in service." They go through a period where money is clearly being spent on a future asset, but the asset itself isn't usable yet.

## How CIP assets accumulate cost

A CIP asset is added to Oracle Fusion Assets like any other, but it's flagged as CIP rather than capitalized. As additional invoices come in through mass additions (Chapter 3's earlier lessons) — progress billings from a contractor, additional equipment purchases, installation labor — those costs are added to the same CIP asset rather than creating new, separate assets. Meridian Fabrication Co. building a new paint booth might accumulate a CIP asset's cost across four or five separate invoices over three months: site prep, the booth itself, ventilation equipment, and electrical work, all landing on one CIP asset record.

Crucially, **a CIP asset never depreciates while it's CIP**, no matter how much cost has accumulated on it or how long it's been sitting there. Depreciation on a half-finished paint booth wouldn't mean anything — it isn't producing any economic benefit yet.

## Capitalizing: the moment it becomes a real depreciating asset

Once Meridian's paint booth is finished and actually ready for use, someone runs the **capitalize** action on the CIP asset. This does two things: it converts the asset's status from CIP to a regular, depreciable asset, and it requires (or defaults) a **date placed in service** — which is the date the depreciation clock actually starts, following Lesson 7's prorate convention rules, regardless of when individual invoices for the project were originally received.

This is the detail that matters most: the date placed in service is **not** the date the first invoice arrived, and not the date the asset was first added to the system as CIP. It's the date the asset actually became usable. A paint booth under construction from January through March, capitalized and placed in service April 1, starts depreciating in April — the two months of invoices that arrived in February and January don't retroactively trigger any depreciation for those months.

## Why this distinction protects the financial statements

If CIP assets depreciated while still under construction, a company would be recognizing expense for assets that aren't yet generating any benefit — overstating depreciation expense in the construction period and understating it once the asset is actually productive. Holding depreciation until capitalization is what keeps expense recognition matched to when the asset is actually in use.

## Key terms

| Term | Meaning |
|---|---|
| Construction in process (CIP) | An asset status for one still being built or assembled; costs accumulate, but depreciation does not |
| Capitalize | The action converting a CIP asset into a regular, depreciable asset |
| Date placed in service | The date depreciation starts, set at capitalization, independent of when costs were originally invoiced |

## Lab

Meridian's paint booth CIP asset accumulates $310,000 across invoices from January through March, and is capitalized with a date placed in service of April 1. If the category assigns a 15-year straight-line life with no salvage value, calculate the full annual depreciation once it's past its first partial year, and explain why no depreciation applies to January, February, or March.

## Check yourself

Without looking back, can you explain why a CIP asset doesn't depreciate, and what two things happen when a CIP asset is capitalized?
