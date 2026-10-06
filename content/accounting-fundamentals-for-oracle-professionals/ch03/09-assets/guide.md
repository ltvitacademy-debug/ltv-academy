# Assets

Chapter 2 gave you the mechanics of debits and credits. Chapter 3 slows down and looks closely at each of the five account types, starting with the one most people already have an intuitive feel for: assets.

## What you'll learn

- The formal definition of an asset
- The difference between current and noncurrent assets
- Common examples of each, including ones that surprise new students
- Which Oracle Fusion modules are, underneath everything, just systems for tracking specific categories of assets

## What counts as an asset

Formally, an **asset** is a resource controlled by a business, as a result of a past transaction, that is expected to provide future economic benefit. Breaking that down:

- **Controlled**, not necessarily *owned* outright — a business leasing equipment under certain lease terms may still record a right-of-use asset, even though it doesn't legally own the equipment.
- **Past transaction** — you don't record an asset for something you merely *expect* to acquire someday; it has to already exist on the books because something already happened (a purchase, a service performed for a client, etc.).
- **Future economic benefit** — the business expects the item to help it generate cash, directly or indirectly, going forward.

## Current vs. noncurrent assets

Assets are split into two buckets based on how quickly they're expected to convert to cash or be used up:

- **Current assets**: expected to convert to cash or be consumed within one year (or one normal operating cycle). Examples: Cash, Accounts Receivable, Inventory, Prepaid Expenses.
- **Noncurrent (long-term) assets**: expected to provide benefit for longer than a year. Examples: Equipment, Buildings, Land, long-term investments, intangible assets like patents or goodwill.

This distinction matters enormously once we reach the balance sheet in Chapter 6 — readers of financial statements care a great deal about how much cash a business can access quickly (current assets) versus how much is tied up for the long haul (noncurrent assets).

## Worked example: classifying a company's assets

A fictional retailer, **Harlow & Vance Supply Co.**, has the following at year-end:

| Item | Current or Noncurrent? |
|---|---|
| Cash in the bank | Current |
| Inventory sitting on shelves | Current |
| Amounts owed by customers (Accounts Receivable) | Current |
| A warehouse building | Noncurrent |
| Delivery trucks | Noncurrent |
| A patent on a packaging design | Noncurrent |

Notice that Inventory counts as a *current* asset even though it sits physically in a warehouse for weeks or months — the test is how quickly it's expected to convert to cash through a sale, not how it looks sitting on a shelf.

## Why this maps directly to Oracle Fusion

Several entire Oracle Fusion Financials modules exist specifically to track categories of assets:

- **Oracle Fusion Receivables** tracks the Accounts Receivable asset — amounts customers owe.
- **Oracle Fusion Cash Management** tracks the Cash asset and reconciles it against bank statements.
- **Oracle Fusion Assets** (Fixed Assets) tracks noncurrent assets like equipment and buildings, including their depreciation over time (Chapter 5 covers depreciation concepts).

Understanding "asset" as a category now means that, later in the path, the purpose of each of these modules will already make sense before you ever open them.

## Recap

An asset is a resource a business controls, as a result of a past transaction, expected to provide future economic benefit. Assets split into current (convert to cash within a year) and noncurrent (longer-term). Oracle Fusion organizes entire modules — Receivables, Cash Management, Assets — around tracking specific categories of assets. Next up, lesson 10: liabilities, the mirror image of what we just covered.
