# Drilling Down to Subledger Detail

**Chapter 5 · Balances, Inquiries and Monitoring · Lesson 27 of 37**

## What you'll learn

- The complete drill path from a GL balance to its originating business transaction
- What Subledger Accounting is, and why GL journals often aren't the "first" record
- How to read the stops along the way: balance, journal line, subledger journal entry, subledger transaction
- Why this path matters more for subledger-sourced journals than for manual ones

## Every chapter-5 tool leads here

Account balances (lesson 22), Account Monitor (23), Account Inspector (24), and journal reports (26) all exist to get a reviewer to the same place eventually: a specific question about a specific transaction. This lesson is the full path that answers it — from a summarized balance all the way down to the business document that started everything.

## Why most journals aren't the origin point

A manual journal, like the ones built in Chapter 2, *is* its own origin — a person typed it directly. But most of the dollar volume flowing through General Ledger at a real company like **LTV Manufacturing Corporation** doesn't start there. It starts in a subledger — Payables records a supplier invoice, Receivables records a customer invoice, Fixed Assets records depreciation — and **Subledger Accounting (SLA)** is the engine that takes each of those subledger transactions and generates the accounting (the debits and credits) that eventually land in General Ledger as a journal. The GL journal, in that case, is a *summary* of subledger activity, not the first or most detailed record of what happened.

## The drill path, stop by stop

1. **Account balance** — where lesson 22's inquiry starts: a PTD or YTD total for an account combination.
2. **Journal lines** — drilling on that balance opens the Journal Lines page, showing the individual journal lines that sum to it, each tagged with its journal source, category, and (if it came from a subledger) a reference back to that source.
3. **Journal entry / subledger journal entry** — from a journal line, a reviewer can open the full journal entry, and if the line originated in Subledger Accounting, drill into the **subledger journal entry** that generated it — this is where the accounting rules that produced the debit and credit actually live.
4. **Subledger transaction** — the final stop: the original business document — the supplier invoice number, the customer invoice number, the specific asset being depreciated — that triggered the whole chain.

For LTV Manufacturing Corporation, a Utilities Expense journal line that looks unusual might trace back cleanly to a manual journal with a clear explanation. But an Accounts Payable liability balance that looks off will drill through journal lines, into a subledger journal entry, and land on a specific supplier invoice — the only place that actually explains the number.

## Why this is worth mastering before Accounts Payable

This drill path is the single most practical day-to-day skill a General Ledger consultant uses, and it's also the bridge into the next course. Everything about how a subledger transaction becomes a GL journal — invoice validation, accounting rules, distribution — is covered properly once you're inside that subledger. Chapter 5 has given you the GL side of that bridge: knowing how to start from a balance and walk backward to the document that explains it.

## Key terms

| Term | Meaning |
|---|---|
| Subledger Accounting (SLA) | The engine that generates accounting from subledger transactions, which then posts to GL |
| Subledger journal entry | The accounting record SLA creates, sitting between a GL journal line and the original transaction |
| Subledger transaction | The original business document (invoice, asset, receipt) that started the chain |

## Recap

Drilling from a GL balance to its origin follows a consistent path: balance, journal lines, journal entry (or subledger journal entry), and finally the subledger transaction itself — the only place that truly explains a number sourced from a subledger. This closes Chapter 5. Chapter 6 shifts to Multi-Currency and Multi-Entity, starting with lesson 28: Foreign Currency Journals.
