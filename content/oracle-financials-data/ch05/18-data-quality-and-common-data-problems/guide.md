# Data Quality and Common Data Problems

This course closes with the problems you'll actually run into once you start querying and analyzing real Oracle Fusion financial data, rather than reading about it in the abstract. None of these are exotic — they're the predictable, recurring issues that catch consultants who understand individual tables but haven't yet developed the instinct to question what a query is really telling them.

## What you'll learn

- Why duplicate party records happen, and why they're a TCA-specific headache
- How to spot a transaction that's stuck, rather than just slow
- Why mixing entered and accounted currency amounts produces quiet, wrong totals
- Why relying on a cached status flag instead of an authoritative amount is a recurring trap
- What multi-org "bleed" is, and why it's an easy mistake to make without noticing

## Duplicate party records

Because `HZ_PARTIES` is entered by people, not generated programmatically, the same real-world company can end up as two (or more) separate party rows — one entered as "Acme Corp" and another as "Acme Corporation," or with a slightly different address format. This is a classic Trading Community Architecture pain point: once duplicates exist, transactions and balances for what should be one customer or supplier get split across two identities, understating or confusing totals without any obvious error appearing anywhere.

## Stuck transactions

A transaction that's been "validated" but never actually accounted — visible as an `XLA_EVENTS` row with no corresponding `XLA_AE_HEADERS` row — usually means something in the configured accounting rules or mapping didn't match the transaction's specific combination of attributes. This isn't a performance issue; it's a configuration gap, and the symptom (a transaction that looks fine at the header level but never reaches GL) is exactly why lesson 15's end-to-end trace is a genuinely useful diagnostic skill, not just an academic exercise.

## Mixing entered and accounted amounts

Lesson 13 introduced `ENTERED_DR`/`ENTERED_CR` versus `ACCOUNTED_DR`/`ACCOUNTED_CR` on `GL_JE_LINES`. Summing the wrong pair — entered amounts across transactions in different currencies, for instance — produces a total that looks plausible but is quietly meaningless, because you're adding numbers that aren't actually in the same unit. This is one of the easiest mistakes to make and one of the hardest to notice, because the query runs without error and returns a number that looks like a real total.

## Trusting a flag instead of an authoritative amount

Lesson 12 covered this directly: AR's `AR_PAYMENT_SCHEDULES_ALL.STATUS` can read OPEN while the actual remaining balance is negligible, and AP's header status says nothing about payment at all. Building a report around a convenient-looking status column, instead of the amount or table that's actually authoritative for the question being asked, is one of the most common and avoidable sources of a wrong answer in this entire data model.

## Multi-org bleed

Chapter 1 introduced the `_ALL` suffix as a signal that a table spans every business unit. The recurring mistake is forgetting to filter or join by business unit on one of these tables, which silently combines rows from unrelated parts of the business into a single result — a total that's too high, a count that's meaningless, with no error message to flag it.

## Recap

Duplicate parties, stuck transactions, mixed currency columns, trusted-but-wrong status flags, and multi-org bleed are the recurring, avoidable problems behind most bad numbers pulled from this data model. Every one of them is something you now have the vocabulary and the tables to actually investigate. That closes Oracle Financials Data. The next course in the Reporting & Data stage is SQL for Oracle Financials, where you'll put these exact tables to work writing real queries — starting with that same example challenge: finding every unpaid supplier invoice over $10,000 that's more than 30 days old.
