# Expenses Troubleshooting Practice

This lesson is a hands-on walkthrough of three realistic Castellan Supply Co. support tickets, using the full lifecycle, audit, approval, and accounting knowledge from Chapters 1 through 4. Work through each one the way a Fusion consultant actually would: identify which stage of the lifecycle the problem lives in before trying to fix anything.

## What you'll learn

- A repeatable method for diagnosing an expense issue by lifecycle stage
- Three worked tickets covering setup, audit, and accounting problems
- Common root causes behind each category of issue
- Why "where in the lifecycle" is almost always the first question to ask

## The method: locate the stage first

Every expense issue ultimately traces back to one of the six lifecycle stages from lesson 1: incur, capture, submit, audit and approve, account, reimburse. Before touching any configuration, ask: at which stage does the reported symptom first appear? A report "stuck" could mean stuck in approval (a BPM routing problem), stuck in accounting (a failed Subledger Accounting rule), or stuck in reimbursement (a failed Payables invoice import) — three completely different fixes.

## Ticket 1: "My mileage claim calculated the wrong amount"

Jordan Reyes submits a 40-mile round-trip mileage claim and the reimbursement comes out lower than expected.

- **Stage:** Capture (the rate schedule applied during entry).
- **Investigation:** Check which mileage rate schedule is active for Jordan's business unit and effective-dated as of the expense date. Castellan had updated its flat rate from $0.65 to $0.67 per mile three weeks earlier, but the new rate schedule was entered with a future effective date one week too late.
- **Fix:** Correct the effective date on the rate schedule. Note this does **not** require touching Jordan's individual expense item — fixing the schedule fixes all future claims; his specific claim still needs a manual correction per lesson 13's rules, since it already processed under the wrong rate.

## Ticket 2: "My report has been sitting in approval for two weeks"

Priya Nandakumar's report shows "Pending Approval" with no movement.

- **Stage:** Audit and approve.
- **Investigation:** Check the BPM Worklist for the report's history. It shows the report routed correctly to her supervisor, Marcus Webb — but Marcus has been out on leave, and no escalation rule was configured for his role, so the task simply sat in his queue with no automatic forward.
- **Fix:** This is a setup gap, not a one-time error: the approval rule configuration needs an escalation rule added (lesson 11) so this doesn't recur. For Priya's immediate report, a manual reassignment in the BPM Worklist unblocks her specific case today.

## Ticket 3: "The GL shows Travel Expense way higher than Payables shows paid"

An AP analyst notices the Travel & Lodging Expense account balance doesn't match the sum of related Payables payments for the month.

- **Stage:** Account / Reimburse boundary.
- **Investigation:** Using the trail from lesson 15, several expense reports were approved and accounted (so the GL debit already posted) but their resulting Payables invoices failed import — the Import Payables Invoices Report shows them failing due to an inactive supplier (employee) record for three recently-rehired employees whose old supplier record hadn't been reactivated.
- **Fix:** Reactivate the affected employee supplier records, then rerun the import for the failed invoices. The GL entries were correct all along; the gap was downstream in Payables, exactly the kind of cross-system tracing lesson 15 described.

## Recap

Diagnosing an Expenses problem starts with locating the lifecycle stage, since the same symptom ("nothing's happening") can originate in capture, approval, accounting, or payment, each needing a different fix. All three tickets here resolved faster because the underlying lifecycle and trail knowledge from this course made it obvious where to look first, rather than guessing. Next up, Chapter 5 begins with lesson 18: designing expense policy from scratch for a company that has none yet.
