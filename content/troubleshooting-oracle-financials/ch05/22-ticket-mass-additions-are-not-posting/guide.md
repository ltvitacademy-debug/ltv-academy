# Ticket: Mass Additions Are Not Posting

**Chapter 5 · Assets, Expenses and Setup Tickets · Lesson 2 of 5**

## What you'll learn

- The full Mass Additions queue lifecycle and what each status actually means
- Exactly how Prepare Mass Additions derives the expense account, and why that specific step fails
- How to clear a batch of held lines efficiently instead of one at a time
- A resolution note for a batch-level setup gap, distinct from Lesson 21's single asset

## Queue statuses

| Status | Meaning |
|---|---|
| **New** | Freshly arrived from Payables, not yet processed by Prepare Mass Additions |
| **On Hold** | Prepare Mass Additions ran but couldn't derive required information |
| **Post** | Ready — set manually (or defaulted) once a line is confirmed good |
| **Posted** | Already converted into an active asset by Post Mass Additions |

## How Prepare Mass Additions actually derives the expense account

Prepare Mass Additions builds the depreciation expense account by taking the invoice distribution's **clearing account** and overlaying its natural account segment with the natural account segment of the **depreciation expense account defined on the asset category**. If the category assigned to a line doesn't have a depreciation expense account defined for the relevant book, there's nothing to overlay with — and the line goes **On Hold**.

## The ticket

> **Ticket #40668 — Cascade Outdoor Supply.** Asset accountant reports: "We bought six new delivery trucks last week. All six are stuck in Mass Additions, On Hold. None of them will post." Severity: High.

## Investigating

1. **Query the Mass Additions queue** for all six lines. All six: status **On Hold**.
2. **Open one line and check Assignments.** The expense account field is blank — exactly the symptom of a failed derivation.
3. **Check the asset category** assigned to these lines: "Vehicles - Delivery Trucks," a category created last month for this new fleet purchase.
4. **Check that category's setup** in the relevant depreciation book. It has a cost account and an accumulated depreciation account defined — but no **depreciation expense account**. That's the missing piece Prepare Mass Additions needed.

## Root cause

The newly created "Vehicles - Delivery Trucks" asset category is missing its depreciation expense account in this book's category setup, so Prepare Mass Additions has nothing to overlay onto the clearing account, and every line using that category goes On Hold — not six separate problems, one category setup gap affecting six lines at once.

## Resolving it

1. **Add the missing depreciation expense account** to the category's setup for this book (confirmed with whoever owns Fixed Assets setup — this determines which GL account future depreciation for this entire vehicle category posts to, so it's worth getting right rather than picking something quickly).
2. **Re-run Prepare Mass Additions** for the six held lines (no need to touch them individually — correcting the category setup lets the program re-derive the account for all of them in one pass).
3. **Confirm all six move to queue status Post**, then run **Post Mass Additions**.

## Documenting it

> **Ticket #40668 — Cascade Outdoor Supply.** Six new delivery truck invoice lines stuck On Hold in Mass Additions.
> **Root cause:** The new asset category "Vehicles - Delivery Trucks" had no depreciation expense account defined for this book, so Prepare Mass Additions couldn't derive an expense account for any line using that category.
> **Fix:** Added the missing depreciation expense account to the category's book setup; re-ran Prepare Mass Additions for the held lines.
> **Verified:** All six lines moved to queue status Post; ran Post Mass Additions and confirmed all six trucks now appear in the active asset register.
> **Note:** Recommend a checklist step confirming full category setup (cost, accumulated depreciation, AND expense accounts) whenever a new asset category is created, before it's used on any invoice.

## Key terms

| Term | Meaning |
|---|---|
| Clearing account | The account the invoice distribution posted to, which Prepare Mass Additions overlays to build the expense account |
| Depreciation expense account | The category-level setup telling Prepare Mass Additions which natural account to use |
| Batch cause | A single setup gap that affects every line sharing the same category, rather than six unrelated issues |

## Check yourself

Why was re-running Prepare Mass Additions for all six lines at once the right move, rather than fixing and reprocessing them one at a time?
