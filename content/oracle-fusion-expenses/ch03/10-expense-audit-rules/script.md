# Script — Expense Audit Rules

## Segment 1 (title)

Earlier lessons kept referring to reports or employees getting flagged for audit. This is where we actually configure that behavior. Audit rules are the automated checks that decide which reports need a human auditor's eyes before reimbursement, separate from manager approval.

## Segment 2 (steps)

On the Create Audit List Rule page, a consultant picks criteria that together form an audit list rule. Common criteria: an item exceeds a dollar threshold, a policy violation flag is present, missing-receipt declarations exceed a count in a rolling period, the expense type is on a high-risk list like client entertainment, or a corporate card transaction has sat unassigned too long.

## Segment 3 (steps)

Some rules evaluate one report in isolation - an item over a thousand dollars is true or false regardless of history. Others look backward across an employee's pattern - three missing-receipt declarations in ninety days requires checking multiple reports, not just the current one. Castellan uses both: report-level rules catch one-off problems immediately, employee-level rules catch people quietly working around policy over time.

## Segment 4 (steps)

When a rule triggers, Expenses can take one of several actions. Complete audit routes the report to an auditor's worklist. Reject sends it straight back to the employee for clear-cut violations needing no judgment call. Request more information asks for a specific clarification. Waive receipts, or waive and complete audit, gets used selectively for trusted long-tenured employees.

## Segment 5 (code)

Here's a high-value hotel rule: the expense type is Hotel and the amount exceeds four hundred dollars a night. The action is complete audit, so the report routes to the Expense Auditor worklist before it can even reach approval.

## Segment 6 (outro)

Picture Dana, a regional director, submitting a four sixty a night hotel charge plus two missing-receipt declarations on the same trip. Both rules trigger, the report lands on the audit list, and an auditor reviews her pre-approval email and the receipt declarations before clearing it - all before it ever reaches her manager. Up next, lesson eleven: expense approvals, the human decision layer that comes after audit rules finish their work.
