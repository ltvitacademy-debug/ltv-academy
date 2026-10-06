# Cash Advances

Not every employee can comfortably float a company's travel costs on a personal card for weeks before being reimbursed. A **cash advance** is money paid to an employee ahead of a trip, specifically to cover anticipated incidental costs, which then gets netted against the expense report once the employee submits it after the trip.

## What you'll learn

- What a cash advance is for, and what it is not for
- How an advance is requested, approved, and paid
- How an advance gets applied against a later expense report
- What happens if an employee doesn't spend the full advance

## What a cash advance covers

A cash advance is meant for genuinely upfront, hard-to-predict incidental costs — tips, local transportation in a region where cards aren't widely accepted, small purchases on a multi-week assignment. It is not a substitute for a corporate card and is not meant to cover large planned costs like airfare or hotel, which Castellan expects to be booked and paid for directly or through a corporate card ahead of time.

## Requesting and paying an advance

1. The employee submits a **cash advance request** in Expenses, specifying an amount and a business purpose, tied to an upcoming trip or assignment.
2. The request routes for approval, generally to the same manager who approves the employee's expense reports.
3. Once approved, Castellan pays the advance through Payables, the same payment infrastructure used for reimbursements, as a standalone payment to the employee — not an expense item, since nothing has been spent yet.

## Applying an advance to an expense report

When the employee later submits an expense report and an outstanding cash advance exists for them, Expenses intercepts the submission and displays an **Apply Cash Advances** prompt before routing the report for approval. The employee either:

- Selects one or more outstanding advances to apply against the report, or
- Chooses **Don't apply a cash advance**, which requires typing a justification for why none was applied (for example, the advance was for a different, still-upcoming trip).

Cash advances apply at the **expense report level**, not to individual expense lines — there is no way to say "this advance covers only the hotel line."

```
Cash advance example - Castellan field assignment
  Advance issued:              $600.00  (approved, paid via Payables)
  Expense report total:      $1,040.00
  Advance applied:             $600.00
  Net reimbursement to employee: $440.00
```

## What if the employee spends less than the advance?

If Jordan Reyes receives a $600 advance but only incurs $410 of qualifying business expense, the expense report still applies the full $600 advance against the $410 total, producing a **negative net amount** — meaning Jordan owes the company $190. Castellan's system options determine how that gets collected: either a deduction from a future expense reimbursement, a deduction from payroll, or a manual repayment, depending on how the business unit is configured. An outstanding advance with no expense report submitted against it for too long is itself something audit rules and finance operations should monitor (more on audit rules in lesson 10).

## Recap

A cash advance is upfront money for predictable-but-unplanned incidental costs, requested and approved separately from an expense report, and paid through Payables like any other payment. It must later be applied against an expense report at the header level, and if the advance exceeds actual spending, the employee owes the difference back. Next up, lesson 9: corporate cards and how card transactions flow into Expenses automatically.
