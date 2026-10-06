# Lesson 20 — Escalation Patterns

**Chapter 4 · Human-in-the-Loop & Approval · Lesson 20 of 32**

## What you'll learn

- Why a single approver is a single point of failure for your whole agent
- Three concrete escalation patterns: timeout, tiered, and fallback-to-safe
- How to decide which pattern fits a given tool's risk profile
- What the agent should do while it's waiting — and how long is too long

## The approver is part of the system, and systems need a backup plan

Lesson 19 built a checkpoint that blocks on a human decision. That design
has an obvious failure mode: what if the human doesn't respond? They're in
a meeting, it's 2 a.m., they left the company and nobody reassigned their
queue. A checkpoint with no plan for an unavailable approver doesn't fail
safely — it just hangs forever, and a pending wire transfer or an open
support ticket sitting unanswered for six hours is its own kind of damage.

Escalation is what turns "wait for a human" into "wait for *a* human, with a
plan if the first one can't." Three patterns cover most real cases.

## Pattern 1: Timeout escalation

The simplest pattern: if the assigned approver hasn't responded within a set
window, the request automatically routes to a second person or a broader
group.

```
request: issue_refund($1,200)
assigned_to: on-call-agent-reviewer
if no response in 15 min:
  escalate_to: team-lead-queue
if no response in 60 min:
  escalate_to: on-call-manager (page)
```

This is the right default for anything time-sensitive but not safety-critical
— a delayed refund frustrates a customer; it doesn't create new risk by
sitting a little longer.

## Pattern 2: Tiered approval by risk

Some actions are big enough that one approver isn't enough confidence,
regardless of how fast they respond. A $500 refund might need one reviewer;
a $50,000 wire transfer might need two independent approvals before it
executes — the same principle as a two-signature check in accounting.

```
if amount_usd < 1000:  require 1 approval
if amount_usd >= 1000: require 2 approvals, different reviewers
```

Tiering by risk (dollar amount, data sensitivity, action class) means low-
stakes approvals stay fast while the highest-stakes ones get proportionally
more scrutiny — not uniform friction on everything.

## Pattern 3: Fallback to the safe default

For some tools, there's a third option that isn't "wait longer": fall back
to the conservative action automatically if no human responds in time. An
agent asked to auto-renew a subscription that needs approval for amounts
over a threshold might, after a timeout, default to *not* renewing and
flagging it for manual follow-up — because an unwanted renewal is harder to
undo than a missed one.

The fallback only works when "do nothing" or "do the cheap/reversible
thing" really is the safer option for that specific tool — it is not a
universal escape hatch, and picking it requires the same judgment Lesson 18
used to decide a tool needed a human in the first place.

## What the agent does while it waits

The agent shouldn't sit idle burning a turn on a blocked call. A well-built
loop treats a pending approval as its own state: it can report status back
to the user ("I've asked for approval on the refund — I'll let you know"),
continue other independent sub-tasks that don't depend on this one, or (per
Lesson 23's iteration limits) eventually time out the *entire task*, not
just this one approval, if nothing can proceed.

## Key terms

| Term | Meaning |
|---|---|
| Escalation | Routing a stalled approval request to a different or broader set of reviewers |
| Timeout escalation | Automatically reassigning a request after it goes unanswered for a set window |
| Tiered approval | Requiring more approvers as an action's risk (amount, sensitivity) increases |
| Fallback to safe | Defaulting to the conservative, reversible outcome if no human responds in time |

## Check yourself

A `delete_user_account` tool call sits unapproved for two hours. Is timeout
escalation, tiered approval, or fallback-to-safe the right pattern here —
and what would the "safe default" even be for a delete action?
