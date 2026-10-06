# Subledger Applications and Their Sources

You have now covered events, event classes and types, accounting methods, and the four rule types that live inside a journal entry rule set. Before you dive into building those rules in detail in Chapter 2, this lesson steps back and surveys which Oracle Fusion modules actually plug into Subledger Accounting, and what "sources" means when SLA pulls data from a transaction.

## What you'll learn

- Which Oracle Fusion Financials modules are registered as SLA-enabled subledger applications
- What a "source" is, in SLA terms, and why it matters for every rule you'll build
- How a subledger application is more than just a module name — it's a formal registration
- Why this matters when you move between modules as a consultant

## Subledger applications: a formal registration, not just a module

In Oracle Fusion, "subledger application" is a specific, formal term. It refers to a module that has been registered with Subledger Accounting, with its own set of event classes, event types, and sources defined by Oracle (or, less commonly, by a customer building a custom source system). You already know several subledger applications from earlier courses in this path without necessarily using that exact term for them:

- **Payables** — invoices, payments, prepayments
- **Receivables** — invoices, receipts, adjustments, credit memos
- **Fixed Assets** — additions, depreciation, retirements, transfers
- **Cash Management** — bank statement reconciliation activity
- **Cost Management** — inventory and manufacturing cost transactions
- **Projects** — project cost and revenue accounting

Each of these modules ships with Oracle-defined event classes and event types specific to the transactions that module processes. Payables' event classes look nothing like Fixed Assets' event classes, because the underlying business transactions are completely different — but both plug into the exact same Subledger Accounting engine you studied in lesson 1.

## What "sources" means

A **source** is a specific piece of data from the originating transaction that a rule can reference — things like the invoice amount, the supplier name, the natural account on a distribution line, the transaction date, or the currency code. Every subledger application defines the full list of sources available for its event classes. When you build an account rule or a description rule in the next chapter, you are not writing arbitrary code — you are picking from a defined list of sources that Oracle has made available for that specific event class, and telling SLA how to use them.

This is a subtle but important point: the sources available to you depend entirely on which subledger application and event class you are working in. A source like "Supplier Name" exists for Payables invoice events because Payables transactions have a supplier. It does not exist for a Fixed Assets depreciation event, because depreciation has no supplier — it might instead offer a source like "Asset Number" or "Depreciation Expense Account."

## Why this matters across modules

Because you already learned Payables and Receivables in earlier courses, and because this course's event class and rule concepts are identical across every subledger application, picking up a new subledger application — say, if a client later asks you to also support Fixed Assets accounting — mostly means learning that module's specific sources and event classes. The rule-building mechanics you are about to learn do not change from module to module. That reuse is the entire payoff of Oracle building one shared SLA engine instead of one accounting system per subledger.

## Recap

A subledger application is a formally registered module — Payables, Receivables, Fixed Assets, Cash Management, Cost Management, Projects, and others — each with its own event classes, event types, and sources, but all plugged into the same Subledger Accounting engine. A source is a specific piece of transaction data a rule can reference, and the available sources are specific to each event class. This closes out Chapter 1. Next up, Chapter 2 begins with lesson 5: journal line types and journal line rules, the first rule type you'll actually build.
