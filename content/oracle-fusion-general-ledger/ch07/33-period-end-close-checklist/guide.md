# Period-End Close Checklist

**Chapter 7 · Period Close · Lesson 33 of 37**

## What you'll learn

- The correct subledger-to-GL closing sequence, and why order matters
- The specific tasks a General Ledger close checklist includes
- Why General Ledger closes last, not first
- How this chapter ties together everything from Chapters 1–6

## Everything in this course has been building toward this chapter

Ledgers and journals (Chapters 1–2), approvals and import (Chapter 3), automation (Chapter 4), balances and monitoring (Chapter 5), and multi-currency/multi-entity (Chapter 6) are all things that happen *during* a period. Chapter 7 is about the deliberate, sequenced process of actually closing one — turning "the period's activity is recorded" into "the period's books are final and ready for the next one."

## The closing sequence: subledgers before GL

A company runs multiple modules — Payables, Receivables, Fixed Assets, Cash Management, and General Ledger — and they don't close in random order. The standard sequence is: **Inventory** closes first (and typically cannot be reopened), then **Payables/Purchasing**, then **Receivables** (which can be reopened if needed), then **Fixed Assets** (close only, no further posting), **Cash Management** (which generally doesn't require a formal close step), and **General Ledger last** — because GL is where every subledger's activity ultimately lands, and it can't be considered final until everything feeding it is final too, and because GL remains the one period a controller can still reopen if something is discovered.

## What the General Ledger close checklist actually covers

For **LTV Manufacturing Corporation**'s March 2026 close, a controller works through:

1. **Confirm subledgers are closed** — Payables, Receivables, Fixed Assets have all completed their own close steps first
2. **Review account balances** — pull trial balances, general journals, and account analysis reports (Chapter 5) and scan for anything unexpected
3. **Reconcile subledgers to GL** — confirm the Payables subledger balance matches the GL Accounts Payable control account balance, and so on for each subledger; investigate and correct any difference that isn't explainable
4. **Review key system accounts** — confirm accounts like Creditors Control, Debtors Control, and Intercompany accounts (Chapter 6) haven't been hit by stray ad hoc manual journals that bypassed the normal subledger flow
5. **Post all pending journals** — clear anything sitting unposted, covered in depth in lesson 34
6. **Run final reports** — trial balance, account analysis, and the Intercompany Reconciliation Report if the ledger has intercompany activity
7. **Close the period** — change the period's status from Open to Closed in Manage Accounting Period (covered fully in lesson 35)

## Why this is a checklist, not a single button

Nothing in this sequence can be meaningfully skipped by clicking faster — each step either depends on the one before it, or exists specifically to catch a category of error the automated posting process cannot catch on its own. A controller who closes a period without reconciling subledgers to GL has not actually confirmed the books are right; they've only confirmed nothing errored out mechanically.

## Key terms

| Term | Meaning |
|---|---|
| Closing sequence | The required order in which subledgers and GL close, GL always last |
| Subledger-to-GL reconciliation | Confirming a subledger's own balance matches its GL control account |
| Key system accounts | Control accounts (AP, AR, Intercompany) at risk from stray manual journals |

## Recap

Period close is a deliberate, sequenced process — subledgers close first, General Ledger closes last, and the GL checklist itself runs through reconciliation, review, posting, and final reporting before the period status changes. Next up, lesson 34: Reviewing Unposted and Error Journals, a deep look at step 5 of this checklist.
