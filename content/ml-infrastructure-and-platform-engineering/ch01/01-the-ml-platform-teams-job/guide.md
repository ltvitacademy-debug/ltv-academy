# The ML Platform Team's Job

Welcome to ML Infrastructure & Platform Engineering, the third course in the AI Infrastructure / ML Systems Engineer destination. The last two courses assumed a single model, trained on a single machine or a single distributed training job. This course asks what happens once a company has more than one model in production, built by more than one team. That's the moment an "ML platform team" gets created — and this lesson is about what that team is actually on the hook for.

## What you'll learn

- How an ML platform team's job differs from a data scientist's job and from a general infrastructure/DevOps team's job
- The "paved road" idea — why platform teams build reusable defaults instead of custom pipelines per project
- What goes wrong before a platform team exists, and why that pain is what gets one funded
- How to tell, from a job posting or a team's charter, whether "ML platform" actually means platform work or just means "ML engineer with a wider mandate"

## Three roles, one pipeline

A model going from idea to production usually passes through three different kinds of ownership, and it's easy to blur them:

- **Data scientists / ML engineers** decide what the model should predict, pick features, train candidate models, and evaluate them against a metric that matters to the business.
- **ML platform engineers** build and operate the systems that data scientists use to do that work repeatably — feature stores, experiment tracking, pipeline orchestration, model registries, deployment tooling, and monitoring.
- **Infrastructure / DevOps / platform-at-large teams** own the layer underneath all of that — Kubernetes clusters, cloud networking, IAM, cost controls — which the ML platform team consumes rather than rebuilds.

The ML platform team sits in the middle. They don't usually train the models that go to production, and they don't usually provision raw compute from scratch. Their customer is the data scientist, and their product is the tooling that data scientist uses every day.

## The paved road

The phrase you'll hear constantly in this field is **"paved road"** (sometimes "golden path"): a supported, opinionated way to do something, versus an unlimited number of ways nobody but the original author understands six months later. A platform team's real deliverable isn't any one tool — it's making the paved road the path of least resistance, so following the standard is easier than going around it.

Three things usually define a working paved road:

1. **Self-service.** A data scientist can register a feature, kick off a training run, or deploy a model without filing a ticket and waiting on a platform engineer to do it by hand.
2. **Shared building blocks.** Every team uses the same feature store, the same experiment tracker, the same CI/CD pipeline for models — not a bespoke version each team wrote themselves.
3. **Guardrails that come for free.** Logging, versioning, rollback, and access control are built into the paved road, so a team doesn't have to remember to add them — and can't easily skip them.

## What it looks like before a platform team exists

Platform teams don't get created speculatively; they get created because the pain of *not* having one becomes visible to leadership. Before a platform team exists, a company with several models in production typically has:

- **Duplicated plumbing.** Every team writes its own training script, its own feature-engineering code, its own deployment script — often solving the same problem slightly differently each time.
- **No shared standards.** One model is versioned in a spreadsheet, another in a dict pickled next to the weights, a third not versioned at all. Nobody can answer "which version of this model is serving traffic right now" with confidence.
- **Slow, inconsistent time-to-production.** Shipping a new model takes weeks of manual setup instead of days, and the time varies wildly by which engineer happens to do it.

This is the gap an ML platform team is hired to close — not by doing data science, but by making the mechanics of shipping a model fast, consistent, and boring in the good sense.

## Key terms

| Term | Meaning |
|---|---|
| ML platform team | The team that builds and operates shared tooling (feature stores, pipelines, registries, deployment, monitoring) for other teams training and shipping ML models |
| Paved road / golden path | A supported, opinionated default workflow that's easier to follow than to work around |
| Self-service | A workflow a data scientist can complete without a platform engineer doing it manually on their behalf |
| Snowflake pipeline | A one-off, custom-built training/serving pipeline that isn't shared or standardized across teams |

## Recap

An ML platform team's job is to build the paved road — shared, self-service tooling for feature engineering, training, deployment, and monitoring — so that data scientists aren't each reinventing the same plumbing, and infrastructure teams aren't fielding one-off requests for things that should be standardized. Next up, Lesson 2: deciding which pieces of that paved road to build in-house versus buy.
