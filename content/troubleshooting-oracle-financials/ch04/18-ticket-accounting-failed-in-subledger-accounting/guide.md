# Ticket: Accounting Failed in Subledger Accounting

**Chapter 4 · General Ledger and Subledger Tickets · Lesson 3 of 5**

## What you'll learn

- Where Create Accounting sits, and what kind of errors are specific to Subledger Accounting (SLA) itself
- A real SLA error: intracompany balancing without a matching rule
- The Accounting Event Diagnostic report, and when to reach for it
- A resolution note for a setup gap that only shows up in a specific transaction shape

## A different layer than Lessons 16-17

Lessons 16 and 17 covered GL-side problems: a journal already in GL that wouldn't post, and rows that never made it into GL in the first place. This ticket is one layer further upstream, inside **Subledger Accounting** itself — the Create Accounting process can fail before a journal entry is even generated, for reasons specific to SLA's own accounting rules, not the GL account structure.

## The ticket

> **Ticket #40561 — Cascade Outdoor Supply.** AR lead reports: "Create Accounting failed on a batch of receipts. The error mentions balancing, and I don't understand what it means." Severity: Medium.

## Investigating

1. **Read the actual error.** *"The subledger journal entry doesn't balance by balancing segment."*
2. **Find what's different about these specific receipts.** All of the failed receipts were applied to transactions in a **foreign currency**, and all involve **intracompany** activity — the receipt settles a receivable recorded under one balancing segment (legal entity/division) for a transaction originally billed under a different one.
3. **Check the setup this depends on.** Intracompany balancing is enabled for this ledger, but no intracompany balancing rule exists for the combination of ledger, source "Receivables," and journal category "Receipts" — so SLA has no instruction for how to create the automatic balancing lines this specific transaction shape requires.

## Root cause

Intracompany balancing is turned on for the ledger, but the specific intracompany balancing rule needed for Receivables receipts was never defined, so Subledger Accounting cannot generate a balanced journal entry for any receipt that crosses balancing segments — which only shows up for this particular combination of foreign currency and intracompany activity, not for ordinary domestic receipts.

## Resolving it

1. **Review the transaction data using the Accounting Event Diagnostic report**, which shows exactly which source values SLA referenced (and didn't find a rule for) while attempting to create the entry — this is the right tool specifically for "the accounting rule or the data wasn't what SLA expected," as opposed to a GL account-structure problem.
2. **Define the missing intracompany balancing rule** for ledger + Receivables + Receipts (working with whoever owns ledger setup, since this is a setup gap, not a data-entry mistake on any individual receipt).
3. **Re-run Create Accounting** for the failed batch.

## Documenting it

> **Ticket #40561 — Cascade Outdoor Supply.** Create Accounting failed on a batch of receipts with a balancing-segment error.
> **Root cause:** Intracompany balancing is enabled for the ledger, but no intracompany balancing rule was defined for Receivables/Receipts, so SLA could not generate balancing lines for receipts crossing balancing segments (all affected receipts were foreign-currency, intracompany transactions).
> **Fix:** Defined the missing intracompany balancing rule for this ledger, source, and journal category; re-ran Create Accounting for the failed batch.
> **Verified:** All receipts in the batch accounted successfully on re-run with no balancing errors.
> **Note:** Recommend reviewing other sources (e.g., Payables) for the same missing intracompany rule before similar transactions are attempted there.

## Key terms

| Term | Meaning |
|---|---|
| Create Accounting | The SLA process that generates journal entries from subledger transactions |
| Intracompany balancing rule | Setup telling SLA how to generate balancing lines when a transaction crosses balancing segments |
| Accounting Event Diagnostic report | A report showing exactly what source data SLA referenced while attempting to create an entry |

## Check yourself

Why did this error only appear on foreign-currency, intracompany receipts, and not on every receipt in the batch?
