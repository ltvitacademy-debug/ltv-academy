# Ticket: Asset Depreciation Did Not Run

**Chapter 5 · Assets, Expenses and Setup Tickets · Lesson 1 of 5**

## What you'll learn

- Why a new asset has to clear a specific status before depreciation can touch it
- The difference between an asset that isn't depreciating and a book/period that didn't run at all
- How to tell "this one asset" from "this whole book" quickly
- A resolution note for an asset still sitting in the wrong queue

## The ticket

> **Ticket #40641 — Meridian Steel Fabricators.** Plant controller reports: "We bought a new stamping press in August. It's September now and there's still no depreciation expense for it. Did the process not run?" Severity: Medium.

## Scope it first: one asset, or the whole book?

Before investigating this one asset, check whether **Calculate/Create Accounting for depreciation** actually ran for the book and period at all. If the whole book shows no depreciation for any asset this period, that's a very different (and much larger) ticket than one specific asset being excluded from an otherwise-successful run. Here: the depreciation run completed successfully, and every *other* asset in the book shows September depreciation. This is isolated to one asset.

## Investigating

1. **Check the asset's status.** The stamping press isn't showing as a depreciating asset in Fixed Assets at all — meaning it never made it out of Mass Additions into the active asset register.
2. **Check Mass Additions.** The invoice line for the press is sitting in the Mass Additions queue with status **ON HOLD**, not Posted.
3. **Find out why it's still on hold.** (Lesson 22 covers Mass Additions in depth — this is a preview of exactly that kind of issue.) The line is missing a required asset category assignment, which Prepare Mass Additions couldn't default on its own.

## Root cause

The stamping press's invoice line has never actually become an asset — it's still sitting in the Mass Additions queue on hold because the asset category was never assigned, so it was never posted into the active asset register, and an asset that doesn't exist in the register yet cannot depreciate.

## Resolving it

Assign the correct asset category to the Mass Additions line, move its queue status to **Post**, run **Post Mass Additions**, and confirm the asset now appears in the active register with the correct in-service date (August, not September — so depreciation needs to catch up for the month it missed, not just start going forward).

## Documenting it

> **Ticket #40641 — Meridian Steel Fabricators.** New stamping press showed no September depreciation; confirmed this was isolated to one asset, not the whole book.
> **Root cause:** The asset's Mass Additions line was on hold (missing asset category) and had never been posted into the active asset register, so it could not depreciate.
> **Fix:** Assigned the correct asset category; posted the Mass Addition; confirmed the asset entered the register with its actual August in-service date.
> **Verified:** Ran Calculate Depreciation for the catch-up period; the asset now shows depreciation for both August and September.
> **Note:** See Lesson 22 for the detailed Mass Additions queue mechanics behind this kind of hold.

## Key terms

| Term | Meaning |
|---|---|
| Mass Additions | The queue where new asset invoice lines wait before becoming active assets |
| On Hold (queue status) | Prepare Mass Additions couldn't derive required information, so the line can't be posted yet |
| In-service date | The date depreciation should actually begin, which may be earlier than when the asset was finally posted |

## Check yourself

Why did the fix need to address the in-service date specifically, rather than just letting depreciation start from the current month going forward?
