# Lesson 18 — Architecting for Performance at Scale

**Chapter 6 · Performance & Scalability Architecture · Lesson 18 of 32**

## What you'll learn

- Why performance troubleshooting (Slow Request Log, Script Performance Profiler, indexes) is fundamentally reactive — it finds a problem that already exists
- How deliberate table and indexing design, decided before a table ever goes live, prevents a large share of those problems from happening at all
- Why integration pattern choice (event-driven vs. request-response) is a performance decision, not just an architecture-style preference
- How code review standards close the gap that diagnostic tooling can only ever find after the fact

## Reactive diagnosis vs. proactive architecture

ServiceNow Performance Troubleshooting Lesson 1 taught the Slow Request Log, and
Lesson 5 taught the Script Performance Profiler — the real tools an admin reaches
for once a form is already slow, once a scheduled job is already contending for
semaphores, once a report already times out. That entire course is, by design,
**reactive**: something is already degraded, and the job is to find out why and
fix it. A Technical Architect's job starts earlier than that. The goal of this
lesson is the decisions made *before* a table, an integration, or a line of
script ever reaches production — decisions that mean the Slow Request Log has
far less to find in the first place.

## Decision 1: table design and indexing, decided upfront

Chapter 3's "Table Design for Scale" lesson covered what a deliberate table and
indexing strategy actually looks like: choosing extension vs. composition before
a table exists, picking the fields that will carry real query load and indexing
them from day one, and sizing for the data volume the table will actually reach
— not the volume it starts with. The alternative, retrofitting an index after a
list view has already been timing out for months, is strictly more expensive:
it means a schema change against live production data, a re-index that itself
consumes platform resources, and months of users already experiencing the
exact slow-form symptoms Performance Troubleshooting Lesson 2 described. An
architect who signs off on a table's indexing strategy at design time is
preventing that diagnosis from ever needing to happen.

## Decision 2: integration patterns chosen against real anticipated volume

Chapter 4's "Event-Driven vs. Request-Response Integration at Scale" lesson
made the tradeoff explicit: a synchronous request-response integration that
works fine at 50 transactions a day can become the platform's primary
bottleneck at 5,000 a day, because every one of those requests holds a
semaphore for the duration of the call. An architect choosing that pattern
without modeling the anticipated volume first is making a decision that
Performance Troubleshooting's "Semaphore & Node Usage" lesson will eventually
have to diagnose as a symptom. Choosing the integration pattern with real
volume projections in hand, at design time, is the proactive version of that
same decision.

## Decision 3: code review standards that catch anti-patterns before merge

JavaScript for ServiceNow Developers' "GlideRecord Performance Pitfalls"
lesson and Scripting & Application Development's "Common Business Rule
Mistakes" lesson both teach developers to recognize specific anti-patterns —
unbounded GlideRecord queries inside a loop, a Business Rule that triggers
itself recursively, a query with no encoded filter driving a full table scan.
Performance Troubleshooting's Script Performance Profiler can find all three
once they're live and already slow. A code review standard that explicitly
checks for those same anti-patterns — a checklist item, a required reviewer
sign-off, a static-analysis rule in the CI/CD pipeline from DevOps, Testing &
Deployment — catches them before they ever reach a customer-facing instance.
The architect's real leverage isn't writing that checklist personally; it's
mandating that one exists and that it is actually enforced.

## Key terms

| Term | Meaning |
|---|---|
| Reactive performance management | Diagnosing and fixing a performance problem after it has already degraded the instance |
| Proactive performance architecture | Design-time decisions — table design, integration pattern, code review standards — that prevent a class of problems before they occur |
| Anticipated volume | The transaction or data volume an integration or table is expected to reach, used to choose its design before launch, not after |
| Performance anti-pattern | A specific, recognizable coding mistake (unbounded GlideRecord query, recursive Business Rule trigger) with a known performance cost |

## Check yourself

A developer asks why the architecture review board cares about code review
checklists when the platform already has a Script Performance Profiler that
can catch slow scripts. What's the real answer — and what does it cost the
business, in the gap between those two approaches, to only ever catch the
mistake after it ships?
