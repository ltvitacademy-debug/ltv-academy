# Importing Receivables Transactions with AutoInvoice

Receivables has its own name for its FBDI-driven import: **AutoInvoice**. It's used constantly in real implementations, because Receivables transactions overwhelmingly originate somewhere other than a person typing into Oracle Fusion — a billing system, a point-of-sale system, a subscription platform, a project-billing tool. AutoInvoice is the bridge between all of those sources and Oracle Fusion Receivables.

## What you'll learn

- What AutoInvoice is and why Receivables uses this name instead of a generic "import" label
- The interface table AutoInvoice reads from
- The role of grouping rules in turning raw lines into transactions
- A realistic grouping-related rejection and what causes it

## Why "AutoInvoice" instead of "Import Receivables"

AutoInvoice is a long-standing Oracle name, carried into Fusion, for the process that turns externally sourced transaction lines into Receivables invoices, credit memos, and debit memos automatically — hence "Auto." Functionally, it fills exactly the same role as Import Journals or Import Payables Invoices: it's the product-specific import process for this module, reading staged data and creating real records.

## The interface table

AutoInvoice reads from **RA_INTERFACE_LINES_ALL**, the Receivables transaction-line staging table. Each row represents one line of revenue, tax, freight, or a related charge, tagged with a customer reference, a transaction type, an amount, and identifying information that tells AutoInvoice which lines belong together on the same invoice.

## Grouping rules: the Receivables-specific concept

Unlike a payables invoice, where a header row explicitly groups its own lines, Receivables transaction lines arrive more loosely and get grouped into transactions using **grouping rules** — configured logic that determines which lines belong on the same invoice based on shared attributes like customer, transaction date, and currency. This is the concept unique to this lesson: AutoInvoice isn't just validating individual lines, it's actively assembling them into transactions according to rules someone configured, before any of the usual per-field validation even applies.

## A realistic rejection scenario

Imagine a batch of receivables lines from a subscription billing system where two lines were meant to combine onto a single customer invoice, but one line is missing a piece of the grouping attribute the rule depends on — say, a transaction date formatted inconsistently with its sibling line. AutoInvoice's grouping logic can't match the two lines together as confidently as intended, and the mismatched line is rejected or grouped incorrectly rather than silently failing — which is exactly why reviewing AutoInvoice's rejection detail, the same way you'd review AP_INTERFACE_REJECTIONS, is part of a Receivables consultant's normal troubleshooting routine.

## Recap

AutoInvoice is Receivables' name for the same role Import Journals and Import Payables Invoices play elsewhere: validating staged data in RA_INTERFACE_LINES_ALL and creating real transactions. Its distinguishing feature is grouping rules, which assemble individual lines into complete invoices before validation can even apply cleanly. Next up, lesson 18: importing Fixed Assets additions through Mass Additions.
