# Lesson 24 — SLA Reporting

**Chapter 6 · Service Level Management Implementation · Lesson 24 of 32**

## What you'll learn

- Why `task_sla` is the real reporting table, not `incident`
- How to build a breach-rate-by-priority report using the reporting skills from course 2
- Why "percentage of SLA time consumed" is a more useful average than breach count alone
- The difference between a point-in-time Report and a real trend-over-time view
- Why Performance Analytics, not a standard Report, is the right tool for tracking breach rate over months

## task_sla is where SLA reporting actually lives

Course 2's reporting lessons taught you to build reports against a table and
a condition — Reports, List views, pivot tables. SLA reporting uses those
exact same tools, pointed at a table most new administrators overlook:
**`task_sla`**, not `incident`. Every row in `task_sla` is one SLA instance
attached to one record, carrying its own `stage` (In Progress, Paused,
Completed), `has_breached` flag, `business_percentage` (how much of the
duration target has been consumed), and a reference back to the task it
belongs to. An incident can have more than one `task_sla` row over its
life — if it's reassigned to a definition with a different Applies To
condition, or if a Response SLA and a Resolution SLA both apply to it at
once. Reporting against `incident` directly, instead of `task_sla`, misses
this entirely.

## Breach rate by priority and by assignment group

The most common SLA report is a straightforward grouped count: `task_sla`
records where `has_breached = true`, grouped by the Priority of the task
they're attached to, or by `assignment_group`. Built with the same pivot
table or grouped Report tools from course 2, this answers two different
real questions. Breach rate by Priority tells you whether your SLA targets
themselves are realistic — a 40% breach rate on Priority 1 may mean the
4-hour target was never achievable given real staffing. Breach rate by
Assignment Group tells you whether the problem is a specific team's
performance rather than the target itself. Confusing the two — treating a
high breach rate as automatically a staffing problem, or automatically a
target problem — is a common reporting mistake; running both cuts side by
side usually reveals which one it actually is.

## Average percentage consumed: a more honest number than breach count

Breach count alone hides a lot. A team that resolves every ticket at 99% of
its SLA target has a 0% breach rate — identical, on a breach-count report,
to a team that resolves every ticket at 20% of target with hours to spare.
`task_sla.business_percentage`, averaged across completed instances, tells
you how close to the edge the team is actually running. An average of 85%
consumed with a 2% breach rate is a team one bad week away from a breach
spike; an average of 40% consumed with the same 2% breach rate is a team
with real margin. This is a report breach-rate-only dashboards almost never
show, and it's one of the most useful numbers an SLA implementation can
surface to a manager.

## Point-in-time Report vs. real trend over time

A standard Report or pivot table against `task_sla` answers "what does
breach rate look like right now, or over this fixed date range I picked."
That's valuable, but it's a snapshot — it doesn't show whether breach rate
is improving, worsening, or cyclical (worse on Mondays, worse at month-end).
Course 2 introduced **Performance Analytics** for exactly this gap: a
scored widget tracking `task_sla` breach rate as a real indicator sampled
on a schedule, building an actual time series an administrator or manager
can watch move week over week, with trend lines and target bands a
point-in-time Report can't produce. Use a Report when someone asks "how are
we doing on SLAs today." Use Performance Analytics when the real question
is "are we getting better or worse."

## Key terms

| Term | Meaning |
|---|---|
| `task_sla` | The table SLA reports should query — one row per SLA instance, not per task |
| `has_breached` | A boolean flag on `task_sla` marking whether that instance's duration was exceeded |
| `business_percentage` | How much of the duration target an instance has consumed, averaged for a more honest signal than breach count |
| Performance Analytics | The tool for a real time-series breach-rate trend, versus a point-in-time Report |

## Check yourself

You're ready for Lesson 25 when you can explain, without looking: why can
two teams share an identical 2% breach rate on a breach-count report while
one of them is in real danger of a breach spike and the other isn't — and
which `task_sla` field exposes the difference?
