# The Case Lifecycle

Lesson 13 introduced the Case object and its core fields — Status chief among them. This
lesson goes one level deeper: how does a Case actually move through Status values from the
moment it's created to the moment it's resolved, and what automation drives that movement?
Understanding the lifecycle is what lets an analyst read a Status field correctly instead
of treating it as an arbitrary label.

## What you'll learn

- The standard shape of a case lifecycle, and why the exact stage names vary by org
- What Case Assignment Rules do, and why they matter for "time to first response" metrics
- What Escalation Rules do, and why escalated cases need separate reporting attention

## A standard shape, org-specific labels

Most Service Cloud orgs implement some version of the same lifecycle: a case starts as
**New**, moves into **In Progress** (sometimes called "Working") while a support rep
actively handles it, may get **Escalated** if it needs more urgent or specialized
attention, and eventually reaches **Closed** once it's resolved. That pattern — open,
being worked, possibly escalated, closed — is standard across Service Cloud
implementations. What's *not* standard is the exact wording: one org's picklist might say
"New / Working / Closed," another's might add "Pending Customer" or "On Hold." As an
analyst, never assume a Status value means the same thing in a new org just because you've
seen it before — always check that org's actual picklist values (Chapter 4 covers why
picklist values are configured per org, not fixed by Salesforce).

## Assignment Rules: how a new case finds an owner

When a Case is created, it needs an owner — a specific support rep or a queue of reps who
can pick it up. **Case Assignment Rules** are admin-configured logic that automatically
routes a new Case to the right owner based on criteria like Origin, Priority, or the
product involved, instead of leaving every incoming case sitting unassigned until someone
manually claims it. For an analyst, assignment rules matter directly: "time to first
response" is measured from case creation, and a case that sits unassigned for an hour
before a rule (or a human) finally routes it is an hour of dead time baked into that
metric. If response times look inexplicably slow, checking whether assignment rules are
firing correctly is a legitimate first question.

## Escalation Rules: when a case needs more than its owner can give it

**Escalation Rules** are separate admin-configured logic that watches for cases meeting
certain conditions — commonly, a case that's been open too long relative to its Priority,
or one that hasn't been touched in a set window — and automatically escalates it:
reassigning it, notifying a manager, or bumping its priority. Escalated cases are worth
tracking as their own reporting slice, because a rising count of escalations is often an
early signal of a support team falling behind, well before overall case volume looks
alarming on its own.

## Key terms

| Term | Meaning |
|---|---|
| Case lifecycle | The standard progression a case moves through: New → In Progress → (Escalated) → Closed |
| Case Assignment Rule | Admin-configured logic that automatically routes a new Case to an owner |
| Escalation Rule | Admin-configured logic that automatically escalates a case meeting certain conditions |
| Time to first response | A common support metric measured from case creation to first rep action |

## Check yourself

Why should an analyst treat a rising count of escalated cases as an early warning sign,
even if total case volume hasn't changed? What does escalation actually indicate about a
case that plain Status doesn't?
