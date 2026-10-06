# Script — Ticket: Expense Report Is Stuck in Approval

## Segment 1 (title)

Harbor & Vance Logistics, ticket forty-six-ninety-five. An employee submitted an expense report four days ago. It's not approved, not rejected, not pending with anyone — just stuck saying In Progress.

## Segment 2 (steps)

Everything so far in this course has been data, setup, or an accounting pipeline. This one's different — it's a workflow problem. Expenses approval runs on rules built with Oracle's approvals management extensions, routing a report to a built approver chain. There's no balance or journal to check here. The evidence lives somewhere else entirely: the BPM Worklist.

## Segment 3 (steps)

Opening BPM Worklist as an administrator and pulling this report's routing history: the approval process tried to build an approver chain and never successfully assigned anyone — which matches exactly what the employee's seeing, nothing pending with anyone. Checking the employee's HR record, since manager-based rules route off the submitter's assigned manager: the manager field is blank. They were recently transferred between departments, and the new manager assignment never got completed.

## Segment 4 (code)

Here's the rule logic that explains it: each report has to satisfy exactly one rule in its rule set. With no manager on record, the standard route-to-manager rule has nothing to route to — so the process can't build a chain, and the report just sits unresolved instead of failing with a clear error.

## Segment 5 (outro)

This needs an HR fix, not an Expenses fix: assign the correct manager, then withdraw and resubmit the stuck report so it re-evaluates the rule with complete information. Resolution note should recommend HR and Expenses coordinate so a department transfer includes the manager reassignment before the next submission, not after a ticket gets raised. Up next, lesson twenty-four: a user who can't access a business unit at all.
