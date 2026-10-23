# Lesson 19 — Capacity Planning for a Growing Instance

**Chapter 6 · Performance & Scalability Architecture · Lesson 19 of 32**

## What you'll learn

- Why capacity planning means projecting future growth, not just reacting to today's load
- How to connect growth projections to the semaphore and node-contention concepts Performance Troubleshooting already taught
- Why an architect's job is anticipating contention before it causes queuing delays, not discovering it after users complain
- What a real growth-tracking metric and review cadence looks like, tied to the Instance Health Dashboard

## Capacity planning is projection, not reaction

Performance Troubleshooting's monitoring chapter taught the Instance Health
Dashboard and the Semaphore & Node Usage lesson as tools for understanding
*today's* load on the platform — how many semaphores are in use right now,
how contended the scheduled job queue is this week. Capacity planning takes
the same data and asks a different question: at the user count and data
volume this instance will reach in twelve months, will today's configuration
still hold up? An architect who only ever looks at current load is managing
the instance the way an admin manages an incident — one snapshot at a time.
Capacity planning means projecting the trend line forward and sizing the
platform ahead of where it's actually going.

## Growth has two independent dimensions

Real capacity planning tracks two separate kinds of growth, because they
strain different parts of the platform. **User growth** — more employees
logging in, more concurrent sessions, more simultaneous form loads — strains
node capacity and semaphore pools directly, since each active session and
each in-flight transaction competes for the same limited pool Performance
Troubleshooting's "Semaphore & Node Usage" lesson described. **Data growth**
— more records in core tables, more years of incident history, more
attachments — strains query performance and storage, which is why Chapter 3's
table design and archiving strategy lessons matter at all. A rollout that
triples the number of users but leaves data volume flat has a different
capacity risk than one that leaves user count flat but triples transaction
volume per user. An architect projects both separately.

## Anticipating contention before it's a queue

The real discipline connects directly to Performance Troubleshooting's
"Scheduled Job Contention" lesson: a fixed number of semaphores serves a
fixed number of concurrent transactions, and once demand for that pool
exceeds supply, requests start queuing — which is exactly the symptom that
course's diagnostic tools exist to find. An architect's job is running that
same math forward against a growth projection, *before* the queuing starts:
if concurrent usage is projected to double in a year and the semaphore pool
is already running near capacity today, that contention is not a future
possibility to monitor for — it's a near-certainty to plan for now, whether
through additional application node capacity, a scheduled job redesign, or a
revised SLA for lower-priority background work.

## Growth-tracking metrics and a review cadence

Projection without real data is guesswork, not architecture. A practical
capacity plan establishes concrete metrics — active user count by month,
record count growth in core tables, average and peak semaphore utilization —
pulled from the same Instance Health Dashboard Performance Troubleshooting
taught, reviewed on a fixed cadence (commonly quarterly, or ahead of any
known rollout) rather than only when someone notices things feel slow. That
cadence is what turns capacity planning from a one-time estimate made during
a project kickoff into an ongoing discipline that catches a wrong projection
early, while there's still time to act on it.

## Key terms

| Term | Meaning |
|---|---|
| Capacity planning | Projecting future user and data growth and sizing platform capacity ahead of it, rather than reacting to today's load |
| User growth | Growth in active users and concurrent sessions, which strains node capacity and semaphore pools |
| Data growth | Growth in record volume and storage, which strains query performance and archiving strategy |
| Growth-tracking metric | A concrete, trended figure (active users, record counts, semaphore utilization) used to base capacity decisions on real data, not guesswork |
| Review cadence | A fixed, recurring schedule for re-checking growth metrics against the capacity plan |

## Check yourself

An instance is running comfortably today, with semaphore utilization well
within normal range. Why might an architect still flag a capacity risk for
next year, and what two growth metrics, tracked on what kind of cadence,
would tell you whether that risk is real?
