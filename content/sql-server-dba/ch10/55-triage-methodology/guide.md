# Triage Methodology

This chapter shifts from planned change to unplanned trouble: something is wrong right now, and
someone is looking at the DBA to fix it. The instinct under pressure is to start troubleshooting
immediately — but the DBAs who handle incidents well follow a rough sequence first, and skipping
it is how a bad ten minutes turns into a bad two hours.

## What you'll learn

- The order of priorities during an active incident, and why it isn't "find the root cause first"
- How to judge blast radius and severity quickly
- Why stabilizing comes before understanding, and communicating comes before either

## Step one: confirm the problem is real

Before doing anything else, confirm the reported problem actually exists and actually matches
what's being reported. A user says "the database is down" — is it actually down, or is one
application timing out while everything else works fine? A monitoring alert fired — is it a real
symptom, or a flapping check that self-resolved thirty seconds ago? Chasing a problem that isn't
there, or isn't what it was reported to be, wastes the most valuable resource in an incident:
the first few minutes, when the actual cause is often still visible in current activity.

## Step two: assess blast radius and severity

Once the problem is confirmed, the next question isn't "why is this happening" — it's "how bad
is this, and for whom." Is one report failing, or is the whole application down? Is this
customer-facing, or an internal batch job nobody will notice until tomorrow? Is data actively
being lost or corrupted, or is something just slow? The answer determines everything that
follows — how urgently to act, who needs to know, and whether this is a "fix it now" situation or
a "note it and fix it this afternoon" situation. Treating every incident as maximum severity
burns trust and energy; treating a real outage as low severity because the root cause isn't
obvious yet is worse.

## Step three: stabilize before you root-cause

This is the part that goes against instinct for a lot of technically-minded people: the goal in
the first phase of an incident is to make things *stable*, not to fully understand *why* they
broke. If a runaway query is pinning CPU, killing that session stabilizes the server even before
anyone knows which report or which bad parameter caused it. If tempdb filled up, freeing space
stabilizes the instance even before anyone's found which process was the culprit. Root-causing
matters — and Lesson 59 covers it properly — but it happens after the bleeding stops, not
instead of stopping it. A DBA who spends fifteen minutes finding the exact query plan flaw while
the server stays down has the priorities backward.

## Step four: communicate status, throughout

Communication isn't a separate step that happens after the incident is resolved — it runs the
whole time, in parallel with everything above. The people affected (support, management, the
application team) need to know something is being worked on well before they need to know
exactly what caused it. Lesson 57 covers what a good status update actually contains; the point
here is that silence during an active incident is its own failure, independent of how well the
technical response is going.

## Key terms

| Term | Meaning |
|---|---|
| Blast radius | How much of the system, and how many users, an incident actually affects |
| Severity | How urgent an incident is, based on impact — not on how interesting or hard the problem is |
| Stabilize | Making the immediate symptom stop, before fully understanding its root cause |
| Root cause | The underlying reason an incident happened, investigated properly once things are stable |

## Check yourself

A monitoring alert fires for high CPU at 3am. Before writing a single diagnostic query, what are
the first two things this lesson says you should establish?
