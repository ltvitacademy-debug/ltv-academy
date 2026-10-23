# Lesson 1 — The Slow Request Log

**Chapter 1 · Diagnosing Slow Forms & Lists · Lesson 1 of 25**

## What you'll learn

- What the Slow Request Log actually captures, and where to find it
- Why "this page is slow" is a complaint, not a diagnosis — and how this log turns it into evidence
- How the response-time threshold decides what gets logged in the first place
- How to read a single slow-transaction entry: URL, user, duration, and time breakdown
- Why this is the first place a real admin looks before touching any form or list configuration

## The complaint you can't act on yet

Someone opens a ticket: "the Incident list is slow today." That sentence contains no measurement.
Slow compared to what? Slow for one person or for everyone? Slow starting when? Slow by two
seconds or by twenty? Without numbers, "fix the slowness" is not a task — it's a feeling, and
chasing a feeling means guessing at a UI Policy, a Related List, a report widget, or a dozen
other candidates with no way to know which one actually matters. The Slow Request Log exists to
remove the guessing. It is ServiceNow's own record of requests that crossed a defined
response-time line, and it is the first screen a competent admin opens the moment "slow" gets
reported — before changing a single setting.

## What actually gets logged

ServiceNow continuously tracks the response time of transactions processed by the platform. When
a transaction's total time exceeds a configured threshold, the platform writes a slow-transaction
record capturing real diagnostic detail about that specific request: which URL or table was
involved, which user triggered it, the session, the total duration from start to finish, and —
critically — a breakdown of where that duration was actually spent. A transaction isn't one
monolithic block of time; it's business rules firing, scripts executing, database queries running,
and the UI rendering, all measured individually. The slow-transaction record exposes which of
those pieces consumed the time, rather than just reporting a single scary total.

## Why the threshold matters

Nothing gets logged as "slow" in an absolute sense — it gets logged relative to a configured
response-time threshold. Set that threshold too low, and the log fills with noise: ordinary
requests that happen to be a hair over a very tight bar, drowning out the requests that genuinely
need attention. Set it too high, and real problems — a form that reliably takes four seconds when
it should take one — never cross the line and never get captured at all. Tuning this threshold
sensibly, rather than leaving it at an untouched default forever, is part of what makes the log
useful instead of either empty or overwhelming.

## From vague complaint to concrete evidence

This is the real value, and it's worth stating plainly: the Slow Request Log turns "it feels
slow" into "it took 4.2 seconds, it happens for this group of users, it happens on this specific
list view, and the database query is 70% of that time." That's a starting point you can actually
act on. It tells you *how* slow (an exact duration, not a feeling), *how often* (one incident or a
pattern across many transactions), and *for whom* (one user's session or everyone hitting the same
table). Every lesson after this one in this course assumes you start here — confirming there's a
real, measurable problem, and roughly where the time is going — before diagnosing form-load
delay, list-view rendering, slow scripts, or database contention in the chapters ahead.

## Key terms

| Term | Meaning |
|---|---|
| Slow Request Log (slow transaction log) | ServiceNow's record of requests whose total response time crossed a configured threshold |
| Response-time threshold | The duration setting that decides whether a transaction gets logged as slow |
| Transaction time breakdown | The portion of a slow transaction's total duration attributed to scripts, queries, and rendering |
| Slow transaction record | A single logged entry: URL/table, user, duration, and time breakdown for one request |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: a user reports "the incident form
is slow." What three pieces of information does the Slow Request Log give you that the user's
complaint alone does not — and why does checking this log come before touching any UI Policy or
Related List?
