# Lesson 26 — Wrap-Up: What You Built, and What's Next

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 26 of 26**

## What you'll learn

- A full, honest recap of everything this capstone actually built, end to end
- Why the Chapter 1 incident was the real test of this capstone's architecture, not a
  detour from it
- How this capstone connects to the rest of Driftwood's three-tier Cloud Engineer →
  Cloud Architect path
- What a genuinely senior version of this same platform would add next, and what a real
  cloud-architecture career path looks like from here

## Everything you built

| Phase | What it is | Lessons |
|---|---|---|
| Building the platform | A multi-cloud target architecture, a real AKS cluster, services migrated onto it, and Terraform managing both clouds | 1–6 |
| Instrumenting it | A real FinOps dashboard, and a pre-sale load test against the cluster | 7–8 |
| The incident | The sale going live, two dashboards disagreeing, tracing the discrepancy to a real root cause, and fixing it live under real traffic | 9–13 |
| Closing the loop | Validating the fix under load, writing the incident report, updating the dashboard with a per-AZ panel, and briefing leadership twice | 14–18 |
| Hardening for next season | Leadership's hardest question, planning the next phase, a second stakeholder conflict resolved with real data, concrete hardening changes, and a combined validation drill | 19–24 |
| Closing it out | One reference document covering the full platform, and this wrap-up | 25–26 |

Every one of these pieces is real in kind, not just in name: a real Kubernetes scheduling
behavior (`topologySpreadConstraints` and `maxSkew`), a real cost-management framework
(FinOps's Inform/Optimize/Operate loop), real autoscaling mechanics (`HPA`,
`minReplicas`/`maxReplicas`, scale-to-minimum off-hours), and a real validation discipline
(game-day drills with pass conditions decided in advance) — nothing in this capstone's
technical core was invented to make the story work.

## Why the incident was the point, not a detour

It would be easy to describe Chapters covering Lessons 1 through 8 as "the real build" and
the incident in Lessons 9 through 18 as an unplanned problem that happened to come up along
the way. That's backwards. The entire reason this capstone built a multi-AZ Kubernetes
cluster, a FinOps dashboard, and a pre-sale load test — instead of a simpler single-zone
setup with no cost visibility at all — was to make a moment exactly like this incident
survivable and diagnosable when it eventually happened. If the incident had never
happened, the architecture's value would have been real but invisible. Because it did
happen, you got to see, directly, what per-AZ visibility and a disciplined root-cause
process actually buy a platform team — and Lessons 19 through 26 showed what happens
*after* the fire is out, which is where a junior fix and a senior one actually diverge.

## Where this fits in the bigger path

This Advanced capstone is the third and final tier of a three-part capstone sequence for
the same fictional company, **Driftwood Outdoor Apparel**, and the same protagonist,
**Theo Bryant**. The Beginner tier migrated one application and its static assets to
Azure for one deadline-driven stakeholder. The Intermediate tier containerized that
application, added Terraform and CI/CD, and introduced AWS as a backup target alongside a
real cost anomaly and an open storage bucket to find and fix. This Advanced tier is the
first to operate at the scale a real Cloud Architect's role actually reaches: a full
Kubernetes platform, two clouds working together instead of one with a backup, a
cross-functional incident with real leadership stakes, and a second chapter of work —
hardening — that most junior-level projects never get far enough to need.

## What a genuinely senior version of this would add next

Finishing this capstone doesn't mean every real-world version of this platform is
finished. A senior Cloud Architect facing this exact platform in a real role would likely
push further in directions this capstone deliberately scoped out:

- **Automated chaos engineering**, not a single scheduled game-day drill — a recurring,
  partially randomized failure-injection practice (in the spirit of the drill in Lesson
  24) that doesn't rely on a human remembering to schedule the next one
- **Multi-region active-active architecture**, not just a secondary-cloud failover
  target — genuinely serving live traffic from more than one region simultaneously,
  rather than failing over to a standby
- **Anomaly detection on the FinOps side** that flags an unexpected cost pattern
  automatically, rather than relying on a manually configured budget alert tied to one
  known event like the sale-window ceiling bump

None of these were in scope for this capstone, and that's a deliberate choice, not an
oversight — but naming them honestly is itself part of the job this capstone has been
teaching throughout.

## What a real cloud-architecture career path looks like from here

The skills this capstone exercised — Kubernetes platform operations, multi-cloud
Terraform, FinOps-grounded cost decisions, incident response, and durable documentation —
map directly onto a real progression: **Cloud Engineer** → **Senior Cloud Engineer /
Site Reliability Engineer** → **Cloud Architect** → **Principal/Staff Cloud Architect**.
Certifications that validate pieces of exactly what this capstone built include Microsoft's
AZ-305 (Azure Solutions Architect Expert), the CKA (Certified Kubernetes Administrator),
and the FinOps Foundation's own practitioner certification — none of which replace real
incident experience like Chapters 1 through 24, but all of which give a hiring manager a
fast way to confirm it. The honest throughline from Lesson 1 of the Beginner tier to this
lesson is the same one real careers follow: scope grows, stakes grow, and the hardening
work after the fire is out is where a senior engineer actually earns the title.

## Key terms

| Term | Meaning |
|---|---|
| Hardening | Deliberate work done after an incident is closed, to reduce the chance and blast radius of a future one |
| Cloud Architect | A role responsible for a platform's overall structure, cost, and resilience across teams and, often, multiple clouds |
| Career progression | The real sequence of roles and demonstrated scope a cloud engineer moves through toward architecture-level responsibility |

## Lab

1. Write a two-paragraph summary of this capstone in your own words, as if explaining it
   to someone who hasn't seen it — what was built, and what the incident proved about why
   it was built that way.
2. Pick one of the three "what's next" items above and sketch, in a few sentences, how
   you'd actually start building it.
3. Name the three tiers of Driftwood's Cloud Engineer → Cloud Architect capstone path in
   order, and one sentence for what scope each one added.

## Check yourself

This capstone — and Driftwood's Cloud Engineer → Cloud Architect path's core sequence — is
complete when you can explain, without notes, why this capstone built a multi-AZ,
multi-cloud platform with real cost visibility instead of a simpler setup, and what the
incident and its aftermath actually demonstrated about the difference between fixing a
problem and hardening a platform against the next one.
