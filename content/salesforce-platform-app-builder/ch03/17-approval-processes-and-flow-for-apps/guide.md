# Approval Processes and Flow for Apps

**Chapter 3 · Business Logic · Lesson 17 of 24**

Validation rules block, formula fields calculate, roll-up summaries aggregate — none of them *route* anything. When a record needs a human to sign off, or when logic is too branched for a single formula, you need the two tools built for exactly that: the approval process and Flow.

## What you'll learn

- The parts of an approval process: entry criteria, steps, approvers, actions
- How Flow submits records for approval and extends beyond what approval processes alone can do
- The Flow types most relevant to apps: screen, record-triggered, auto-launched, scheduled
- Where the two tools overlap, and where each one is clearly the better fit

## Anatomy of an approval process

Built from **Setup → Process Automation → Approval Processes**, every approval process has the same shape:

- **Entry Criteria** — a filter (similar to a report filter) deciding which records can be submitted; for example, `Amount >= 50000`
- **Initial Submission Actions** — what happens the moment a record enters the process: a field update (often locking the record), an email alert
- **Approval Steps** — one or more steps, each with its own approver (a specific user, the record owner's manager, a queue, or a related user like "Account Owner"), and a rule for multiple approvers: unanimous approval, or first response
- **Final Approval / Final Rejection / Recall Actions** — field updates, email alerts, outbound messages, or task creation that fire once the process resolves

While a record is in an approval process, it's typically **locked** — no further edits — until it's approved, rejected, or recalled. An admin can reassign or recall an approval manually from the record's Approval History related list.

## Flow submitting for approval

Flow doesn't replace the approval process — it can *trigger* one. An auto-launched or record-triggered Flow can include a **Submit for Approval** action, letting the Flow decide *whether* and *when* to submit based on logic the approval process's entry criteria alone can't express (loops, subflows, calling other records). This is common when the business rule for "does this need approval" is more complex than a single filter — for example, routing differently based on the requester's region *and* a rolling 30-day total, something no static entry-criteria filter can evaluate.

## Flow types relevant to app building

- **Screen Flow** — a guided, multi-step form a user interacts with, often launched from a Quick Action or embedded directly on a Lightning page (Lesson 11 covered placing components; a screen flow is placed the same way)
- **Record-Triggered Flow** — runs automatically when a record is created, updated, or deleted; the modern replacement for most Workflow Rule and Process Builder use cases
- **Auto-Launched Flow (no trigger)** — runs on demand, called from a button, another Flow, Apex, or an approval process action
- **Scheduled-Triggered Flow** — runs on a recurring schedule against a batch of matching records, useful for things like flagging stale records nightly

Salesforce's platform direction for several years has been consolidating automation into Flow Builder; Workflow Rules and Process Builder are both legacy tools being phased out for new automation. New builds in this course, and on the exam, default to Flow.

## Approval process or Flow?

Use an **approval process** when the requirement is genuinely "one or more named humans must sign off, in sequence or in parallel, before this record proceeds" — it's purpose-built for exactly that, with locking, recall, and a visible Approval History out of the box. Use **Flow** when the logic branches, loops, touches multiple objects, needs a screen, or needs to *decide* whether approval is even required before handing off to one. Many real apps use both together: a record-triggered Flow evaluates complex conditions, and when they're met, it calls Submit for Approval to hand the record to the purpose-built routing tool.

## SQL mapping

An approval process resembles a workflow/state-machine table: `status IN ('Pending', 'Approved', 'Rejected')` with a trigger-driven transition table and an audit log — except declared with clicks instead of a state-machine library.

## Recap

An approval process routes a record through defined steps of human sign-off, with entry criteria, actions, and locking built in. Flow handles the branching, looping, and screen-based logic approval processes don't attempt, and can itself submit a record for approval when its own logic decides one is needed. The next lesson turns this chapter's five tools into one decision framework.

## Check yourself

A time-off request should require manager approval only if the requested days exceed the employee's remaining balance, which depends on a running total from other records. Explain why a plain approval process's entry criteria alone can't handle this, and what role Flow would play.
