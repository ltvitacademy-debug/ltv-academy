# Lesson 23 — SLA Workflows: Pause, Stop, Breach

**Chapter 6 · Service Level Management Implementation · Lesson 23 of 32**

## What you'll learn

- How a `task_sla` instance actually behaves once its clock has started
- The real Pause case: On Hold while Awaiting Caller, and why that time shouldn't count against the team
- How Stop and breach interact — and what happens if Stop never fires
- Why SLA duration math is schedule-aware, not a flat 24/7 countdown
- How a `cmn_schedule` record changes what "4 hours" means in wall-clock time

## The running clock, from Start to one of two outcomes

Once an SLA Definition's Start condition is met, its `task_sla` instance
begins counting elapsed time against the duration target. From there, the
instance moves toward exactly one of two outcomes: it **Stops** because the
Stop condition was met before time ran out (a correctly-met SLA), or it
**Breaches** because the duration elapsed before Stop fired (a missed SLA).
Everything else — Pause included — happens in between, and it's the
Pause behavior that most separates a fair SLA implementation from an unfair
one.

## Pause: stopping the clock without stopping the SLA

The Pause condition suspends time accumulation without ending the SLA. The
real, common case: an incident moves to **State = On Hold** with
**Hold Reason = Awaiting Caller** — the agent has done what they can and is
waiting on the customer to call back, provide information, or confirm a fix.
A well-implemented Pause condition is built on exactly that combination:
`state = On Hold AND hold_reason = Awaiting Caller`. While paused, the
`task_sla`'s business elapsed time stops accumulating; the moment State
leaves On Hold (or Hold Reason changes to something that doesn't match the
Pause condition), the clock resumes exactly where it left off. This matters
because without it, a caller who takes two days to call back would eat two
days of the team's 4-hour resolution target — time the team had no control
over. A Pause condition scoped too broadly (pausing on On Hold regardless of
reason) can just as easily hide time the team should legitimately be held
accountable for, such as waiting on an internal change.

## Stop and Breach: the two ways a clock can end

The Stop condition, typically `state = Resolved`, ends the `task_sla`
instance's clock permanently and marks it **Achieved** if the duration
target wasn't exceeded. If the duration elapses first — the clock reaches
100% of its target before Stop ever fires — the instance is marked
**Breached**, and most real implementations fire a notification at one or
more percentage thresholds beforehand (commonly 50%, 75%, 90%) so an agent
or manager gets warned before the breach actually happens, not after. A Stop
condition that never matches a record's real resolution path is a quiet
implementation bug: the SLA clock keeps running on a ticket that was
resolved days ago, inflating breach counts or masking them entirely
depending on how the condition was built.

## Why "4 business hours" isn't flat wall-clock time

SLA duration math is **schedule-aware**. An SLA Definition references a real
`cmn_schedule` record — for example "8-5 Weekdays," defined as Monday
through Friday, 8:00 AM to 5:00 PM, with real holiday exceptions. A 4-hour
SLA that uses that schedule and starts at 4:00 PM on a Friday doesn't
breach at 8:00 PM Friday; it pauses for the weekend and resumes Monday
morning, breaching at noon Monday. An SLA Definition with no schedule
attached runs 24/7 — fine for some Priority 1 definitions where the business
genuinely expects round-the-clock coverage, but wrong for a Priority 3
definition that should only count business hours. Choosing the wrong
schedule (or no schedule at all) is as serious an implementation error as a
badly built Start or Pause condition, because it silently changes what the
duration number actually means in real elapsed time.

## Key terms

| Term | Meaning |
|---|---|
| Pause condition | Suspends `task_sla` time accumulation without ending the SLA, e.g. On Hold + Awaiting Caller |
| Stop condition | Ends the `task_sla` clock permanently, typically on State = Resolved |
| Breach | The outcome when duration elapses before the Stop condition fires |
| `cmn_schedule` | A real schedule record (e.g. "8-5 Weekdays") that makes SLA duration math business-hour-aware instead of 24/7 |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why does
pausing an SLA's clock during Awaiting Caller matter, and how does attaching
an "8-5 Weekdays" schedule change what a 4-hour SLA target means for an
incident opened at 4 PM on a Friday?
