# Lesson 20 — Working With ServiceNow Support

**Chapter 6 · Incident Response for Platform Issues · Lesson 20 of 25**

## What you'll learn

- The real line between a customization problem (yours to fix) and a genuine platform/infrastructure problem (ServiceNow's to help with)
- Why a vague "the instance feels slow" report wastes the first round trip with Support
- What concrete evidence actually moves a support case forward: Slow Request Log entries, exact timestamps, affected users/features, recent changes
- How the triage work from Lesson 19 becomes the opening paragraph of a well-written support case
- Why gathering evidence first is a practical efficiency habit, not just a formality

## Whose problem is it: yours, or ServiceNow's?

Not every slowdown is something an admin can diagnose and fix alone, and not every slowdown is
ServiceNow's responsibility either. The real, practical line is customization versus platform. A
recursive Business Rule, an inefficient GlideRecord query, an unindexed custom table — these are
problems the customer introduced through configuration, and they are the customer's own responsibility
to fix, using exactly the tools this course has spent five chapters building: the Slow Request Log,
the Script Performance Profiler, query plans, Instance Health. A genuine platform or infrastructure
issue — degraded performance tied to the underlying hosting infrastructure, a platform-level bug, an
outage affecting the shared service — sits on ServiceNow's side of that line, and that's exactly what
ServiceNow's vendor support channels exist for. Lesson 19's triage work is what tells you which side of
that line you're actually standing on before you decide where to take the problem next.

## Why a vague report wastes everyone's time

"The instance feels slow, please investigate" is a real, common way customers open a support case —
and it is close to useless. Support has no starting point: no transaction to pull up, no time window
to search logs against, no way to tell whether this is even still happening right now. The first reply
to a case like that is almost always a request for exactly the evidence that should have been gathered
before the case was opened, which burns a full round trip of back-and-forth before any real
investigation even starts. A support case is a request for ServiceNow's engineers to investigate
something specific — and "something specific" is precisely what a vague feeling cannot describe.

## What actually makes a support case move fast

The evidence that moves a case forward is concrete and timestamped: specific Slow Request Log entries
showing exactly which transactions were slow and when, the exact start and end time of the slowdown,
which users or features were affected (all of them, or a specific subset), and what — if anything —
changed recently that might correlate. This is, point for point, the same evidence Lesson 19's triage
sequence produces: scope confirmed through Instance Health, timing checked against the deployment
history, resource usage checked for exhaustion. A well-triaged incident essentially writes its own
support case. Handing that evidence over up front lets ServiceNow's engineers start investigating the
actual mechanism immediately instead of spending the first exchange just establishing what happened.

## Turning triage into a case

A strong support case reads like a short incident report, not a complaint: "between 2:14 PM and 2:58
PM Eastern on [date], instance-wide response times roughly tripled per Instance Health; affected
transactions are logged in the Slow Request Log under [reference]; no deployment went out in that
window; semaphore usage shows [specific reading]." That one paragraph does the work that an entire
back-and-forth thread would otherwise need to establish, because it states what happened, when, how it
was confirmed, and what's already been ruled out. Gathering that evidence before opening the case isn't
bureaucratic box-checking — it's the single thing that determines whether a support case gets resolved
in one exchange or ten.

## Key terms

| Term | Meaning |
|---|---|
| Customization issue | A slowdown caused by the customer's own configuration — the customer's responsibility to fix |
| Platform/infrastructure issue | A genuine problem with the underlying platform or hosting — ServiceNow's responsibility |
| Support case | A formal request to ServiceNow's vendor support team to investigate a specific problem |
| Round trip | One exchange of a support case going back and forth before useful progress is made |
| Timestamped evidence | Evidence tied to exact times and specific log entries, not a general impression |

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: why does opening a ServiceNow
Support case with "the instance feels slow" and no further detail typically cost you a full extra
round trip, and what three or four concrete pieces of evidence would have prevented that?
