# Lesson 25 — SLA Implementation Lab

**Chapter 6 · Service Level Management Implementation · Lesson 25 of 32**

## What you'll learn

- How to walk through building one complete SLA Definition from requirement to breach report
- How to translate a plain-English SLA requirement into the five condition builders that actually implement it
- Why each condition choice in this lab connects back to a specific mistake covered in Lessons 22-24
- How to read the resulting breach-rate report and decide what it's actually telling you

## The requirement

A service desk manager hands you this requirement: "Priority 1 incidents need
a 4-business-hour resolution target. Don't penalize us for time spent waiting
on the caller. And I want a report showing which assignment groups are
missing the target most often." This lesson works through implementing that
requirement as a real SLA Definition, end to end, the way you would on a
live instance — then reads the resulting report.

## Step 1 — The SLA Definition and its Applies To condition

Create a new `contract_sla` record named "P1 Resolution." The **Applies To**
condition is built on the `incident` table with the condition
`Priority is 1 Critical`. This is deliberately narrow, per Lesson 22: the
manager's requirement is specifically about Priority 1, and widening Applies
To to include Priority 2 would dilute a target that's only meant to apply to
the most severe incidents.

## Step 2 — Duration and schedule

Set the **Duration** to 4 hours, and attach a **Schedule** of "8-5 Weekdays"
(a real `cmn_schedule` record covering Monday through Friday, 8:00 AM to
5:00 PM, with the organization's holidays excluded). This is the schedule
decision from Lesson 23: without it, a P1 opened at 4:00 PM Friday would
show as breached by Friday evening instead of giving the team until Monday
afternoon — a flat 24/7 duration would misrepresent a target the business
actually intends as business-hours-bound.

## Step 3 — The Start condition

Set **Start** to fire when the record is created and matches the Applies To
condition — appropriate here because Priority 1 is meant to represent an
all-hands, time-critical incident from the moment it's logged, unlike a
lower-priority ticket where you might reasonably wait for State = In
Progress. This is the Lesson 22 judgment call: the right Start condition
depends on what the SLA is supposed to represent, not a one-size-fits-all
default.

## Step 4 — The Pause condition

Set **Pause** to `state = On Hold AND hold_reason = Awaiting Caller` — the
exact scoped condition from Lesson 23. This pauses the clock only while the
team is genuinely blocked on the customer, and resumes the instant Hold
Reason changes or State leaves On Hold. Deliberately, this Pause condition
does **not** match `hold_reason = Awaiting Vendor` or `Awaiting Change` —
those delays are inside the organization's control and should still count
against the 4-hour target, which is what the manager's "don't penalize us
for the caller" wording actually asked for, read precisely.

## Step 5 — The Stop condition

Set **Stop** to `state = Resolved`. The clock ends the moment resolution
evidence is recorded — not at Closed, which (per Lesson 22's state-model
coverage) can happen days later after caller confirmation, and shouldn't be
part of a resolution-time measurement at all.

## Step 6 — The breach report

With the definition live and `task_sla` records accumulating, build a
grouped Report against `task_sla` where `has_breached = true`, filtered to
instances whose task's `short_description` or SLA name matches "P1
Resolution," grouped by `assignment_group`. Suppose the report comes back
showing Network Operations at 28% breach rate, Database Administration at
6%, and Service Desk Tier 1 at 3%. Per Lesson 24, the next move is not to
assume Network Operations is understaffed — pull the same population's
average `business_percentage` consumed. If Network Operations is averaging
60% of target even on Achieved tickets, the 28% breach rate likely reflects
a real capacity gap. If it's averaging 95% even on Achieved tickets, the
team is resolving on time but with almost no margin — a different
conversation with a different fix.

## Key terms

| Term | Meaning |
|---|---|
| `contract_sla` | Where this lab's "P1 Resolution" SLA Definition is created |
| Applies To | Narrowed to `Priority is 1 Critical` so the target isn't diluted across lower-priority work |
| Scoped Pause | `On Hold AND hold_reason = Awaiting Caller` — pauses only on the specific delay the requirement named |
| `assignment_group` breach report | Grouped `task_sla` report answering the manager's "which teams are missing the target" question |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why does
this lab's Pause condition deliberately exclude `hold_reason = Awaiting
Vendor`, and what two numbers would you pull together — not breach rate
alone — to tell whether Network Operations' 28% breach rate is a staffing
problem or a margin problem?
