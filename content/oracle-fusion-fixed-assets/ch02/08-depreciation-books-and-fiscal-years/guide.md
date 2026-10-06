# Lesson 8 — Depreciation Books and Fiscal Years

**Chapter 2 · Depreciation Setup · Lesson 8 of 33**

## What you'll learn

- How a depreciation calendar is structured into fiscal years and periods
- What it means for a book to have a "current open period"
- Why period status moves forward, not backward
- How this structure sets up everything Chapter 4 does with running depreciation

## Fiscal years and periods, inside the book

Lesson 3 introduced the asset book as a container, and Lesson 7 drew the line between the depreciation calendar and the prorate calendar. This lesson is about what the depreciation calendar actually looks like once it's built: a sequence of **fiscal years**, each broken into **periods** (almost always monthly, matching how most companies close their books). Every depreciation book is assigned one depreciation calendar, and every period in that calendar has a status.

## Period status: open, closed, and "current"

At any moment, a depreciation book has exactly one period marked as the **current open period** — the period depreciation will calculate into if you run it right now. The calendar also tracks every period before it as **closed** and every period after it as **future, not yet opened**.

This matters because Oracle Fusion Assets enforces a strict rule: you can't run depreciation into a period that isn't the book's current open period, and once a period is closed (Chapter 6 covers the close process itself), **you generally can't reopen it**. The depreciation calendar only moves forward. This is deliberate — it's the same philosophy behind GL period close: a closed period is supposed to mean "finalized," not "finalized until someone needs to fix something."

## Why this is stricter than it sounds

In practice, this means mistakes discovered after a period closes aren't fixed by reopening that period — they're fixed with a correcting transaction (a cost adjustment, a catch-up depreciation entry) dated into the *current* open period, which Chapter 4 covers in depth. The depreciation calendar's one-way nature is exactly why getting the numbers right *before* closing a period (reviewing exception reports, confirming every asset actually depreciated) matters so much, and why Chapter 6 spends real attention on the close process itself.

## Setting up the calendar correctly, once

Because so much depends on it, the depreciation calendar is defined early, alongside the book itself:

- **Number of periods per year** — virtually always 12, aligned to monthly close cycles.
- **Fiscal year start** — calendar year, or an offset fiscal year (e.g., starting in July), matching how the company actually reports.
- **Period names** — a naming convention consistent with the GL calendar makes later reconciliation (Lesson 31) far easier, even though the two calendars are technically independent structures.

## Key terms

| Term | Meaning |
|---|---|
| Depreciation calendar | The sequence of fiscal years and periods a book uses to calculate and allocate depreciation |
| Current open period | The single period in a book currently open for depreciation to calculate into |
| Period status | Whether a given period is closed, currently open, or a future period not yet opened |

## Lab

Meridian Fabrication Co.'s corporate book runs a calendar-year fiscal year with monthly periods. It is currently October, and the book's current open period is September (depreciation for September hasn't been run yet). Explain, in your own words, what has to happen before the book's current open period can advance to October, and why Meridian can't simply skip ahead and depreciate November instead.

## Check yourself

Without looking back, can you explain what "current open period" means, and why Oracle Fusion Assets generally doesn't allow a closed depreciation period to be reopened?
