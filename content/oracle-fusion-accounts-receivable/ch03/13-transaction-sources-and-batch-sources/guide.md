# Transaction Sources and Batch Sources

A transaction type says what a transaction is. A transaction source says where it came from, and controls a surprising amount of day-to-day behavior: numbering, date handling, and defaulting. "Batch source" is the formal name for this setup object; "transaction source" is the name you'll hear used interchangeably in conversation.

## What you'll learn

- The two fundamental kinds of transaction source: Manual and Imported
- What a transaction source actually controls, beyond just "where it came from"
- How transaction source and transaction type work together to control completion

## Manual vs. Imported

Every transaction source is one of two kinds:

- **Manual** – used for transactions keyed directly into the Transactions Workbench by a person. Manual sources are typically what a small AR team uses for day-to-day invoice and credit memo entry.
- **Imported** – used exclusively for transactions brought in through AutoInvoice (Chapter 4) from an upstream system like Order Management, Project Billing, or a non-Oracle billing feed. You cannot manually key a transaction against an Imported source; it exists purely to support the AutoInvoice interface.

## What a source controls

- **Numbering** – whether transaction numbers are automatically generated (and from what starting number/sequence) or must be entered manually. A business might give its manual, AR-team-entered invoices one numbering sequence, and its AutoInvoice-imported project invoices a completely different one, so anyone looking at a transaction number can tell at a glance which source it came from.
- **Date derivation** – for imported sources, how the transaction date is determined when the upstream system doesn't always supply a clean one.
- **Defaulting of transaction type** – a source can default a specific transaction type so operators (or AutoInvoice) don't have to pick it manually every time.
- **Required fields and validation level** – how strictly Receivables validates before letting a transaction complete, which can be tighter for manual entry than for a trusted, already-validated import feed.

## How source and type work together

Transaction source and transaction type jointly decide the level of control required before a transaction of that combination can be completed. A manual source paired with a transaction type that requires full review might force a user to double-check every line before completion is even possible. An imported source paired with a transaction type used only for pre-validated AutoInvoice feeds can be configured to complete transactions automatically on import, since the upstream system and the AutoInvoice validation phase already did the checking.

## A worked example

Northwind Fixtures Co. defines two transaction sources: "AR Manual Entry" (Manual, automatic numbering starting at 100000, defaults to the "Standard Invoice" type) for its AR team's day-to-day work, and "OM AutoInvoice Import" (Imported, automatic numbering starting at 500000, used only by the AutoInvoice program bringing in order-fulfillment invoices). Anyone reviewing a batch of transactions can immediately tell, just from the number range, which ones a human keyed in and which ones arrived automatically from Order Management.

## Recap

A transaction source is Manual or Imported, and it controls numbering, date derivation, type defaulting, and validation strictness. Paired with transaction type, it determines how much review a transaction needs before it can complete. Next up, lesson 14: receivables activities.
