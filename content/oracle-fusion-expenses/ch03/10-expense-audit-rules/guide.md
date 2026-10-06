# Expense Audit Rules

Earlier lessons referred repeatedly to reports or employees getting "flagged for audit." This lesson is where we actually configure that behavior. Expense audit rules are the automated checks that decide which reports or employees need a human auditor's eyes before reimbursement, separate from the manager approval covered in lesson 11.

## What you'll learn

- What an audit list rule is and how it's built
- The difference between report-level and employee-level audit triggers
- The available audit actions when a rule is violated
- A worked example combining several rules

## The audit list rule

On the **Create Audit List Rule** page, a consultant selects audit criteria that, together, form an **audit list rule**. If an employee's expense report violates the criteria in an active rule, Expenses automatically places that employee (or that specific report) on the audit list for manual review. Common criteria include:

- Expense item amount exceeds a specified threshold
- Policy violation flag is present (tying directly back to lesson 4's soft-limit overages)
- Missing receipt declarations exceed a count within a rolling period
- Expense type is on a designated high-risk list (Castellan flags Client Entertainment and Gifts this way)
- Unassigned corporate card transactions older than a set number of days (the check referenced in lesson 9)

## Report-level versus employee-level triggers

Some rules evaluate a single report in isolation — "this report has an item over $1,000" is true or false regardless of history. Other rules evaluate a pattern **across an employee's history** — "this employee has submitted three missing-receipt declarations in the last 90 days" requires Expenses to look backward across multiple reports, not just the one currently being submitted. Castellan uses both kinds: report-level rules catch one-off problems immediately, employee-level rules catch employees quietly working around policy a little at a time.

## Audit actions

When a rule is violated, Expenses can be configured to take one of several actions:

- **Complete audit** — route the report to an auditor's worklist for review before it can proceed to approval or payment.
- **Reject expense report** — send it straight back to the employee with a reason, without routing it to an auditor at all (used for rules so clear-cut, like a banned expense type, that no judgment call is needed).
- **Request more information** — notify the employee that something specific needs clarification before the report can proceed.
- **Waive receipts** or **waive receipts and complete audit** — used selectively, for example for a trusted long-tenured employee whose pattern of small missing receipts isn't worth auditing every single time.

```
Audit list rule - "High-value hotel" (illustrative)
  Criteria:  Expense type = Hotel AND amount > $400/night
  Action:    Complete audit
  Result:    Report routed to Expense Auditor worklist before approval
```

## Worked example

Dana Oyelaran, a Castellan regional director, submits a report with a $460/night hotel charge (she has director-level pre-approval for high-cost cities, but the system doesn't know that without documentation) and two missing-receipt declarations from the same trip. Both the "High-value hotel" rule and a "missing receipt count" rule trigger. Expenses places the report on the audit list with a **Complete audit** action. An expense auditor reviews both flagged items, sees Dana's attached pre-approval email justifying the hotel rate, confirms the missing-receipt declarations are reasonable for cash tips with no available receipts, and clears the report to proceed — all before it ever reaches her manager for the separate approval step in lesson 11.

## Recap

Audit list rules are criteria-based checks, evaluated at the report or employee level, that automatically flag violations for one of several actions: complete audit, reject, request more information, or waive. They run as part of the audit-and-approve stage of the lifecycle and are distinct from, and typically precede, manager approval. Next up, lesson 11: expense approvals, the human decision layer that comes after audit rules have done their automated work.
