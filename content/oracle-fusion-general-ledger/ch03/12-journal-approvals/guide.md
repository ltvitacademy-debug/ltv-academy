# Lesson 12 — Journal Approvals

**Chapter 3 · Journal Approvals and Import · Lesson 12 of 37**

## What you'll learn

- What drives whether a journal needs approval at all
- The three assignee types approval rules can route to
- Where approval rules actually get configured
- How to check where a submitted journal currently sits

## Not every journal needs a human to approve it

Journal approval in Oracle Fusion runs on the same **Business Process Management (BPM)** workflow engine used elsewhere in Fusion Financials. Whether a given journal needs approval — and from whom — is decided by **approval rules** that evaluate the journal's own attributes: ledger, source, category, amount, account combination, preparer, and other business context. A rule might require approval only for Manual journals over $10,000, while routine system-generated Payables journals need none at all.

## Three ways a rule can route a journal

| Assignee type | How it behaves |
|---|---|
| **Single** | Routes to one user, one group, or one role. If sent to a group or role, any one person in it can approve — only one approval is needed |
| **Parallel** | Routes to several people at once, and **everyone's** approval is required before the journal can move on — used when a journal batch spans multiple lines of business, each needing its own controller's sign-off |
| **Serial** | Routes through a sequence of people one after another, most commonly a supervisory chain — each approver in turn, in order |

## Where rules get configured

Approval rules live in the **Business Process Management Worklist** application, not inside the Journals work area itself. Oracle also offers a **Simplified Workflow Rules Configuration** option that lets an administrator define General Ledger approval rules from a spreadsheet template rather than the full BPM console — a much faster path for straightforward rule sets like "require approval above a dollar threshold" or "route by journal category."

## Checking where a journal actually stands

Once a journal is submitted, **Manage Journal Approvals** shows its current status — pending, approved, rejected, or reassigned — along with which stage and which approver it's waiting on. For a full audit of how rules themselves are configured, the **Workflow Rules Report** lists every rule's conditions and routing for General Ledger journal approval, Payables invoice approval, and expense report approval side by side.

```
Submitted journal: "March Payroll Accrual," $45,000, Manual source
  Rule match: Manual + amount > $10,000 → requires approval
  Routing: Serial, supervisory chain
    Stage 1: Preparer's manager        → Approved
    Stage 2: Controller                → Pending  ← journal is here now
```

## Key terms

| Term | Meaning |
|---|---|
| Approval rule | Evaluates a journal's attributes to decide if and how it routes for approval |
| Single assignee | One approver (or any one person in a group/role) needed |
| Parallel assignee | Everyone in the set must approve |
| Serial assignee | Approvers act in sequence, commonly a supervisory chain |

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: what is the difference between a parallel approval and a serial approval, in terms of who must approve and in what order?
