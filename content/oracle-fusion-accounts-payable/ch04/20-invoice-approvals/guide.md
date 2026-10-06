# Invoice Approvals

Validation (lesson 18) certifies an invoice is internally clean. It says nothing about whether a human is willing to sign off on paying it. That's **approval status** — the second of the four independent status fields from lesson 2 — and it runs on a completely different engine than validation: a workflow built on Oracle's BPM (Business Process Management) and human workflow services, not the validation logic covered in the last two lessons.

## What you'll learn

- Why approval is a separate system from validation, not an extension of it
- How approval rules route an invoice to the right person
- The difference between sequential and parallel approval routing
- What happens when an invoice is rejected rather than approved

## Approval runs on workflow rules, not the validation engine

Oracle Fusion ships **predefined invoice approval rules**, and lets an implementation extend them using the **Approval Management extensions (AMX)** of Oracle SOA Suite and Oracle Human Workflow — the same underlying technology used to route approvals for other business documents, not something built specifically and only for Payables invoices. Rules are configured in the context of a **rule set**, administered through the **BPM Worklist** application by someone in the Financial Application Administrator role, using the specific task **FinApInvoiceApproval** for Payables invoice approval configuration.

## Not every invoice needs approval at all

Just like the invoice and approval statuses are independent, whether an invoice *requires* approval in the first place is itself a configuration decision. Some organizations route every invoice over a certain dollar amount through approval; others exempt invoices fully matched to an approved purchase order, on the theory that the PO itself was already approved upstream and a matched invoice doesn't need a second sign-off. This is why approval status (lesson 2) has a "Not Required" value, not just "Approved" or "Rejected" — plenty of invoices legitimately skip the workflow entirely.

## How rules find the right approver

Approval rules can route based on **hierarchies** defined in HCM — supervisory hierarchies, job-level hierarchies, or position-based hierarchies — so an invoice's approver is derived from who the preparer (or the cost center, or the amount) actually maps to in the organization, rather than a hardcoded name. More complex rules support both:

- **Sequential routing** — approvers are asked in order, one after another; the invoice doesn't move to the second approver until the first has acted.
- **Parallel routing** — multiple approvers are asked at the same time, useful when a rule requires sign-off from, say, both a department manager and a finance reviewer, and the order between them doesn't matter.

## What happens on rejection

An invoice doesn't just stall silently if someone rejects it. A **Rejected** approval status is a distinct outcome from "still pending" — it signals that someone with the authority to decide said no, and the invoice typically needs to be corrected (wrong GL coding, wrong amount, missing support) and resubmitted, rather than simply waiting for the same rejected state to somehow resolve itself.

## A worked example

Brightfield's approval rule requires any non-PO invoice over $2,500 to route sequentially: first to the requesting department's manager, then to a finance reviewer. A $3,000 non-PO invoice from Hearthstone Logistics routes to the department manager first; only after they approve does it move to the finance reviewer. A $4,000 invoice fully matched to an approved PO, by contrast, has approval status "Not Required" and skips this entire workflow.

## Recap

Approval is a separate workflow engine from validation, built on BPM and human workflow rules administered through the BPM Worklist application. Whether approval is required at all is configurable, rules route based on HCM hierarchies, and routing can be sequential or parallel. Rejection is a distinct, actionable outcome, not a stall. Next up, lesson 21: invoice adjustments and corrections, for when something needs to change after the fact.
