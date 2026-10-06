# Expenses to Payables to General Ledger

Lesson 14 showed the accounting entry Expenses itself generates. This lesson follows one single expense item all the way from submission to its final resting place in the General Ledger, tying together everything from lessons 12 and 14 into one continuous trail — exactly the kind of tracing a consultant needs to be able to do when a client asks "why does the GL show this number?"

## What you'll learn

- The full document trail: expense item to GL journal
- Where each stage leaves its own record for troubleshooting
- Why three different "systems" (Expenses, Payables, GL) each keep a piece of the trail
- How to trace a number backward from a financial statement

## The full trail, one item at a time

Follow Marcus Webb's $410 client dinner from lesson 4 through to the ledger:

1. **Expense item** (Expenses) — Marcus enters "Business Meal — Client Present," $410.00, with a justification for the over-policy amount. Record lives in Expenses' own tables, tied to his expense report.
2. **Audit and approval** (Expenses/BPM) — the item is flagged, audited, and approved, as covered in lessons 10–11. The audit note and the approval history both stay attached to the report permanently.
3. **Accounting event** (Subledger Accounting) — once approved, SLA creates the accounting event: debit Client Entertainment Expense $410.00, credit Employee Expense Payable $410.00. This event has its own identifier, separate from the original expense item, and is what actually drives the journal.
4. **Payables invoice** (Payables) — Process Expense Reimbursement creates a standard Payables invoice for $410.00, payee Marcus Webb, carrying a reference back to the originating expense report.
5. **Payment** (Payables) — a Payment Process Request eventually pays that invoice, generating its own payment accounting entry (debit Employee Expense Payable, credit Cash) that clears the liability created in step 3.
6. **General Ledger** (GL) — both the step-3 accounting event and the step-5 payment entry post as journal entries to the GL, appearing on the trial balance and, ultimately, inside whatever natural account rolls up into the income statement line a CFO reads.

```
Trail summary - Marcus's $410 client dinner (illustrative)
  Expense item       -> Expenses
  Audit + approval    -> Expenses / BPM
  Accounting event   -> Subledger Accounting
  Payables invoice    -> Payables
  Payment             -> Payables
  GL journal entries  -> General Ledger
```

## Why three systems, not one

Each stage keeps its own record because each one answers a different question. Expenses answers "what did the employee claim and was it approved?" Payables answers "has this actually been paid, and to whom?" The General Ledger answers "what does this do to the company's financial position?" A consultant troubleshooting a discrepancy has to know which system holds which answer — if a report shows approved but a vendor (in this case, Marcus) says he hasn't been paid, the issue is almost certainly somewhere in the Payables payment process, not back in Expenses.

## Tracing backward from the financial statement

In practice, a consultant more often works this trail in reverse: the CFO sees the Travel & Entertainment line is higher than expected this quarter, and the consultant has to trace from the GL balance, back through the accounting events in SLA, back to the individual expense reports and items that drove it — the same backward-tracing skill from the GL and Payables courses, just applied to a new source system.

## Recap

A single expense item leaves a trail across three systems: Expenses (claim, audit, approval), Subledger Accounting and Payables (accounting event, invoice, payment), and the General Ledger (final journal entries). Each system answers a different question, and tracing in either direction — forward from submission or backward from a financial statement — depends on understanding which stage produced which record. Next up, lesson 16: using Oracle's reporting tools to analyze expense data instead of tracing one item at a time.
