# Businesses, Entities and the Books

Before diving into debits and credits, there's one more foundational idea to put in place: the concept of an **entity**, and why every entity keeps its own separate set of books. This idea maps almost directly onto a core Oracle Fusion Financials concept you'll meet constantly once you're inside the software: the **ledger**.

## What you'll learn

- What a "business entity" means in accounting, and why it matters
- The common legal structures businesses take, and how that affects their books
- The principle that a business's books are kept separate from its owner's personal finances
- How this maps to "ledgers" inside Oracle Fusion

## The entity concept

Accounting assumes that a business is a distinct unit, separate from its owners, its other businesses under the same parent, and everyone else. This is called the **economic entity assumption** (sometimes called the business entity concept). It means a company's books only record *that company's* transactions — not the owner's personal grocery bill, not a sister company's payroll, not a customer's unrelated finances.

This sounds obvious, but it's easy to violate in small businesses: an owner who pays a personal credit card bill from the company checking account has just mixed personal and business transactions. Good accounting practice — and most accounting software, including Oracle Fusion — strictly separates entities so the books of one never contaminate the books of another.

## Common legal structures

How a business is legally organized affects some accounting details (particularly around equity), though the core mechanics stay the same:

- **Sole proprietorship**: one owner, business and owner are legally the same, but the books are still kept separately for accounting purposes.
- **Partnership**: two or more owners sharing profits, losses, and equity according to an agreement.
- **Corporation**: a legally separate entity from its owners (shareholders), who hold stock; the corporation's equity section reflects stock issued and retained earnings.

A single real-world company might actually consist of *multiple* legal entities — a parent corporation and several subsidiaries, for example — and each of those entities typically keeps its own books, which later get combined ("consolidated") for overall reporting.

## Why a business keeps "the books"

"The books" is a shorthand for the complete, organized record of a business's financial transactions: every journal entry, every account balance, everything needed to produce financial statements. Historically this was a physical ledger book; today it's a database inside an accounting system. Regardless of the technology, the purpose is the same: a complete, auditable trail of what happened financially, organized by entity.

## How this maps to Oracle Fusion: the ledger

In Oracle Fusion Financials, a **ledger** is the structure that represents one accounting "book" for one entity (or a reporting view of one). Each ledger is defined by three things that must stay consistent within it:

- A **chart of accounts** — the structure used to classify transactions (more on this once we reach journal entries)
- A **currency** — the currency that ledger's balances are kept in
- A **calendar** — the fiscal periods used for reporting

A company operating in the US and in Germany, for example, would typically need at least two separate ledgers: one in US dollars on a US fiscal calendar, one in euros on a calendar that might differ. This is the entity concept, implemented directly as software architecture — which is exactly why understanding the accounting idea first makes the Oracle Fusion configuration make sense later, instead of feeling like arbitrary setup screens.

## Recap

An entity is a distinct accounting unit whose books record only its own transactions, regardless of its legal structure (sole proprietorship, partnership, or corporation). "The books" is the complete financial record of that entity. In Oracle Fusion, this concept becomes the ledger — a chart of accounts, a currency, and a calendar, all belonging to one entity. That closes out Chapter 1. Next up, Chapter 2 and lesson 4: debits and credits explained, the mechanics behind every transaction you've been reading about so far.
