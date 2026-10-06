# Creating Receivables Invoices

Everything in Chapters 1 through 3 — system options, customers, transaction types and sources, activities, memo lines — exists to support one moment: entering an invoice. This lesson walks through that moment directly in the Transactions Workbench.

## What you'll learn

- The structure of a Receivables invoice: header, lines, distributions
- Which fields come from setup automatically, and which a person chooses
- How an invoice moves from a blank form to a completed, accounted transaction

## The three layers of an invoice

- **Header** – the transaction number (from the source's numbering), transaction date, transaction type, transaction source, customer (bill-to account and site), and payment terms. Several of these default the moment a transaction type and source are chosen, which is why getting Chapter 3's setup right pays off here.
- **Lines** – one or more lines describing what's being billed: a description, quantity, unit price, and the extended amount. Each line can carry its own revenue scheduling (immediate or deferred, from lesson 16) and memo line reference if it's not a standard catalog item.
- **Distributions** – the actual GL account assignments behind each line, usually derived automatically by AutoAccounting from the transaction type, memo line, and other sourcing rules covered in lesson 4, though they can be reviewed and, within permission limits, adjusted before completion.

## From blank form to completed transaction

1. Select the transaction source; this can default the transaction type and numbering.
2. Select or confirm the transaction type; this sets the sign and whether a receivable opens.
3. Select the customer account and bill-to site; the site's tax and currency defaults flow in.
4. Confirm or override the payment terms (defaulted from the customer's profile, but can be changed per transaction).
5. Enter one or more lines with descriptions, quantities, and amounts.
6. Review distributions, letting AutoAccounting's defaults stand unless something genuinely needs a manual override.
7. Complete the transaction. Completion locks header fields that shouldn't change later and makes the invoice eligible for the Create Accounting process.

## A worked example

Northwind Fixtures Co.'s AR team enters an invoice for Harborline Retail Group using the "AR Manual Entry" source (lesson 13) and the "Standard Invoice" type (lesson 12). Selecting Harborline's account pulls in its primary Bill-To site and its Net 30 payment terms from its profile class (lesson 9). The clerk enters one line: 500 units of a fixture at $25 each, for $12,500. AutoAccounting derives the revenue account from the transaction type, and the receivable account from the standard AutoAccounting rule for Accounts Receivable. The clerk reviews the distributions, confirms they look correct, and completes the transaction — at which point it becomes eligible for accounting and shows up as an open item on Harborline's account.

## Recap

An invoice has a header (customer, type, source, terms), lines (what's being billed and how its revenue is recognized), and distributions (the GL accounts behind each line, mostly automatic through AutoAccounting). Much of the header defaults from setup choices made earlier in the course; completion is the step that locks it in and makes it eligible for accounting. Next up, lesson 18: invoice lines, tax, and freight in more depth.
