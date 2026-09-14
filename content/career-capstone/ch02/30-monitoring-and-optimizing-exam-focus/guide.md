# Lesson 30 — Monitoring and Optimizing a Solution — Exam Focus

**Chapter 2 · DP-700 Certification Prep · Lesson 30 of 81**

## What you'll learn

- Domain 3's checklist: the Monitoring Hub, Direct Lake Mode, capacity sizing
- How DP-700 tests "why is this slow" scenario questions
- Where Course 3's production practices get scoped down for the exam
- The one Direct Lake fact that decides most performance questions

## Domain 3's real checklist

Domain 3 — "Monitor and optimize an analytics solution" — covers
what happens after a solution is built and running:

```
- The Monitoring Hub (Fabric Lesson 16) — pipeline/notebook run history
- Direct Lake Mode (Fabric Lesson 12) — its fallback behavior
- Fabric capacities and SKUs (Fabric Lesson 14) — right-sizing
- Observability, alerts, cost management (Fabric Ch.3, L.52-56)
- Incident response and root cause analysis (Fabric Ch.3, L.57-58)
```

## Direct Lake Mode: the one fact that decides most questions

Direct Lake Mode (Fabric Lesson 12) lets a Power BI semantic model
read Delta files directly from OneLake without a separate import or
DirectQuery round trip — this is the single highest-yield performance
fact in Domain 3. The exam-tested detail is the **fallback**: if a
table is too large, has too many row groups, or uses features Direct
Lake can't handle, Fabric silently falls back to DirectQuery instead
of failing outright.

```
Scenario cue: "report performance degraded after data grew large"
  -> likely cause: Direct Lake fell back to DirectQuery
  -> fix: check table size/row-group limits, or re-partition (Lesson 9)
```

## Monitoring Hub and observability

The Monitoring Hub (Fabric Lesson 16) is where you'd actually go to
diagnose that scenario — it shows run history and duration for every
pipeline, notebook, and Dataflow in a workspace. This lesson's
"observability" material scopes down Fabric & Real-Time Analytics
Chapter 3's logs/metrics/traces (Lesson 52) and alerting (Lesson 53)
to what DP-700 actually asks: recognizing *where* to look, not
building a full observability stack from scratch.

## Right-sizing capacity

Capacity/SKU sizing (Fabric Lesson 14) reappears here from the cost
angle: a workspace assigned to too small a capacity throttles or
queues jobs; too large wastes spend. The exam frames this as "a
workspace is experiencing job throttling during peak hours — what
should you check first" — the answer is capacity utilization, not
the query logic itself.

## Root cause, scoped for the exam

Fabric & Real-Time Analytics Lesson 58's root-cause-analysis process
(reproduce, isolate, form a hypothesis, verify) shows up on DP-700 as
scenario questions that describe symptoms and ask which single next
diagnostic step is correct — not the full incident-response
playbook, just the first right move.

## Key terms

| Term | Meaning |
|---|---|
| Direct Lake fallback | Direct Lake Mode reverting to DirectQuery when a table exceeds its limits |
| Monitoring Hub | Fabric's workspace-wide view of pipeline/notebook/Dataflow run history |
| Capacity throttling | Jobs queuing or slowing because a workspace's assigned SKU is undersized |

## Check yourself

You're ready for Lesson 31 when you can answer, without looking: a
Direct Lake semantic model's report gets noticeably slower after a
large data load — what's the most likely cause, and where would you
check it?
