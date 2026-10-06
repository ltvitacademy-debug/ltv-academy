# Subledger Accounting Overview

Welcome to Oracle Fusion Subledger Accounting, the course that ties together everything you have built so far in this path. You have already configured General Ledger, Payables, and Receivables, and you have walked a purchase and a sale end to end through Procure-to-Pay and Order-to-Cash. At every one of those stops, you saw transactions turn into journal entries almost like magic. This course opens up that magic box. The engine that converts an AP invoice, an AR receipt, an asset addition, or a bank reconciliation into a balanced, auditable journal entry is called Subledger Accounting, or SLA, and it sits in the middle of the whole Oracle Fusion Financials architecture.

## What you'll learn

- Where Subledger Accounting sits between the subledgers and the General Ledger
- Why Oracle built a separate, rules-based accounting engine instead of hardcoding GL postings into each subledger
- The core idea of "one engine, many subledgers"
- The vocabulary you will use for the rest of this course

## The problem SLA solves

In older, simpler systems, each subledger module contains its own hardcoded logic for building a journal entry: Payables code decides the debit and credit for an invoice, Receivables code decides the debit and credit for a receipt. That works, but it is rigid. Every time a company wants a different account derivation, a different level of summarization, or a second accounting representation for a different accounting standard, someone has to change application code.

Oracle Fusion solves this differently. Payables, Receivables, Fixed Assets, Cash Management, Cost Management, Projects, and other subledger applications do not build journal entries themselves. Instead, each one records a business event — an invoice was validated, a receipt was applied, an asset was added — and hands that event to a single, shared accounting engine: Subledger Accounting. SLA reads configurable rules and produces the journal entry. Change the rules, and every subledger that uses them changes behavior, with no code changes.

## One engine, many subledgers

Think of Subledger Accounting as a translator that every subledger application calls with the same request: "Here is a business event with some data attached — please tell me what journal entry this should produce." The engine looks up the rules that apply to that subledger application, that type of event, and that ledger, and it builds a complete, balanced subledger journal entry: debit and credit lines, an accounting date, a currency, and a set of GL accounts.

Because every subledger — Payables, Receivables, Assets, Cash Management — calls the same engine with the same kind of request, a consultant who learns SLA once can read and troubleshoot accounting in any of them. That is the entire reason this course exists as connective tissue between the module-specific courses you already completed and the General Ledger you already configured.

## Where SLA sits in the architecture

Picture the flow of a single transaction: a subledger application (say, Payables) captures a transaction and raises an accounting event. Subledger Accounting intercepts that event, applies rules, and produces a subledger journal entry. That journal entry can be reviewed, in draft, inside the subledger. Once it is finalized, SLA transfers it to General Ledger, where it becomes a GL journal that can be posted and rolled up into the trial balance and financial statements you already know how to read.

This means every number you have ever seen land in the General Ledger from Payables, Receivables, or any other subledger passed through Subledger Accounting first. GL never talks directly to the subledgers — SLA is the only path.

## Recap

Subledger Accounting is the shared, rules-based engine that stands between every Oracle Fusion subledger application and the General Ledger, converting business events into balanced journal entries without any subledger needing its own hardcoded posting logic. Next up, lesson 2: accounting events and event classes, the raw input SLA works from.
