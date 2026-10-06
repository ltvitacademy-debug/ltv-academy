# Script — Expenses Troubleshooting Practice

## Segment 1 (title)

This lesson is a hands-on walkthrough of three realistic Castellan support tickets, using everything from chapters one through four. Work through each one the way a consultant actually would: find which lifecycle stage the problem lives in before touching any configuration.

## Segment 2 (steps)

The method is simple. Every issue traces back to one of six stages: incur, capture, submit, audit and approve, account, reimburse. A report "stuck" could mean stuck in approval, a BPM routing problem, stuck in accounting, a failed Subledger Accounting rule, or stuck in reimbursement, a failed Payables import - three completely different fixes behind the same complaint.

## Segment 3 (steps)

Ticket one: Jordan's mileage claim came out lower than expected. That's a capture-stage problem - the rate schedule applied during entry. Castellan had updated its rate from sixty-five to sixty-seven cents, but the new schedule's effective date was entered a week too late. Fixing the schedule fixes future claims; Jordan's specific claim still needs its own manual correction, since it already processed under the wrong rate.

## Segment 4 (steps)

Ticket two: Priya's report sat in Pending Approval for two weeks. The BPM Worklist shows it routed correctly to her supervisor Marcus - but he's on leave, and no escalation rule existed for his role, so the task just sat there. That's two problems: a setup gap needing an escalation rule added, and an immediate manual reassignment to unblock Priya's report today.

## Segment 5 (steps)

Ticket three: the GL shows Travel Expense running higher than what Payables shows as actually paid. Using the trail from lesson fifteen, several reports were approved and accounted - so the GL debit posted - but their Payables invoices failed import because of inactive supplier records for recently rehired employees. The fix: reactivate those records and rerun the import. The GL was right all along; the gap was downstream in Payables.

## Segment 6 (outro)

All three tickets resolved faster because the lifecycle and trail knowledge from this course made it obvious where to look first, instead of guessing. That's the real skill: locate the stage, then fix it. Up next, Chapter 5 begins with lesson eighteen: designing expense policy from scratch for a company that has none yet.
