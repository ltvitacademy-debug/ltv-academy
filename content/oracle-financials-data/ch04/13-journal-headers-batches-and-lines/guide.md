# Journal Headers, Batches and Lines

Chapter 3 ended at the edge of the General Ledger — invoices and transactions eventually produce journal entries, but we hadn't yet looked at how GL itself stores those entries. This lesson opens Chapter 4 by doing exactly that: the three-level structure of batches, headers, and lines that every journal entry in Oracle Fusion follows, regardless of which subledger (or human) created it.

## What you'll learn

- The three-level hierarchy: batch, header, line
- What distinguishes a subledger-sourced journal from a manually entered one
- The key columns on each level, and what they store
- Why `JE_SOURCE` is one of the most useful columns in the whole GL model

## Batches: a named group of journals

`GL_JE_BATCHES` represents a batch — a named group of one or more journal entries entered or imported together. A batch carries its own status and posting information, independent of the individual journal entries inside it (a batch can contain several journals, and the batch as a whole is what gets posted as a unit).

## Headers: one journal entry

`GL_JE_HEADERS` stores one row per journal entry. Key columns include `NAME` (how the journal is labeled), `JE_SOURCE` (where the journal came from — more on this below), `JE_CATEGORY` (a classification like Purchases, Payments, Adjustment), `PERIOD_NAME` (which accounting period it posts into), `CURRENCY_CODE`, and `STATUS`. Every journal header belongs to exactly one batch.

## Lines: the actual debits and credits

`GL_JE_LINES` stores the individual debit and credit lines that make up a journal entry. Each line carries a `CODE_COMBINATION_ID`, pointing to the specific chart-of-accounts combination (company, cost center, account, and whatever other segments the chart defines) the line posts to, along with amounts in two forms: `ENTERED_DR`/`ENTERED_CR` (the amount in the transaction's entered currency) and `ACCOUNTED_DR`/`ACCOUNTED_CR` (the amount converted into the ledger's functional currency). For a transaction in a foreign currency, these two pairs of columns can differ; for a transaction already in the ledger's own currency, they match.

## JE_SOURCE: the most useful column in this chapter

Every journal header's `JE_SOURCE` column tells you where the journal actually came from — values like 'Payables', 'Receivables', 'Assets' identify journals generated automatically by a subledger through Subledger Accounting, while a value like 'Manual' or 'Spreadsheet' identifies a journal a person typed directly into GL without ever touching a subledger. This single column is often the fastest way to answer "did this journal come from a real business transaction, or did someone just type it in," which matters enormously when you're investigating why a balance looks the way it does.

## The hierarchy in one view

```
GL_JE_BATCHES (one batch)
    └── GL_JE_HEADERS (one or more journal entries, JE_SOURCE tells you where from)
            └── GL_JE_LINES (debit/credit lines, each hitting one CODE_COMBINATION_ID)
```

## Recap

A batch (`GL_JE_BATCHES`) groups one or more journal headers (`GL_JE_HEADERS`), and each header owns its debit/credit lines (`GL_JE_LINES`), each pointing to a chart-of-accounts combination. `JE_SOURCE` on the header distinguishes subledger-generated journals from manual entries, which is critical context for any investigation. Next up, lesson 14: ledgers, periods, and balances — the structures that give these journal entries meaning over time.
