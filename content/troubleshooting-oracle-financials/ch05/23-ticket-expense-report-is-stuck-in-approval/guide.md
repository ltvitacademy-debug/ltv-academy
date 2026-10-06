# Ticket: Expense Report Is Stuck in Approval

**Chapter 5 · Assets, Expenses and Setup Tickets · Lesson 3 of 5**

## What you'll learn

- Why an approval problem is a workflow problem, not an accounting problem
- What happens when an expense report can't satisfy any rule in its approval rule set
- Where to actually look (BPM Worklist) and what it shows you
- A resolution note that fixes the workflow, not just the one stuck report

## A different kind of ticket entirely

Everything so far in this course has been about data, setup, or accounting pipelines. This ticket is about **workflow** — Expenses approval runs on rules built with the Approvals Management Extensions (AMX) of Oracle's SOA/BPM suite, and routes a submitted report to a built approver chain. Nothing here is a balance, a hold, or a journal — it's a routing problem, and the evidence lives in a different place: the **BPM Worklist**.

## The ticket

> **Ticket #40695 — Harbor & Vance Logistics.** Employee reports: "Submitted my expense report four days ago. It's not showing as approved, rejected, or pending with anyone. It just says In Progress." Severity: Medium.

## Investigating

1. **Open BPM Worklist as an administrator** (requires the Financial Application Administrator role) and find this specific report's approval history.
2. **Read the routing history.** The approval process attempted to build an approver chain and never successfully assigned the next approver — there's no pending task sitting with anyone, which matches the employee's description exactly.
3. **Check the employee's HR record**, since manager-based approval rules typically rely on the submitter's assigned manager. This employee's manager field in HR is **blank** — they were recently transferred between departments, and the new manager assignment was never completed.
4. **Connect it to the rule logic.** Each expense report must satisfy exactly one rule in its rule set. With no manager on record, the standard "route to manager" rule has nothing to route to, so the approval process can't successfully build a chain and the report is effectively stuck with no error surfaced to the employee.

## Root cause

The employee's HR record has no manager assigned following a recent department transfer, so the manager-based approval rule cannot determine who the first approver should be, leaving the report in an unresolved In Progress state instead of failing outright or sitting with a specific person.

## Resolving it

This needs an HR fix, not an Expenses fix: assign the correct manager to the employee's HR record. Once that's corrected, the existing stuck report typically needs to be **withdrawn and resubmitted** (or, depending on configuration, the approval process may need to be manually restarted) so it re-evaluates the rule with the now-complete manager information.

## Documenting it

> **Ticket #40695 — Harbor & Vance Logistics.** Employee's expense report stuck "In Progress" for four days with no pending approver.
> **Root cause:** Employee's HR record had no manager assigned after a recent department transfer, so the manager-based approval rule could not build an approver chain.
> **Fix:** Manager assignment corrected in HR; expense report withdrawn and resubmitted to re-evaluate the approval rule.
> **Verified:** Report now shows a pending approval task with the correct manager in BPM Worklist.
> **Note:** Recommend HR and Expenses teams coordinate so department transfers include manager reassignment before the employee's next submission, not after a ticket is raised.

## Key terms

| Term | Meaning |
|---|---|
| BPM Worklist | The application where approval rules are managed and routing history can be reviewed |
| Approval rule set | A group of rules where a submitted report must satisfy exactly one rule to route correctly |
| In Progress (with no pending approver) | A sign the approval process couldn't resolve who the next approver should be |

## Check yourself

Why did this ticket require a fix in HR rather than anywhere in Expenses itself?
