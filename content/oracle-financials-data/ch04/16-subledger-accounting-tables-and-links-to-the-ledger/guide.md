# Subledger Accounting Tables and Links to the Ledger

Lesson 15 traced one invoice through the `XLA_` tables as part of a bigger journey. This lesson slows down and looks at those tables on their own terms, because Subledger Accounting (SLA) is not a Payables feature, or an AR feature — it's a single shared engine that every subledger in Oracle Fusion routes through, and understanding it well pays off across every module you'll ever touch in this career path.

## What you'll learn

- Why Subledger Accounting exists as a shared engine rather than per-module logic
- What each core `XLA_` table represents, precisely
- How configurable accounting rules fit into this picture
- Why this shared design is what makes consistent, auditable accounting possible across very different subledgers

## One engine, many subledgers

Before architectures like this existed, each subledger could, in principle, write its own logic for "how do I turn my transactions into GL journal entries." Oracle Fusion instead centralizes that logic in Subledger Accounting, sometimes referred to by its broader name, the Financials Accounting Hub. Payables, Receivables, Fixed Assets, and other subledgers all route through the exact same engine and the exact same core tables. This is why the chain you traced in lesson 15 for an AP invoice would look structurally identical for an AR transaction or a Fixed Assets depreciation run — only the starting source table changes.

## The core tables, precisely

- **`XLA_TRANSACTION_ENTITIES`** — identifies the business transaction (an invoice, a receipt, a depreciation run) in a generic way SLA can work with, regardless of its originating subledger
- **`XLA_EVENTS`** — records each accounting event tied to that transaction entity; one transaction entity can have multiple events across its lifetime as its status changes
- **`XLA_AE_HEADERS`** — the header of the subledger journal entry generated for an event
- **`XLA_AE_LINES`** — the debit/credit lines of that subledger journal entry
- **`XLA_DISTRIBUTION_LINKS`** — the precise tie between a subledger journal line and the source distribution row that caused it

## Where the accounting rules come from

SLA doesn't invent debits and credits out of nowhere. Each ledger has configured accounting rules — effectively, mapping logic that says "for this kind of event, from this kind of transaction, debit this account and credit that one." Those rules are what SLA applies when it turns an `XLA_EVENTS` row into the actual `XLA_AE_HEADERS`/`XLA_AE_LINES` journal entry. This is also exactly why the same kind of transaction can post differently for two different companies on the same Oracle Fusion instance, if their ledgers have different accounting rules configured — the engine is shared, but its configuration isn't.

## Why this design matters

Centralizing accounting logic in one engine means every subledger gets the same auditability for free: you can always trace a journal line back through `XLA_DISTRIBUTION_LINKS` to its source distribution, through `XLA_EVENTS` to the specific business occurrence that triggered it, and through `XLA_TRANSACTION_ENTITIES` back to the original transaction — regardless of whether that transaction started as an AP invoice, an AR receipt, or something else entirely. That consistency is a direct product of the shared-engine design, not something each subledger team had to build and maintain separately.

## Recap

Subledger Accounting is a single shared engine, not a per-module feature, used by Payables, Receivables, Fixed Assets, and more. Its core tables — `XLA_TRANSACTION_ENTITIES`, `XLA_EVENTS`, `XLA_AE_HEADERS`, `XLA_AE_LINES`, and `XLA_DISTRIBUTION_LINKS` — follow the same structure regardless of which subledger originated the transaction, because configurable accounting rules, not hardcoded per-module logic, decide how each event is accounted. Chapter 4 is complete. Next up, Chapter 5: using everything you've learned so far in practice, starting with building your own data map of a practice instance.
