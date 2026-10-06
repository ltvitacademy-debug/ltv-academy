# Automatic Reconciliation

With rule sets and matching rules defined, the next question is: what actually runs them? This lesson covers the Automatic Reconciliation process — when to use it, how it behaves, and what it leaves behind for a human to handle.

## What you'll learn

- What the automatic reconciliation process does, step by step
- When automatic reconciliation is the right fit, versus manual
- What happens to lines it can't confidently match
- How to review the results of a run

## What the process does

**Automatic reconciliation** takes the imported, unreconciled lines on a bank statement and attempts to match them against open system transactions (Payables payments, Receivables receipts, external transactions, and so on), using the reconciliation rule set attached to that bank account. For each candidate pair (or group, for one-to-many/many-to-many rules), it checks whether the matching criteria align — exactly, or within an associated tolerance for one-to-one rules — and if so, reconciles them automatically, with no manual intervention.

## When it's the right fit

Automatic reconciliation is "ideally suited for bank accounts that have a high volume of transactions" — think a general operating account processing hundreds of receipts and disbursements a day. The value proposition is straightforward: a well-tuned set of matching rules can reconcile the overwhelming majority of routine, correctly-coded transactions without anyone touching them, leaving staff time for the exceptions that actually need judgment.

It is a poor fit, by contrast, for accounts with very few transactions a month, where the overhead of building and maintaining matching rules outweighs the time saved — Lesson 11 covers manual reconciliation, which suits those accounts better.

## What it can and can't resolve

Automatic reconciliation only reconciles what the configured rules can confidently match. Lines that don't find a matching counterpart — because the transaction hasn't been recorded in Oracle yet, because the amounts fall outside any tolerance, or because no rule covers that transaction source — are left unreconciled and surface as **exceptions** for manual review. The process does not guess, invent a match, or force a reconciliation that doesn't actually satisfy the rule; it is deliberately conservative, since an incorrect automatic match would be worse than an unresolved exception.

## Running and reviewing

Automatic reconciliation can run on a schedule (for example, right after the nightly Load/Import cycle from Lesson 6) or be triggered manually. After a run, a Cash Manager reviews the results: how many lines reconciled automatically, and what's left in the exception queue. That exception queue is exactly where manual reconciliation (Lesson 11) picks up.

## A worked example

Harborview Metals Inc. runs automatic reconciliation nightly on its operating account, right after statement import. On a typical night, 480 of 500 statement lines reconcile automatically under its one-to-one matching rule with the $0.02 tolerance from Lesson 9. The remaining 20 — a mix of bank charges with no system counterpart, and two receipts that haven't posted in Receivables yet — fall into the exception queue for the Treasury team to review manually the next morning.

## Key terms

| Term | Meaning |
|---|---|
| Automatic reconciliation | The process that matches statement lines to system transactions using configured rules, without manual intervention |
| Exception | A statement line automatic reconciliation couldn't confidently match |

## Recap

Automatic reconciliation applies a bank account's rule set to its unreconciled statement lines, matching what it confidently can and leaving the rest as exceptions — it's the right tool for high-volume accounts, not low-volume ones. Next up, lesson 11: manual reconciliation, and how a human picks up where automatic reconciliation leaves off.
