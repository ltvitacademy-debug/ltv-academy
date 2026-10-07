# Pipeline Frameworks for ML

Chapter 3 assumed a training script already existed and asked how to track, register, and compare what it produced. This chapter asks the question underneath that: what actually runs the training script, on what schedule, with what dependency management between its steps, and what happens when a step fails. That's the job of a pipeline framework — this lesson surveys the landscape before the next five lessons go deep.

## What you'll learn

- Why ML needs pipeline orchestration beyond a script someone runs by hand
- Apache Airflow: general-purpose DAG scheduling, Python-defined workflows
- Kubeflow Pipelines: Kubernetes-native, containerized ML steps
- Where Prefect, Metaflow, and Argo Workflows fit, briefly
- The difference between a training pipeline and an inference/serving pipeline

## Why a script isn't enough

A training script that someone runs by hand has three structural problems. It has no schedule — someone has to remember to run it. It has no dependency management between steps — if "download data" needs to finish before "train model" starts, that ordering lives in a person's memory or a brittle shell script. And it has no retry or failure handling — if step three of five fails at 2 a.m., nobody notices until someone looks. A pipeline framework turns each of those into something the system guarantees, not something a human has to remember.

## Apache Airflow: general-purpose orchestration

Airflow models a workflow as a **DAG** — a directed acyclic graph of tasks with explicit dependencies — defined in Python:

```python
from airflow.decorators import dag, task
from datetime import datetime

@dag(schedule="@daily", start_date=datetime(2026, 1, 1), catchup=False)
def fraud_training_pipeline():
    @task
    def extract(): ...
    @task
    def train(data): ...
    @task
    def evaluate(model): ...

    train(extract()) >> evaluate  # dependency, inferred/explicit

fraud_training_pipeline()
```

Airflow was built for general-purpose batch orchestration — it runs ETL, reporting jobs, and ML pipelines on the same scheduler, with a huge ecosystem of pre-built operators (databases, cloud storage, APIs) and a mature UI for monitoring runs. Its tasks are typically Python callables or operators executing against infrastructure Airflow itself doesn't own — it orchestrates compute, it doesn't containerize each step by default.

## Kubeflow Pipelines: ML-native, Kubernetes-native

Kubeflow Pipelines takes a different default: every pipeline step is a **component**, and every component runs as its own container on Kubernetes:

```python
from kfp import dsl

@dsl.component(base_image="python:3.11")
def train(data_path: str) -> str:
    # runs in its own container, with its own dependencies
    ...

@dsl.pipeline(name="fraud-training")
def fraud_training_pipeline(data_path: str):
    train_task = train(data_path=data_path)
```

Because each component is independently containerized, a pipeline compiled this way is portable — the exact same pipeline definition can run on any Kubernetes cluster with KFP installed, with each step carrying its own pinned dependencies rather than sharing a worker's environment. This trades some of Airflow's general-purpose flexibility for stronger reproducibility guarantees that matter specifically for ML.

## The rest of the landscape, briefly

A few other tools solve a similar problem with different trade-offs, worth recognizing by name even without a deep dive here:

- **Prefect** — Python-native orchestration with a lighter-weight mental model than Airflow, popular for teams that want DAGs without as much operational overhead.
- **Metaflow** — originated at Netflix, focused specifically on data science workflows with built-in versioning and a notably simple local-to-cloud scaling story.
- **Argo Workflows** — Kubernetes-native like Kubeflow Pipelines (Kubeflow Pipelines is actually built on top of Argo under the hood), used more generally for any containerized workflow, ML or not.

This course goes deep on Airflow and Kubeflow Pipelines specifically because together they represent the two dominant mental models — general-purpose scheduler vs. ML-native containerized pipeline — that most platform teams end up choosing between.

## Training pipelines vs. inference pipelines

One more distinction worth fixing before going further: a **training pipeline** runs on a schedule or a trigger, consumes data, and produces a model version as its output — it's naturally batch-shaped, and everything covered in this chapter is built around that shape. An **inference (serving) pipeline** is the opposite shape: it's continuously available or request-driven, takes one input at a time (or a small batch), and produces a prediction. Both get orchestrated, but they're orchestrated differently — a training pipeline's "run" is a single, bounded execution with a start and an end; a serving pipeline doesn't really have an "end" at all while it's live. This chapter is about the first kind.

## Key terms

| Term | Meaning |
|---|---|
| DAG | Directed acyclic graph — a workflow modeled as tasks with explicit, one-way dependencies |
| Component (Kubeflow) | A single pipeline step, independently containerized with its own dependencies |
| Training pipeline | A bounded, batch-shaped workflow that consumes data and produces a model version |
| Inference pipeline | A continuously running or request-driven workflow that produces predictions, not models |

## Recap

A training script run by hand has no schedule, no dependency guarantees, and no failure handling — a pipeline framework supplies all three. Airflow is the general-purpose DAG scheduler with a huge ecosystem; Kubeflow Pipelines containerizes every step for stronger portability and reproducibility, specifically for ML; Prefect, Metaflow, and Argo Workflows solve related problems with different trade-offs. Next, in Lesson 16, you'll see concrete Airflow and Kubeflow Pipelines code for the same ML workflow, side by side.
