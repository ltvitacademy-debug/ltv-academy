# Expense Approvals

Audit rules in lesson 10 are automated checks. Approval is the human decision layer that sits alongside and after them — a manager (or sometimes a specialist) looking at a submitted report and deciding whether Castellan should pay it. This lesson covers how approval routing actually works under the hood.

## What you'll learn

- How Expenses integrates with BPM to route approvals
- The predefined approval rule sets and what each one does
- How an approval notification reaches an approver
- What happens when an approver acts (or doesn't)

## Approval rides on BPM, not a simple "manager field"

Expense report approval is configured using **Approval Management Extensions (AMX)**, part of the same Oracle SOA/BPM suite used for other Fusion approval workflows, including the Payables invoice approval you learned in an earlier course. This matters because it means the routing logic is not a hardcoded "send to the employee's manager" rule — it's a flexible rule engine a consultant configures, and it can combine multiple routing strategies at once.

## The predefined rule sets

Oracle Fusion Expenses ships nine predefined rule sets; the four most commonly used are:

- **ExpenseReportRuleSet** — routes to the employee's **supervisor** via the HR supervisor hierarchy. This is the default most companies start from.
- **CostCenterRuleSet** — routes to the **cost center owner(s)** of the accounts the report will post to, running in parallel if a report spans multiple cost centers.
- **ProjectManagerRuleSet** — routes to the relevant **project manager(s)** when expense items are charged to a project, running in parallel with other applicable rule sets.
- **ExpenseRuleSet** — routes to a **specialist approver** based on expense type, in parallel, useful for something like requiring a Travel Manager to approve any air travel booked outside the preferred travel agency.

Castellan combines the first two: supervisor approval for every report, plus cost center owner approval in parallel whenever a report crosses into a different cost center than the employee's own (a common case for shared projects or temporary assignments).

## How the notification reaches the approver

Once a report clears audit (or if no audit rule applied), Expenses determines the required approvers from the active rule sets and sends each one an approval request. That request appears as a task in the **Oracle BPM Worklist**, and, depending on notification setup, also arrives by email with enough detail to approve or reject directly from the email client in simple cases.

The approver reviews the report — the business purpose, individual items, any audit notes or justifications attached — and takes one of the standard actions: **approve**, **reject** (with a required reason), or **request more information**, which sends it back to the employee without fully rejecting it.

```
Approval routing - Castellan report crossing cost centers (illustrative)
  Rule set 1: ExpenseReportRuleSet  -> Employee's supervisor
  Rule set 2: CostCenterRuleSet     -> Owner of "Project Falcon" cost center
  Both must approve before the report proceeds to accounting
```

## What happens if an approver does nothing

Approval requests do not sit forever. Castellan configures an **escalation**: if an approver takes no action within a set number of days, the request escalates to that approver's own manager, so a report never stalls indefinitely because one person is on vacation or simply ignoring their worklist. This escalation setting is itself part of the approval rule configuration, not a separate feature.

## Recap

Expense approval is built on BPM/AMX approval rules, not a single hardcoded manager lookup. Predefined rule sets route to supervisors, cost center owners, project managers, or type-based specialists, and multiple rule sets can apply to the same report in parallel. Approvers act through the BPM Worklist or email, and escalation rules prevent a report from stalling. Next up, lesson 12: how an approved expense report actually becomes a payment through Payables.
