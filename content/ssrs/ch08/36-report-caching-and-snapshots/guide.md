# Lesson 36 — Report Caching & Snapshots

**Chapter 8 · Deployment & Administration · Lesson 36 of 40**

## What you'll learn

- The three ways a report can execute: on demand, cached, or from a snapshot
- Why caching and snapshots solve different problems, not the same one
- Which reports can't be cached or snapshotted at all, and why
- Where these settings actually live: a report's Manage > Caching page

## Three execution modes, three different goals

Every report runs one of three ways, and the choice is a per-report
setting under that report's **Manage** menu:

**Always run with the most recent data** issues a fresh query to the data
source every single time the report opens. It's the most accurate option
and the most expensive one — if ten people open the report at once, that's
ten separate queries hitting the data source at once.

**Cache a temporary copy of the report** runs the query once, then serves
that same rendered copy to everyone else who requests it until the cache
expires. If ten people open a cached report, only the first triggers real
processing — the other nine get the cached copy instantly. You expire the
cache either after a fixed number of minutes, or on a schedule.

**Report snapshot** goes further: it captures the report's data *and*
layout at a specific point in time, on a schedule you control, and stores
that snapshot in the report server database — independent of anyone
opening the report at all. Where caching is opportunistic (it happens
because a user requested the report), a snapshot is deliberate: it runs
whether or not anyone's watching, which is exactly what you want for a
report driven by a long-running query, or one that shouldn't touch its
data source during business hours.

## What can't be cached or snapshotted

Not every report qualifies. A report **can't be cached or run as a
snapshot** if its output depends on the identity of the user viewing it,
if it prompts for credentials, or if it uses Windows-integrated security
to reach its data source — in every one of those cases, the "right"
result is different per user, so there's no single copy that's safe to
reuse. Parameterized reports add one more wrinkle for snapshots
specifically: since a snapshot locks in one specific data pull, you must
supply a default parameter value for the snapshot to run against.

## Where the cache actually helps — and where it doesn't

Caching only pays off for reports that are requested often enough, by
enough different people, that reusing a rendered copy beats re-running
the query. A report only one person checks once a week gets no benefit
from caching — the cache would just expire, unused, before the next
request. Caching earns its complexity on shared, frequently-viewed
reports: a daily sales dashboard the whole team opens each morning is
exactly the case caching was built for.

## Key terms

| Term | Meaning |
|---|---|
| On-demand execution | Fresh query every time the report runs — most accurate, most expensive |
| Cached copy | A rendered copy served to subsequent requesters until it expires |
| Report snapshot | Data and layout captured on a schedule, stored in the report server database |
| Cache expiration | Minutes-based or schedule-based rule that invalidates a cached copy |
| Report history | The collection of snapshots retained over time for one report |

## Lab

1. In the web portal, open any report's **Manage** menu and select
   **Processing Options** (or **Caching**, depending on version). Note
   which of the three execution modes is currently selected.
2. If the report qualifies (no per-user data, no Windows-integrated
   security), try switching it to **Cache a temporary copy of the
   report**, set an expiration of a few minutes, and confirm you can see
   the setting take effect the next two times you open the report.

## Check yourself

You're ready for Lesson 37 when you can explain: what's the real
difference between a cached copy and a report snapshot — not just "they
both save time," but why you'd deliberately choose one over the other for
a specific report?
