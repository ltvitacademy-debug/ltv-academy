# Intercompany Transactions

**Chapter 6 · Multi-Currency and Multi-Entity · Lesson 31 of 37**

## What you'll learn

- What makes a journal "intercompany," and how it differs from an intracompany journal
- How the balancing segment identifies which legal entity a line belongs to
- How intercompany balancing rules generate the offsetting receivable/payable lines
- Why unreconciled intercompany balances are a common close-blocking problem

## When a journal crosses a legal entity

Chapter 1 introduced the **balancing segment** of the chart of accounts — typically the value that represents a legal entity or company. Most journals have every line sharing the same balancing segment value: one company's transaction, recorded entirely within that company. An **intercompany transaction** is different: it has lines belonging to *more than one* balancing segment value — one legal entity owes or is owed by another, within the same consolidated group.

A common real-world example at **LTV Manufacturing Corporation**: the US parent's IT department provides shared services to LTV Manufacturing UK Ltd, and allocates $4,000 of that cost to the UK entity for March. That single business event touches two legal entities' books.

## Intracompany vs. intercompany

- **Intracompany** — a journal crosses *balancing segment values within the same legal entity* (for example, two divisions of the same company). This still needs to balance by division, but it's one legal entity's books.
- **Intercompany** — a journal crosses *different legal entities*. Each legal entity's own set of books must stay in balance on its own, which means the system has to generate offsetting lines, not just split an existing one.

## How the system keeps each entity's books balanced

When a journal line debits an expense in the UK entity but the cash or service actually came from the US entity, Oracle Fusion's **intercompany balancing rules** automatically generate the missing offsetting lines — an intercompany receivable in the US entity's books, and an intercompany payable in the UK entity's books — so that *each* legal entity's own books stay in balance independently, even though the original transaction only directly specified one side.

```
IT allocation, $4,000, US -> UK:

US entity (legal entity 01):
  Dr  Intercompany Receivable (UK)      4,000
  Cr  IT Service Revenue (intercompany) 4,000

UK entity (legal entity 02):
  Dr  IT Expense                        4,000
  Cr  Intercompany Payable (US)         4,000
```

Balancing rules are configured by pairs of legal entities (or ledgers, or balancing segment values), specifying exactly which receivable and payable accounts to use for that pair — set up once, applied automatically every time a transaction crosses that same pair of entities.

## Why intercompany balances cause close delays

Because each side is generated and maintained independently, the US entity's Intercompany Receivable (UK) balance and the UK entity's Intercompany Payable (US) balance should always net to zero across the group — but timing differences, FX rate differences on the same transaction recorded in two currencies, or a manual journal posted to only one side can throw them out of balance. An **Intercompany Reconciliation Report** is run specifically to catch this before period close, which is why Chapter 7's close checklist calls it out explicitly as a required step, not an optional one.

## Key terms

| Term | Meaning |
|---|---|
| Intracompany | A journal crossing balancing segment values within one legal entity |
| Intercompany | A journal crossing different legal entities within the group |
| Intercompany balancing rules | Setup that auto-generates offsetting receivable/payable lines by legal entity pair |

## Recap

An intercompany transaction crosses legal entities, and Oracle Fusion's balancing rules automatically generate the offsetting receivable and payable lines needed to keep each entity's own books in balance — but those balances must be reconciled before close, since timing and FX differences can leave them out of sync. Next up, lesson 32: Consolidation Concepts, where these same intercompany balances get eliminated entirely for group reporting.
