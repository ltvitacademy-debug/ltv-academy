# Lesson 10 — Tax Books and Corporate Books

**Chapter 2 · Depreciation Setup · Lesson 10 of 33**

## What you'll learn

- Why companies maintain separate corporate and tax books for the same assets
- How the mass copy process actually moves data from corporate to tax
- What can differ between a corporate and tax book, and what can't
- How ongoing transactions (additions, adjustments, retirements) stay synchronized

## Two sets of books, one set of assets

A single physical asset — Meridian Fabrication Co.'s CNC machine — can need two different depreciation calculations living side by side: one for financial statements (the **corporate book**, reporting under US GAAP or IFRS) and one for tax filing (a **tax book**, following whatever accelerated or specialized rules the tax code allows, like US MACRS). Both describe the same real asset. Neither is "wrong" — they're answering different questions with different rules.

This is exactly why Oracle Fusion Assets doesn't make you maintain two completely separate sets of asset records by hand. Instead, a tax book is explicitly associated with one corporate book, and a background process keeps them synchronized.

## Mass copy: how a tax book gets populated

Rather than manually re-entering every asset into a tax book, the **mass copy** process copies asset additions (and, depending on configuration, subsequent transactions like adjustments and retirements) from the associated corporate book into the tax book. This typically runs as a periodic scheduled process — new assets added to the corporate book since the last mass copy get created in the tax book automatically, using the tax book's own category book defaults (Lesson 9) for depreciation method, life, and convention.

This is why Lesson 9's point about category books being configured **per book** matters so much here: the mass copy process creates the asset in the tax book, but the *tax book's own category book record* — not the corporate book's — determines how it depreciates there.

## What can differ, and what generally can't

Between a corporate book and its associated tax book, it's normal and expected for these to differ:

- Depreciation method, useful life, and prorate convention
- Whether a bonus depreciation or special allowance applies in the first year (common in US tax depreciation)
- Depreciation ceiling or limit rules

What generally has to stay consistent is the underlying fact pattern of the asset itself: its existence, its original cost, and the date it was placed in service — because both books are depreciating the *same real-world asset*, just under different rules. If that CNC machine didn't exist, or cost a different amount, it shouldn't show up differently between the two books; how fast it depreciates is where the books are allowed to diverge.

## Keeping them in sync over time

Mass copy isn't a one-time event at implementation. Every period, as new assets are added and existing assets are adjusted, transferred, or retired in the corporate book, mass copy (or an equivalent periodic sync, depending on configuration) propagates those events into the tax book so the tax book's asset population never drifts out of alignment with reality.

## Key terms

| Term | Meaning |
|---|---|
| Mass copy | The process that copies asset additions and transactions from a corporate book into an associated tax book |
| Bonus depreciation | An accelerated first-year depreciation allowance common in tax reporting, not typically used in corporate (financial statement) books |
| Associated book | The corporate book a given tax book is linked to for mass copy purposes |

## Lab

Meridian Fabrication Co. adds a $120,000 CNC machine to its corporate book (10-year straight-line). Its associated tax book uses a 7-year table-based (accelerated) method. Explain, in two or three sentences, what happens the next time mass copy runs, and why the asset's cost and date placed in service stay the same across both books while its annual depreciation amount does not.

## Check yourself

Without looking back, can you explain what the mass copy process actually does, and name one thing that's expected to differ between a corporate and tax book versus one thing that should stay the same?
