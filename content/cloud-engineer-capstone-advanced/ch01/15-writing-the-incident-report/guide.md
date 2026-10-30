# Lesson 15 — Writing the Incident Report

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 15 of 26**

## What you'll learn

- The real structure Theo uses to write up this incident: timeline,
  root cause, impact, what went right, what went wrong, follow-ups
- Why an incident report's job is to be useful to people who weren't
  there, not to relive the firefight for people who were
- How to write a root-cause section that names the actual mechanism —
  not just "latency was high" — and credits what worked
- Why every follow-up action needs a named owner and a real deadline,
  or it never happens

## What an incident report is actually for

The point of this document isn't to prove Theo did a good job during
the incident. It's a durable record that a future on-call engineer, a
new hire, or Theo himself in six months can read cold and understand
exactly what happened, why, and what changed as a result — without
needing to have lived through the sale. That framing drives every
section below: write for the reader who wasn't in the incident
channel, not for the people who were.

## Timeline

| Time | Event |
|---|---|
| T+0:00 | Sale goes live (Lesson 9) |
| T+1:30 | Reliability dashboard shows checkout-api p95 latency climbing past 2,000ms, error rate past 5%; Casey Lindqvist flags it |
| T+1:35 | FinOps dashboard shows cluster-wide average CPU at 72% — appears healthy |
| T+1:50 | Both dashboards confirmed to be querying real, current data — the disagreement is real |
| T+2:05 | Per-zone breakdown shows 8 of 12 checkout-api pods concentrated in `eastus2-2`, running at ~96% CPU, while `eastus2-1`/`eastus2-3` sit near 24% |
| T+2:10 | Root cause identified: no `topologySpreadConstraints` on the `checkout-api` Deployment |
| T+2:20 | Fix applied: `topologySpreadConstraints` with `maxSkew: 1` added; rolling update begins, governed by the existing PodDisruptionBudget |
| T+2:35 | Rollout completes; pods now split 4/4/4 across zones |
| T+2:55 | Reliability dashboard confirms p95 latency back to ~190ms, error rate back to ~0.2%, sustained |

**Total customer-facing impact window: roughly 85 minutes**, from the
first latency spike to confirmed recovery.

## Root cause

The `checkout-api` Deployment, built in Lesson 4 alongside the AKS
cluster, was never given a `topologySpreadConstraints` or pod
anti-affinity rule. Without one, `kube-scheduler` was free to bin-pack
pods for efficiency with no notion of spreading them across
availability zones, and under this sale's traffic ramp it concentrated
8 of 12 replicas into a single zone. The FinOps dashboard's
cluster-wide **average** CPU metric masked this completely — the
nearly-idle pods in the other two zones dragged the average down to a
number that looked healthy, even while the overloaded zone was driving
real customer-facing latency and errors.

## What went right

The reliability dashboard — built independently of the FinOps
dashboard, measuring a different thing (per-request latency and error
rate, not cluster-wide average utilization) — caught the problem in
real time and gave the team an accurate signal to act on, even while
the FinOps dashboard was reporting the opposite. That independence is
exactly why it worked: if the only cluster health signal available had
been the averaged one, this incident would have taken much longer to
notice.

## What went wrong

1. The `checkout-api` Deployment had no topology spread constraint
   from the moment it was built — a baseline gap, not something that
   broke later.
2. The FinOps dashboard's single cluster-wide average had no per-zone
   breakdown, so it couldn't have caught this even if someone had
   thought to check it sooner.
3. There was no alert tied to per-zone imbalance specifically — the
   team only found the skew by manually re-querying, mid-incident.

## Follow-up actions

| Action | Owner | Due |
|---|---|---|
| Add `topologySpreadConstraints` to every Deployment's baseline template, not just `checkout-api` | Theo Bryant | Before next major sale |
| Add a per-AZ breakdown panel to the FinOps dashboard (Lesson 16) | Theo Bryant | This week |
| Add an alert on per-zone pod-count skew, not just cluster-wide averages | Platform team | Next sprint |
| Review every other service's Deployment spec for the same missing constraint | Platform team | Next sprint |

## Key terms

| Term | Meaning |
|---|---|
| Incident report | A durable written record of what happened, why, and what changed — written for a reader who wasn't there |
| Root cause | The actual underlying mechanism that produced the symptom, not just a description of the symptom |
| Blameless postmortem | A report that names mechanisms and gaps, not people, as the cause |

## Lab

1. Write the root-cause paragraph in your own words, in three sentences
   or fewer, without using the word "latency."
2. For each follow-up action, explain why it needs a named owner and a
   real due date instead of being left open-ended.
3. Identify which line in "what went wrong" is the one that, if fixed
   platform-wide, would have prevented this specific incident from
   happening at all.

## Check yourself

You're ready for Lesson 16 when you can explain, without looking, why
the "what went right" section credits the reliability dashboard's
independence specifically, and why every follow-up action in this
report needs an owner and a deadline to actually happen.
