# Lesson 1 — Fixed Assets Concepts and the Asset Lifecycle

**Chapter 1 · Fixed Assets Fundamentals · Lesson 1 of 33**

## What you'll learn

- What counts as a fixed asset, and why it's capitalized instead of expensed
- The five-stage lifecycle every asset moves through in Oracle Fusion Assets
- The vocabulary you'll see on every screen in this course: cost, net book value, accumulated depreciation
- How Fixed Assets sits between Payables and the General Ledger in the Oracle Fusion Financials suite

## What makes something a fixed asset

A fixed asset is property a company buys to use in its own operations for longer than one accounting period — a forklift, a server rack, a building, a fleet vehicle — rather than something it buys to resell. Because the benefit of that purchase spreads across many future periods, accounting rules don't let a company expense the whole cost the month it's bought. Instead, the cost is **capitalized**: recorded as an asset on the balance sheet, then gradually recognized as an expense through **depreciation** over the asset's useful life.

Every company sets a **capitalization threshold** — a dollar amount below which a purchase is just expensed, no matter how long it will be used. A $40 stapler isn't worth tracking as a depreciable asset even though someone will use it for years; a $25,000 forklift is. Oracle Fusion Assets doesn't enforce a threshold for you — that's a business policy applied when someone decides whether an invoice line becomes an asset addition or stays a straight expense in Payables.

## The five-stage asset lifecycle

Every asset in Oracle Fusion Assets moves through the same sequence, and this course is organized around it chapter by chapter:

1. **Addition** — the asset is recorded for the first time, manually, through Quick Additions, or via Mass Additions from a Payables invoice (Chapter 3).
2. **Capitalization / placed in service** — construction-in-process (CIP) assets sit uncapitalized and undepreciated until they're put into use; the date placed in service (DPIS) is what starts the depreciation clock (also Chapter 3).
3. **Depreciation** — each period, Oracle Fusion Assets calculates how much of the asset's cost to recognize as expense, based on its depreciation method, life, and prorate convention (Chapters 2 and 4).
4. **Adjustments and transfers** — cost corrections, reclassifications, revaluations, impairments, and physical or financial transfers happen while the asset is in service (Chapters 4 and 5).
5. **Retirement** — the asset is sold, scrapped, or otherwise taken out of service, triggering a gain or loss calculation (Chapter 5).

Behind all of it, Chapter 6 covers how every one of these events becomes an accounting entry that has to agree with the General Ledger.

## Key terms

| Term | Meaning |
|---|---|
| Cost | The capitalized amount of the asset — what you paid, including items your policy says to capitalize (freight, installation, etc.) |
| Net book value (NBV) | Cost minus accumulated depreciation — what's left to depreciate, and roughly what the asset is "worth" on the books |
| Accumulated depreciation | The running total of depreciation expense recognized against an asset since it went into service |
| Date placed in service (DPIS) | The date depreciation starts being calculated for the asset |
| Construction in process (CIP) | An asset still being built or assembled — tracked for cost, but not yet depreciating |

## Where Fixed Assets fits in Oracle Fusion Financials

Picture a $50,000 piece of equipment. A supplier invoice for it is entered and approved in **Payables**. If that invoice line is coded to an asset clearing account rather than an expense account, it becomes a candidate for an asset addition — Chapter 3 covers exactly how it crosses over into **Assets**. Once it's an asset, Assets calculates depreciation every period and, through **Create Accounting** (Chapter 6), produces journal entries that flow into the **General Ledger**. Fixed Assets is a subledger: it keeps far more detail about an asset (its location, its category, its depreciation schedule) than the General Ledger ever would, and periodically summarizes that detail into GL journal entries.

## Lab

Using a fictional company, **Meridian Fabrication Co.**, list three purchases it might make in a single month: one that should clearly be capitalized as a fixed asset, one that should clearly be expensed, and one that's genuinely borderline given a $5,000 capitalization threshold. For the borderline one, write one sentence justifying which way you'd classify it and why.

## Check yourself

Without looking back, can you name the five stages of the asset lifecycle in order, and explain the difference between an asset's cost and its net book value?
