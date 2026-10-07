# Capstone Write-Up

This is the final lesson of ML Infrastructure & Platform Engineering. Lesson 34 asked you to design a platform for Northline Analytics; this lesson is about turning that design into a document — the kind you'd actually hand to a hiring manager, a staff engineer doing a design review, or your own team before a quarter of work. A great design that only exists in your head is indistinguishable, to everyone else, from no design at all.

## What you'll learn

- The sections a platform design write-up needs, in the order a reader actually wants them
- What a technical reviewer or hiring manager is really evaluating when they read one
- How to write the tradeoffs section — the part most people skip, and the part that matters most
- A recap of all seven chapters of this course, as a single coherent system
- Where this course sits in the broader ML Systems Engineer path, and what's next

## The structure of a platform design write-up

A write-up that just lists what you'd build, in no particular order, reads like a shopping list. A write-up that a reviewer actually wants to read follows a structure closer to this:

1. **Problem statement** — one paragraph, no jargon yet. What is Northline actually struggling with, in terms a non-engineer would recognize? ("We don't know which model version is live, and that already caused a four-hour outage.")
2. **Current state** — what exists today, briefly, so the reader understands the starting point. This is where you name the ad hoc setup: notebook-trained models, manual retraining, SSH-and-restart deployments.
3. **Proposed architecture** — the actual design: feature store, registry, pipelines, deployment path, versioning, reliability practice. This is the longest section, and it's where the terms from every chapter of this course earn their place — not as jargon, but because they're the precise name for the piece being described.
4. **Tradeoffs** — covered in detail below, because it's the section that separates a strong write-up from a mediocre one.
5. **Sequencing / rollout plan** — what gets built first and why, tied to which current pain point is costing the most (Lesson 34's registry-first, feature-store-second logic is a worked example of this section).
6. **Reliability plan** — SLOs, on-call, incident response, specifically for the new platform — not an afterthought bolted on at the end, but a first-class section.
7. **What you'd build first, concretely** — one paragraph naming the literal first ticket you'd open.

## The tradeoffs section — the one most people skip

It's tempting to write a design doc as if the proposed architecture is simply correct, with no downsides. Every real design has costs, and naming them is what makes a write-up credible instead of promotional. For the Northline design from Lesson 34, honest tradeoffs look like:

- **A central feature store adds latency and an operational dependency.** Every model's inference path now depends on the feature store being up; a single point of failure has been introduced in exchange for consistency. Worth naming, and worth pairing with a fallback plan.
- **Canary deployments slow down releases.** A model that could ship in an hour now takes longer, because it has to clear a canary window and an approval gate first. That's a deliberate trade of speed for safety, and a reviewer wants to see that you know it's a trade, not a free win.
- **Per-model SLOs require per-model ownership.** Someone has to actually decide the fraud model's SLO target, and that decision-making overhead is real, recurring work — it doesn't happen automatically just because a config file exists.
- **Sequencing means some real pain persists longer.** Building the registry first means the feature-duplication problem keeps causing silent errors for however long that takes — an honest write-up says this out loud rather than implying everything gets fixed on day one.

## What a reviewer or hiring manager is actually looking for

Someone reading this write-up — in an interview, in a real design review, anywhere — is rarely checking whether you memorized the right vocabulary. They're checking for:

- **Specificity over vocabulary.** "We'll use a feature store" is vocabulary. "The feature store splits online lookups, which the fraud models need in under 10ms, from offline training reads, which the pricing model's weekly job can tolerate at higher latency" is specificity. The second one proves you understand *why* the piece exists, not just its name.
- **Tradeoff reasoning**, as above — a design with zero acknowledged downsides reads as either inexperienced or dishonest.
- **Reliability awareness baked in, not bolted on.** A design that adds SLOs and on-call as section 6 of 7, reasoned about with the same care as the architecture itself, reads very differently from one that mentions "and we'll also have monitoring" in a single afterthought sentence.
- **Real terminology used correctly.** Not jargon for its own sake — a reviewer who's been doing this work will immediately notice if "canary deployment" and "blue-green deployment" are used interchangeably when they aren't the same thing, or if "SLO" and "SLA" are swapped.

## This course, in seven chapters

- **Chapter 1 — What an ML Platform Does.** The platform team's job, build-vs-buy, the common components, and how needs change with scale — the inflection point Northline hit at 15 models.
- **Chapter 2 — Feature Stores.** Online vs. offline features, architecture patterns, training/serving skew, and feature versioning — the fix for Northline's duplicate-feature problem.
- **Chapter 3 — Experiment Tracking & Model Registries.** Tracking as infrastructure, registries, versioning strategies, and lineage from data to deployed model — the fix for "what's actually live."
- **Chapter 4 — ML Pipelines & Orchestration.** Pipeline frameworks, scheduling, failure handling, and retraining pipelines — replacing "retrained manually every few months" with something reliable.
- **Chapter 5 — Model Deployment Infrastructure.** Packaging, CI/CD, canary and shadow deployments, rollback, approval gates, and blue-green deployment — the fix for the four-hour outage.
- **Chapter 6 — Data & Model Versioning.** Data versioning tools, reproducibility, artifact storage, and auditability — turning "what trained this" into an always-answerable question.
- **Chapter 7 — Platform Reliability for ML.** SLOs and error budgets, on-call, incident response, and this capstone — turning "is it working" from a vibe into a number, and a number into a process.

## Where this fits, and what's next

This course is the third course in the AI Infrastructure / ML Systems Engineer path, building on Distributed Training Infrastructure before it. Everything in this course assumed a model can already be trained at scale — the platform layer covered here is what a team builds once training is solved and the real problem becomes running more than one model, reliably, without every new model multiplying the team's operational burden. If you're continuing in this path, the next course builds on the deployment and reliability concepts from this course directly.

## Key terms

| Term | Meaning |
|---|---|
| Design write-up | A structured document presenting a proposed architecture, its tradeoffs, and a rollout plan |
| Tradeoffs section | The part of a write-up naming the real costs and risks of the proposed design, not just its benefits |
| Specificity | Explaining why a component is needed and how it behaves, not just naming it |
| Reliability plan | SLOs, on-call, and incident response treated as a first-class section of a design, not an afterthought |

## Recap

A platform design write-up earns a reader's trust with structure — problem, current state, architecture, tradeoffs, sequencing, reliability plan — and with honesty about what the design costs, not just what it buys. Reviewers and hiring managers are reading for specificity and tradeoff reasoning, not vocabulary. This course took you from what an ML platform even does, through feature stores, experiment tracking and registries, pipelines, deployment infrastructure, versioning, and finally reliability — seven chapters that, together, describe the system Northline Analytics needed and that any team crossing from one model to many eventually needs too.

This completes ML Infrastructure & Platform Engineering.
