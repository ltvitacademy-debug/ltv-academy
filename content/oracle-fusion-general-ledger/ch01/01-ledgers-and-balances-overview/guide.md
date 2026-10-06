# Lesson 1 — Ledgers and Balances Overview

**Chapter 1 · General Ledger Fundamentals · Lesson 1 of 37**

## What you'll learn

- What a ledger is in Oracle Fusion Cloud General Ledger, and the four things every primary ledger must have
- The difference between a primary ledger, a secondary ledger, and a reporting currency
- How a ledger set lets you work with several ledgers at once
- Why this course builds on a chart of accounts and ledger that are already configured

## The ledger: General Ledger's central object

Everything in Oracle Fusion General Ledger revolves around the **ledger**. A ledger is the record-keeping structure that determines *which* transactions get recorded together and *how*. Oracle requires every ledger to be defined by four components, sometimes called the "four Cs":

| Component | What it fixes |
|---|---|
| **Chart of accounts** | The segmented account structure (for example company, cost center, account, and so on) that every journal line must use |
| **Accounting calendar** | The set of accounting periods (monthly, in most companies) that transactions post into |
| **Currency** | The ledger's functional currency — the currency its balances are stated in |
| **Accounting method** | The subledger accounting rules that convert subledger transactions (Payables, Receivables, and so on) into journals |

Once you save a ledger, the chart of accounts, calendar, and currency are **locked**. You cannot change them later, because doing so would make historical balances incomparable to new ones. Only the accounting method can still be changed after the ledger exists.

> **Worked example.** Throughout this course we'll use **Solara Fixtures, Inc.**, a fictional mid-size lighting manufacturer, as our running example company. Solara's primary ledger uses a chart of accounts with company, cost center, account, and intercompany segments, a standard monthly calendar, and USD as its functional currency.

## Primary ledgers, secondary ledgers, and reporting currencies

A **primary ledger** is the ledger of record — the one your financial statements are built from. Most of this course works inside a primary ledger. Two related structures extend it:

- **Secondary ledger** — a second, fully independent ledger that shares the same source transactions but can use a different chart of accounts, calendar, currency, or accounting method. Companies use a secondary ledger when, for example, their statutory books need a different chart of accounts than their management books.
- **Reporting currency** — a ledger that mirrors the primary ledger's chart of accounts and calendar but restates balances in a different currency, purely for reporting. It is not an independent set of books.

Both exist so a single set of underlying transactions can be viewed through more than one accounting "lens" without re-entering anything.

## Ledger sets

A **ledger set** groups several ledgers that share the same chart of accounts and calendar so you can open journals, run reports, or close periods across all of them in one action instead of repeating the work ledger by ledger. A ledger set does not store its own balances — it is a convenience window onto the ledgers it contains. Solara Fixtures might, for instance, group its US and Canadian primary ledgers into one ledger set if both share a chart of accounts and calendar, even though their functional currencies differ.

## What this course assumes

This course is about **working inside** an already-configured General Ledger — creating and posting journals, running allocations, closing periods — not about building the enterprise structure from scratch. Lesson 5 reviews the chart of accounts and ledger setup you'll be working against for the rest of the course, but the detailed configuration of segments, value sets, and ledgers themselves belongs to an implementation course, not this one.

## Key terms

| Term | Meaning |
|---|---|
| Ledger | The record-keeping structure defined by a chart of accounts, calendar, currency, and accounting method |
| Primary ledger | The ledger of record that financial statements are built from |
| Secondary ledger | An independent companion ledger sharing source transactions, for a different accounting view |
| Reporting currency | A currency-converted mirror of a primary ledger, for reporting only |
| Ledger set | A group of ledgers with a shared chart of accounts and calendar, operated on together |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why can't you change a ledger's chart of accounts after it's saved, and what is the one component of a ledger you *can* still change later?
