# Capstone: Designing a Platform for a Growing ML Team

This is the capstone. Every chapter in this course has been a piece of a platform — a feature store, a registry, a pipeline, a deployment path, a versioning scheme, a reliability practice. This lesson gives you one realistic scenario and asks you to design the whole thing, end to end, naming the real concepts from every chapter as you go. There's no new material here — if a term from an earlier chapter shows up, it's because you already learned it.

## What you'll learn

- How to recognize the symptoms of a team that has outgrown its ad hoc ML setup
- A checklist of the platform components this entire course covered, mapped to the chapter that taught each one
- How to design the data and experimentation layer for a scaling team
- How to design the deployment and reliability layer for the same team
- How to reason about sequencing — what to build first when you can't build everything at once

## The scenario

**Northline Analytics** has one model in production: a churn-prediction model that flags at-risk customers for the retention team. It was built eighteen months ago by a single data scientist, lives in a notebook, is retrained manually every few months, and is deployed by SSH-ing into a box and restarting a Flask app. It works, mostly, because it's the only thing anyone has to keep track of.

Eighteen months later, Northline has 6 data scientists and 15 models in or near production: the original churn model, three fraud-detection variants, a recommendation model, a pricing model, four NLP models for support-ticket routing, and five more in active development. The symptoms of outgrowing the old setup are everywhere:

- Nobody can say which exact version of the pricing model is live, or what data trained it.
- Two data scientists have, independently, built two different "customer lifetime value" features with different definitions — and nobody noticed until a model trained on one broke when served with the other.
- The last fraud-model deployment caused a four-hour outage because the new version expected a feature that the old serving code didn't have, and nobody caught it before it hit production traffic.
- There is no on-call rotation. When a model breaks at 2am, whoever gets a panicked Slack message from the CEO is on-call, by accident.
- None of the 15 models has a documented SLO. "Is this working?" is answered by vibes, not numbers.

Design the platform Northline needs. This lesson walks through the shape of that answer; your job, before reading the design below, is to sketch your own — then compare.

## Step 1: the platform checklist, mapped to this course

Every one of Northline's symptoms maps directly onto a chapter of this course:

- **Feature store (Chapter 2)** — the duplicate "customer lifetime value" definition is exactly the problem a feature store with a single registered definition, shared online and offline, solves. It also prevents the training/serving skew that's clearly happening elsewhere in Northline's models.
- **Experiment tracking & model registry (Chapter 3)** — "nobody can say which version is live" is a registry problem. Every model needs a registered version with lineage back to the data and code that produced it.
- **Pipelines & orchestration (Chapter 4)** — "retrained manually every few months" doesn't scale to 15 models; this needs a real orchestrated, scheduled, failure-aware pipeline per model.
- **Deployment infrastructure (Chapter 5)** — the four-hour outage from a missing feature is precisely what canary deployments and deployment approval gates exist to catch before full traffic sees it.
- **Data & model versioning (Chapter 6)** — reproducibility and auditability, so "what data trained this" is never again an unanswerable question.
- **Platform reliability (Chapter 7)** — no SLOs, no on-call, no incident process. Northline is flying blind on all three.

Fifteen models is exactly the inflection point Chapter 1 described: one model tolerates ad hoc tooling, fifteen does not, because the cost of inconsistency multiplies with every additional model sharing no common ground.

## Step 2: the data & experimentation layer

The feature duplication problem is the most urgent one to fix, because it's actively causing silent errors across multiple teams, not just one. Design:

- **A central feature store** (Chapter 2) with a clear separation between online serving (low-latency key-value lookups for the fraud and churn models, which score in real time) and offline training (batch reads for the pricing and recommendation models' periodic retraining). Every feature gets registered once, with an owner and a definition, closing the door on two data scientists building incompatible versions of the same concept.
- **A shared experiment tracking system and model registry** (Chapter 3), so every one of the 15 models — regardless of which data scientist built it — logs its training runs, parameters, and resulting artifacts to the same place. The registry becomes the single source of truth for "what's live," solving Northline's version-confusion problem directly.
- **Feature and data lineage** (Chapter 2 and Chapter 6 together), so that when a model misbehaves, the path from a bad prediction back to the exact feature values, the exact data snapshot, and the exact code version that produced it is traceable in minutes, not days.

## Step 3: the deployment & reliability layer

With the data layer solid, the second half of Northline's problems — outages and blind spots — gets addressed:

- **CI/CD for ML with canary deployments** (Chapter 5), so a new model version serves a small fraction of traffic first. The missing-feature outage that took down fraud detection for four hours would have been caught by 1% canary traffic instead of 100%, with a deployment approval gate blocking full rollout until the canary's own SLOs look healthy.
- **A defined rollback strategy** (Chapter 5) for every model, rehearsed before it's needed — not improvised at 2am.
- **SLOs and an error budget for each model** (Chapter 7, Lesson 31), scoped individually — Northline's fraud models, sitting in a real-time decision path, need a much tighter latency and availability SLO than the weekly-batch pricing model, and treating them identically would either over-constrain the pricing model or under-protect fraud detection.
- **A real on-call rotation with runbooks** (Chapter 7, Lesson 32), replacing "whoever the CEO happens to message." Paging thresholds tied to each model's error-budget burn rate, not raw metric noise.
- **An incident response process** (Chapter 7, Lesson 33) for the inevitable next silent degradation — a drift check on the feature store's most business-critical features would have caught the kind of problem this course's Lesson 33 walked through before it became an 8%-conversion-drop mystery.

## Step 4: sequencing — what to build first

Northline cannot build all of this simultaneously with 6 data scientists. A reasonable sequence:

1. **Model registry first** — cheapest to stand up, and it immediately answers "what's live," the most painful unknown today.
2. **Feature store second** — stops the bleeding on duplicate and skewed features, which is actively producing wrong answers right now.
3. **Canary deployments and basic SLOs third** — prevents the next four-hour outage, which is the most expensive single failure mode Northline has already experienced.
4. **On-call rotation and incident process fourth** — formalizes what's already happening ad hoc, once there's something worth protecting with a process.
5. **Full pipeline orchestration and versioning/audit infrastructure last** — valuable, but least urgent relative to the active pain points above.

## Key terms

| Term | Meaning |
|---|---|
| Platform inflection point | The scale (here, roughly 15 models) at which ad hoc tooling starts actively costing more than building shared infrastructure |
| Single source of truth | One registry or store that resolves "which version/definition is correct," eliminating duplicate or conflicting answers |
| Canary deployment | Serving a new model version to a small fraction of traffic before a full rollout |
| Sequencing | Deciding build order based on which current pain point is costing the most, not which is most interesting to build |

## Recap

Northline's 15-model mess maps cleanly onto all seven chapters of this course: a feature store and registry fix the data-layer confusion, canary deployments and rollback strategies fix the deployment risk, and SLOs, on-call, and incident response fix the reliability blind spots. None of it needs to happen at once — registry first, feature store second, deployment safety third, on-call fourth, full orchestration and audit infrastructure last, each step addressing whichever pain point is currently costing Northline the most. Next up, Lesson 35: turning this design into a write-up a reviewer or hiring manager would actually want to read.
