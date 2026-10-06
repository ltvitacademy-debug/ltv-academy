# Script — Expense Approvals

## Segment 1 (title)

Audit rules are automated checks. Approval is the human decision layer that sits alongside and after them - a manager, or sometimes a specialist, deciding whether Castellan should actually pay a submitted report. Let's look at how approval routing works under the hood.

## Segment 2 (steps)

Expense approval is configured using Approval Management Extensions, part of the same SOA and BPM suite used for other Fusion approval workflows, including Payables invoice approval from an earlier course. The routing isn't a hardcoded "send to the manager" rule - it's a flexible rule engine, and multiple routing strategies can combine on the same report.

## Segment 3 (steps)

Oracle ships nine predefined rule sets. ExpenseReportRuleSet routes to the employee's supervisor through the HR hierarchy - the default most companies start from. CostCenterRuleSet routes to the owners of the cost centers a report posts to, in parallel if it spans several. ProjectManagerRuleSet routes to relevant project managers when items are charged to a project. ExpenseRuleSet routes to a specialist based on expense type.

## Segment 4 (code)

Castellan combines two of these. A report that crosses cost centers routes to both the employee's supervisor through ExpenseReportRuleSet, and to the owner of, say, Project Falcon's cost center through CostCenterRuleSet - and both have to approve before it proceeds to accounting.

## Segment 5 (steps)

Once a report clears audit, Expenses sends each required approver a task in the Oracle BPM Worklist, often also by email with enough detail to act directly. The approver sees the business purpose, the items, and any audit notes, and takes one of three actions: approve, reject with a required reason, or request more information.

## Segment 6 (outro)

Approval requests don't sit forever - if an approver takes no action within a set number of days, it escalates automatically to their own manager, so one person on vacation can't stall a report indefinitely. Up next, lesson twelve: how an approved report actually becomes a payment through Payables.
