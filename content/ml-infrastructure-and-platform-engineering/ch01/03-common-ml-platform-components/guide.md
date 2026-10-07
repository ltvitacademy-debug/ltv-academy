# Common ML Platform Components

Whether a team builds, buys, or mixes both, the actual list of components an ML platform needs turns out to be fairly consistent across companies. This lesson maps that list, so the rest of this course has a shared vocabulary — Chapters 2 through 7 each go deep on one of these pieces.

## What you'll learn

- The six components that show up in nearly every mature ML platform
- What each one is actually for, in one sentence
- How the components connect to each other across the model lifecycle
- Which components this course covers in later chapters, and in what order

## The six core components

- **Feature store** — a system for defining, computing, storing, and serving the input features models use, so the exact same feature definition is used in training and in live prediction. Covered in Chapter 2.
- **Experiment tracking** — logs every training run's parameters, metrics, and artifacts, so you can compare run #214 against run #389 without digging through someone's notebook history. Covered in Chapter 3.
- **Model registry** — a versioned catalog of trained models, with metadata about what's in production, what's staged, and what's archived. Also Chapter 3.
- **Pipeline orchestration** — the scheduler and dependency graph that runs data prep, training, and evaluation as a reproducible, repeatable job instead of a notebook someone runs by hand. Covered in Chapter 4.
- **Deployment infrastructure** — the tooling that packages a trained model and serves it, including rollout strategies like canary and blue-green deployment. Covered in Chapter 5.
- **Monitoring and reliability tooling** — dashboards and alerting for model performance, data drift, and system health, plus the on-call and incident response practices built around them. Covered in Chapter 7.

A seventh thread, **versioning and lineage** (Chapter 6), runs through all of the above rather than standing alone — every component above needs to answer "which version of this ran, on which data, producing which result," and that thread connects feature definitions, pipeline runs, and model artifacts together.

## How they connect across the lifecycle

Picture a single model's path through these systems in order:

1. A data scientist defines a feature in the **feature store**, which both backfills historical values for training and serves fresh values in production.
2. A **pipeline** pulls those features, trains a candidate model, and logs the run — parameters, metrics, output artifacts — to the **experiment tracker**.
3. The best candidate gets registered in the **model registry**, moving through stages like "staging" and "production" as it's validated.
4. **Deployment infrastructure** packages that registered model and rolls it out, often gradually, to serving infrastructure.
5. **Monitoring** watches the live model's predictions and the data flowing into it, and feeds back into the loop — a drift alert might trigger a new pipeline run, closing the cycle.

No single component does this alone; a platform is the set of handoffs between them being reliable and observable, not any one tool being impressive on its own.

## Why this list is consistent across companies

These six components map almost one-to-one onto the stages every supervised ML project goes through: get data in a consistent shape, run experiments, pick a winner, ship it, and watch it. That's why the same six names — feature store, tracker, registry, pipeline, deployment, monitoring — show up whether a company is using a single managed platform like SageMaker (where all six live under one roof) or a fully self-hosted open-source stack (Feast, MLflow, Airflow, a custom serving layer, and Grafana/Prometheus-based monitoring, say). The names on the components are a platform engineering concern; the six jobs those components do are not optional.

## Key terms

| Term | Meaning |
|---|---|
| Feature store | System for defining, storing, and serving model input features consistently across training and production |
| Experiment tracking | Logging of training run parameters, metrics, and artifacts for comparison and reproducibility |
| Model registry | Versioned catalog of trained models with lifecycle stage metadata (staging, production, archived) |
| Pipeline orchestration | Scheduling and dependency management for data prep, training, and evaluation as reproducible jobs |
| Deployment infrastructure | Tooling to package and roll out a trained model to serving infrastructure |

## Recap

Six components — feature store, experiment tracking, model registry, pipeline orchestration, deployment infrastructure, and monitoring — show up in almost every mature ML platform, connected by a thread of versioning and lineage running through all of them. The rest of this course goes deep on each, starting with feature stores in Chapter 2. Next up, Lesson 4: how the need for these components changes as a company scales from one model to hundreds.
