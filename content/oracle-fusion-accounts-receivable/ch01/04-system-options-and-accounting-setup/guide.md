# System Options and Accounting Setup

Receivables system options are the single most important setup record you'll touch before anything else works. There is one set of system options per business unit, and nearly every other piece of Receivables setup either reads a default from it or is validated against it.

## What you'll learn

- What Receivables system options control, grouped by category
- How AutoAccounting ties transaction attributes to General Ledger accounts
- Why system options are configured once per business unit, not once per installation

## One record per business unit

A **business unit** is the operating entity that actually processes Receivables transactions — think of it as "the EMEA sales entity" or "the US distribution entity." Each business unit is assigned to a ledger, and each business unit gets exactly one Receivables system options record. If a company has three business units transacting in Receivables, there are three system options records, each potentially pointing at different default accounts, tax setups, and AutoInvoice behavior.

## What system options control

System options are organized into logical groups:

- **Accounting** – the AutoAccounting rule set used to derive GL accounts, the ledger this business unit posts to, and whether to require a revenue account before completing a transaction.
- **Cash processing** – default accounts for unidentified and unapplied receipts, whether cash can be applied before an invoice is complete, and receipt-related rounding.
- **Transactions and customers** – whether to require a billing/shipping site before completing a transaction, how AutoInvoice handles certain errors, and discount/tax handling defaults.
- **Tax** – whether Receivables calculates tax itself or lets it be driven entirely by the tax engine, and related defaults.

Implementers set these once during setup and revisit them rarely — usually only when a new business unit is added or a company-wide policy changes.

## AutoAccounting: how default GL accounts get derived

AutoAccounting is the rule engine, referenced from system options, that figures out which General Ledger account segments to use for each type of line on a transaction (receivable, revenue, tax, freight, unbilled receivable, unearned revenue, and AutoInvoice clearing). Rather than requiring someone to type a full account every time, AutoAccounting builds the account segment by segment from a source you choose per segment — commonly the transaction type, the salesperson, or the standard memo line.

For example, a company might configure AutoAccounting so that the **Revenue** account's natural account segment comes from the transaction type, while the cost center segment comes from the salesperson's assigned territory. Every invoice entered with that transaction type and salesperson then derives the same revenue account automatically, with no manual GL coding.

## A worked example

Suppose Northwind Fixtures Co. has one business unit, "Northwind US," assigned to the Northwind primary ledger. Its system options specify an AutoAccounting rule set where the Revenue segment comes from Transaction Type and the unapplied-receipts account is a single company-wide suspense account. When a sales rep enters an invoice using the "Standard Invoice" transaction type, AutoAccounting looks up the revenue account tied to that type and builds the full GL account string without anyone typing it in.

## Recap

System options are configured once per business unit and drive accounting defaults, cash-processing behavior, and transaction/customer requirements for everything entered against that business unit. AutoAccounting, referenced from system options, derives GL accounts segment by segment from attributes like transaction type or salesperson. Next up, lesson 5: payment terms and how Receivables calculates due dates.
