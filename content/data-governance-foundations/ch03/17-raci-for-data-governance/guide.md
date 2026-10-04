# Lesson 17 — RACI for Data Governance

**Chapter 3 · Roles and Structure · Lesson 17 of 30**

## What you'll learn

- What the four RACI letters mean, precisely
- How to map Lessons 13–16's roles onto a RACI matrix for a real governance activity
- A worked example RACI matrix for a common data governance task
- The one rule that keeps a RACI matrix useful instead of decorative

## The four letters

A RACI matrix is a simple grid that answers one question for every task: who does what? It
crosses a list of activities against a list of roles, and marks each intersection with one
of four letters:

- **R — Responsible.** Does the actual work. Involved in planning, execution, and completion
  of the task.
- **A — Accountable.** Owns the outcome. Held individually responsible for success or
  failure, and has final sign-off authority. There should be exactly **one** A per task.
- **C — Consulted.** Provides input before a decision is made — two-way communication.
- **I — Informed.** Kept aware of progress or outcomes — one-way communication, after the
  fact.

## Mapping Chapter 3's roles onto RACI

Lessons 13–16 already described this relationship without naming it explicitly. Now it's
explicit:

| Governance role | Typical RACI letter |
|---|---|
| Data owner | Accountable (A) |
| Data steward | Responsible (R) |
| Data custodian | Responsible (R) (for technical implementation tasks) |
| Governance committee | Consulted (C) or Accountable (A), depending on the task's scope |
| Data consumer | Informed (I) |

## A worked example

Here's a RACI matrix for a realistic governance task — approving a new data quality rule for
a customer domain:

| Activity | Data Owner | Data Steward | Data Custodian | Governance Committee |
|---|---|---|---|---|
| Draft the proposed quality rule | C | R | C | I |
| Decide if the rule is approved | **A** | C | I | C |
| Implement the rule technically | I | C | **R** | I |
| Monitor the rule going forward | I | **R** | C | I |

Read this across one row at a time. For "decide if the rule is approved," the owner is
Accountable — theirs is the final call — while the steward is Consulted for input and the
custodian is just Informed, since implementation hasn't happened yet. Notice that **A**
moves to the custodian for "implement the rule technically" — accountability for getting the
technical work right now sits with whoever is actually doing it, even though the owner
remains the ultimate decision authority for the policy itself.

## The one rule that matters most

A RACI matrix stops being useful the moment a single task has more than one **A**. If two
people are both "Accountable" for the same activity, you haven't clarified responsibility —
you've just written down the exact ambiguity that caused the problem in the first place.
When building a RACI matrix for your own governance activities, the single most valuable
check is: for every row, is there exactly one A? If not, that's the conversation to have
before the matrix goes anywhere near a committee for approval.

## Key terms

| Term | Meaning |
|---|---|
| Responsible (R) | Does the actual work |
| Accountable (A) | Owns the outcome — exactly one per task |
| Consulted (C) | Gives input before a decision |
| Informed (I) | Updated after the fact |

## Lab

Pick one real governance activity from your own organization (or use "approve a new business
glossary term" as a stand-in). Build a small RACI matrix with at least three activities and
the four Chapter 3 roles (owner, steward, custodian, consumer) as columns. Check every row:
does exactly one role carry the A?

## Check yourself

Can you explain, without looking back, why a RACI matrix with two A's on the same row is a
warning sign rather than just a stylistic choice — and give one example of a task where the
A shifts from the owner to the custodian?
