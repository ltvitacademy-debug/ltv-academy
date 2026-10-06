# Corporate Card Reconciliation

This final lesson closes the loop on corporate cards from lesson 9. Reconciliation is the ongoing discipline of making sure every dollar the card issuer bills Castellan Supply Co. is accounted for somewhere — attached to an approved expense report, actively in process, or flagged as a genuine exception — with nothing quietly falling through the cracks.

## What you'll learn

- The three-way match behind corporate card reconciliation
- A monthly reconciliation routine a consultant would set up for a client
- Common reconciliation exceptions and how each gets resolved
- How this lesson's skills tie together the whole course

## The three-way match

Corporate card reconciliation compares three numbers that should, in a healthy program, all agree over time:

1. **What the card issuer billed** — the total on the issuer's statement for the billing period.
2. **What arrived in Expenses as transactions** — the sum of the transaction feed for the same period (lesson 9).
3. **What has been attached to submitted, approved expense reports** — the sum of card-sourced items that have actually completed the lifecycle.

```
Monthly reconciliation - Castellan US Operations (illustrative)
  Issuer statement total:            $184,620.00
  Transactions received in feed:     $184,620.00   <- matches (1)
  Attached to approved reports:      $179,310.00   <- gap of $5,310.00
```

A perfect program would have all three numbers converge to zero gap over a short lag (the time between a charge happening and an employee submitting a report). A persistent, growing gap is the signal something is wrong — not with any single transaction necessarily, but with the program's operational health.

## A monthly reconciliation routine

A consultant typically sets up a repeatable monthly process:

1. Pull the **Corporate Card Transactions Report** (lesson 16) for the period.
2. Identify transactions still unassigned past the aging threshold (lesson 9's 30-day flag).
3. Cross-reference those against the employee-level audit list (lesson 10) — repeat offenders on unassigned transactions often overlap with repeat missing-receipt employees, since both reflect the same underlying habit of deferring documentation.
4. Escalate aged, unassigned transactions to the employee's manager with a specific deadline, rather than letting Finance chase indefinitely.
5. For employees who've left the company with unassigned transactions still outstanding, route to HR/Finance offboarding procedures, since a departed employee can't submit a report after exiting.

## Common exceptions and resolutions

- **Disputed charge** — the employee claims a charge is fraudulent or incorrect; this routes to the card issuer's dispute process, outside Expenses entirely, and the transaction is held separately until resolved.
- **Duplicate feed transaction** — rare data issue where the same charge appears twice in the feed; a consultant works with the card issuer's technical contact, since this indicates a feed configuration problem, not an employee error.
- **Terminated employee, unassigned balance** — resolved through payroll offset or direct collection, following the company's offboarding policy, often the same recovery mechanism used for cash advance overages in lesson 8.

## Recap

Corporate card reconciliation is a three-way match between what the issuer billed, what Expenses received, and what has actually completed the lifecycle into an approved report — and a persistent gap signals an operational problem worth investigating, not a one-off error. This closes Oracle Fusion Expenses. You've now covered the full expense lifecycle: setup, submission, audit and approval, accounting, reporting, and real-world policy design. Next up: Oracle Fusion Procure-to-Pay, the first course in the End-to-End Business Processes stage, where you'll follow a single purchase transaction from requisition all the way to payment across multiple modules at once.
