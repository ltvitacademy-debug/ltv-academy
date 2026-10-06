# Ledgers: Primary, Secondary and Reporting

If the legal entity is the "who," the ledger is the "book." This lesson covers the three kinds of ledger Oracle Fusion supports, and the four defining characteristics every ledger needs — often remembered as the "four Cs."

## What you'll learn

- The four defining characteristics of any ledger
- What a primary ledger is, and why every accounting configuration needs exactly one
- What secondary ledgers and reporting currencies add, and when each is used
- How to tell the three ledger types apart quickly

## The four Cs of a ledger

Every ledger in Oracle Fusion, no matter its type, is defined by four things:

```
Chart of Accounts   — the segment structure used to classify transactions
Calendar             — the accounting periods and fiscal year
Currency             — the ledger's functional currency
accounting method (Convention) — the subledger accounting rules applied
```

This combination is sometimes called the ledger's "4 Cs." Two ledgers that share all four are candidates for a ledger set (covered next lesson); two ledgers that differ in even one are, by definition, accounting for things differently.

## The primary ledger

The **primary ledger** is the main, mandatory record-keeping ledger for an accounting configuration. Every accounting configuration — the complete set of ledgers tied to one or more legal entities — is built around exactly one primary ledger. It is directly linked to subledger transactions (from Payables, Receivables, and the rest) and provides their accounting context. If a company only needs to report its results one way, in one currency, under one set of accounting rules, a primary ledger alone is enough.

## Secondary ledgers

A **secondary ledger** is optional, and is always associated with a primary ledger. It exists to maintain an **alternative accounting representation** of the same underlying business activity — for example, the primary ledger might follow U.S. GAAP while a secondary ledger follows IFRS, or the primary ledger might use one chart of accounts while a secondary ledger uses a different one for a specific statutory requirement. A secondary ledger can differ from its primary ledger in chart of accounts, calendar or period type, currency, subledger accounting method, or ledger processing options — any one or more of the 4 Cs.

## Reporting currencies

A **reporting currency** is an optional, additional *currency* representation of either a primary or a secondary ledger — it is not a different accounting method or chart of accounts, just the same ledger's data, restated in another currency, for reporting to stakeholders who need numbers in that currency. Think of a reporting currency as "the same book, translated," rather than "a different book."

## Telling them apart quickly

```
Primary Ledger     — mandatory, one per accounting configuration
Secondary Ledger    — optional, alternate accounting representation
Reporting Currency  — optional, same ledger restated in another currency
```

## Recap

Every ledger is defined by its chart of accounts, calendar, currency, and accounting method — the 4 Cs. A primary ledger is mandatory and central; secondary ledgers add alternate accounting representations; reporting currencies simply restate a ledger's numbers in another currency. Next up, lesson 8: ledger sets, which let you manage multiple ledgers that share enough of these characteristics together.
