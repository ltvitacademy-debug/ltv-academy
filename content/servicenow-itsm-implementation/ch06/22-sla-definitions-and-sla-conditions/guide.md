# Lesson 22 — SLA Definitions & SLA Conditions

**Chapter 6 · Service Level Management Implementation · Lesson 22 of 32**

## What you'll learn

- What a real SLA Definition record (`contract_sla`) actually configures
- How the Applies To condition decides which records get an SLA attached at all
- Why the Start, Pause, Stop, and Reset conditions are the real implementation work — not the duration field
- How a careless Start condition can make a correctly-set target number meaningless
- The relationship between an SLA Definition and the `task_sla` records it generates

## The SLA Definition is more than a duration

Earlier in this path you learned Service Level Management as an ITIL concept: a
target response or resolution time the service desk commits to. Implementing
it on the platform means building an **SLA Definition**, stored on the
`contract_sla` table. The duration field — "4 business hours," "30 minutes" —
is the easy part and usually the first thing a new administrator fills in.
The real implementation work, the part that determines whether the SLA
actually measures what it claims to measure, is the set of **condition
builders** underneath it: Applies To, Start, Pause, Stop, and Reset. Get the
duration right and the conditions wrong, and the SLA produces a number that
looks precise and means nothing.

## Applies To: deciding which records get the SLA

Every SLA Definition starts with an Applies To condition, built with the same
condition builder you used for filters and Data Policies earlier in this
path: a table (commonly `incident`), plus a condition such as `Priority is 1`.
This is what attaches the SLA to records in the first place — a Priority 1
incident gets evaluated against this definition's Start condition the moment
the record is inserted or updated to match. Get the Applies To condition too
broad (say, every incident regardless of priority) and you dilute a
resolution target that should only mean something for the most severe work;
too narrow, and incidents that should be tracked slip through with no SLA
attached at all.

## Start condition: the moment the clock should begin

The Start condition is a condition builder that answers one question: when
does this SLA's timer actually begin counting? The intuitive answer —
"when the record is created" — is frequently the wrong implementation
choice. Consider a Priority 1 incident that sits in a queue for ten minutes
before an agent picks it up: if the Start condition fires on creation, those
ten minutes of queue time are already baked into the resolution clock before
anyone has touched the ticket. Many real implementations instead start the
SLA when State moves to **In Progress**, or when `assigned_to` is first
populated — the point work genuinely began. A Start condition built on the
wrong field doesn't just introduce a small timing error; it changes what the
SLA target is actually measuring, which is why this single condition builder
deserves more implementation attention than the duration number next to it.

## Pause, Stop, and Reset: the rest of the lifecycle

Start is only one of four condition builders on the SLA Definition. **Pause**
condition suspends the clock without stopping it — the next lesson covers
the real On Hold / Awaiting Caller case in depth. **Stop** condition ends the
clock permanently, typically when State reaches Resolved. **Reset** condition
(used less often) restarts the SLA from zero, relevant when a record
re-qualifies after being reassigned to a different SLA Definition. All four
are independent condition builders on the same `contract_sla` record, and an
implementation is only as good as the weakest one — a Stop condition that
never fires leaves the SLA clock running on a record that was resolved days
ago.

## From SLA Definition to task_sla

An SLA Definition is a template. When a real record satisfies its Applies To
and Start conditions, the platform creates a **`task_sla`** record — one
instance of that SLA attached to that specific task, tracking its own
business elapsed time, percentage consumed, and breach status. The next two
lessons build on this: Lesson 23 covers how that `task_sla` instance actually
behaves as the record moves through Pause, Stop, and potential breach, and
Lesson 24 covers reporting on the population of `task_sla` records an
instance accumulates over time.

## Key terms

| Term | Meaning |
|---|---|
| `contract_sla` | The table holding SLA Definition records — the template, not the running instance |
| Applies To condition | Decides which records this SLA Definition attaches to in the first place |
| Start condition | A condition builder deciding exactly when the SLA timer begins counting |
| `task_sla` | The table holding one running SLA instance per record the definition attached to |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why might
starting an SLA's timer on record creation, instead of on State = In
Progress, produce a resolution-time number that misrepresents how the team
actually performed?
