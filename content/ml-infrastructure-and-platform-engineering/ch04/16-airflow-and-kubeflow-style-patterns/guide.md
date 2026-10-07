# Airflow- & Kubeflow-Style Patterns

Lesson 15 covered why ML teams need a pipeline framework at all instead of a folder
of notebooks run by hand. This lesson gets concrete about the two dominant mental
models you'll actually meet on the job: Airflow's task-graph model, and Kubeflow
Pipelines' containerized-component model. They solve the same problem — "run these
steps in order, with dependencies" — but they make very different tradeoffs, and
knowing which one you're looking at changes how you debug it.

## What you'll learn

- How an Airflow DAG built with the TaskFlow API expresses an ML training workflow
- How a Kubeflow Pipelines (KFP) v2 pipeline expresses the same workflow as
  independently containerized components
- The real difference between the two models: shared-process tasks vs.
  portable, isolated components
- Which one tends to win for which kind of team and workload

## The Airflow model: Python callables on shared infrastructure

Airflow's TaskFlow API (the modern way to write DAGs — plain `@task`-decorated
Python functions instead of hand-wired Operator objects) represents an ML workflow
as a graph of tasks that all run inside the same Airflow execution environment:

```python
from airflow.decorators import dag, task
from datetime import datetime

@dag(schedule="@daily", start_date=datetime(2026, 1, 1),
     catchup=False, tags=["ml-training"])
def fraud_model_training():

    @task
    def extract_data():
        return "s3://ml-data/fraud/2026-10-07/snapshot.parquet"

    @task
    def train_model(data_uri: str):
        model_uri = run_training_job(data_uri)
        return model_uri

    @task
    def evaluate_model(model_uri: str):
        metrics = run_evaluation(model_uri)
        return metrics

    @task
    def register_model(model_uri: str, metrics: dict):
        import mlflow
        if metrics["auc"] >= 0.85:
            mlflow.register_model(model_uri, "fraud-model")

    data_uri = extract_data()
    model_uri = train_model(data_uri)
    metrics = evaluate_model(model_uri)
    register_model(model_uri, metrics)

fraud_model_training()
```

Return values flow between tasks through Airflow's **XComs** (cross-communications)
under the hood — that's how `data_uri` and `model_uri` move from one `@task`
function's return value into the next function's argument. The `>>` operator
you've seen in classic Airflow DAGs is still there; TaskFlow just infers it
automatically from the function calls, since `train_model(data_uri)` already makes
the dependency explicit.

The key property: every one of these tasks runs as a Python function inside
worker processes that share the same Airflow environment, the same installed
packages, the same base image. That's convenient — no per-task container to build —
but it also means "works on the extract task" and "works on the train task" depend
on the *same* environment being right for both.

## The Kubeflow model: independently containerized components

Kubeflow Pipelines (KFP) v2 takes the opposite bet: every step is its own
container, built from its own base image, with explicitly typed inputs and
outputs. You write components with the `@dsl.component` decorator from the KFP SDK:

```python
from kfp import dsl
from kfp.dsl import Output, Input, Model, Metrics

@dsl.component(base_image="python:3.11", packages_to_install=["scikit-learn"])
def train(data_uri: str, model: Output[Model]):
    clf = fit_model(data_uri)
    save_model(clf, model.path)

@dsl.component(base_image="python:3.11")
def evaluate(model: Input[Model], metrics: Output[Metrics]):
    auc = score_model(model.path)
    metrics.log_metric("auc", auc)

@dsl.pipeline(name="fraud-model-training")
def fraud_pipeline(data_uri: str):
    train_task = train(data_uri=data_uri)
    evaluate(model=train_task.outputs["model"])
```

That pipeline function is compiled, not just run directly:

```python
from kfp import compiler

compiler.Compiler().compile(
    pipeline_func=fraud_pipeline,
    package_path="fraud_pipeline.yaml",
)
```

Compiling produces a portable YAML/IR file describing the whole DAG, which you
submit to any KFP-compatible backend (Kubeflow Pipelines on Kubernetes, or Vertex
AI Pipelines, which runs the exact same compiled artifact). Each component's
`Output[Model]` and `Input[Model]` aren't just return values — KFP wires them to
actual artifact storage, so the `model` produced by `train` is a real, tracked
artifact that `evaluate` reads back in its own, separately built container.

That compiled pipeline is also what renders as a visual graph once it runs — the
Kubeflow Pipelines UI shows each component as a node, wired by its real input/output
artifacts:

![The Kubeflow Pipelines UI graph view for a real XGBoost training pipeline: each pipeline step renders as its own node, connected by arrows showing the artifact inputs and outputs passed between components.](/courses/ml-infrastructure-and-platform-engineering/ch04/16-airflow-and-kubeflow-style-patterns/kubeflow-pipelines-graph-view.png)
*Every node here is one independently containerized component — the arrows are the typed artifacts (like the `Output[Model]` from `train` above) flowing from one container's output into the next container's input, not just a scheduling order.*
Source: [Kubeflow Pipelines Documentation — Graph](https://www.kubeflow.org/docs/components/pipelines/concepts/graph/)

## The actual difference, and why it matters

| | Airflow TaskFlow | Kubeflow Pipelines v2 |
|---|---|---|
| Unit of work | Python function, runs in shared worker env | Independent container, own base image |
| Portability | Tied to the Airflow deployment's environment | Compiled artifact runs on any KFP backend |
| Typical strength | General orchestration, scheduling, broad ecosystem | ML-specific artifact typing, reproducible containers |
| Typical weakness | Environment drift across tasks sharing one image | Container build/startup overhead per step |

Neither one is "more correct." A platform team running mixed workloads — some
ML, a lot of ordinary ETL — often standardizes on Airflow because one scheduler
covers everything. A team that needs every training step to be bit-for-bit
portable across environments (local, staging, a different cloud) leans toward
Kubeflow Pipelines, because the container boundary is exactly what makes a step
reproducible outside of "whatever happened to be installed on the Airflow workers
that day."

## Key terms

| Term | Meaning |
|---|---|
| TaskFlow API | Airflow's `@task`/`@dag`-decorator syntax for writing DAGs as plain Python functions |
| XCom | Airflow's mechanism for passing small return values between tasks |
| `@dsl.component` | KFP decorator that turns a Python function into an independently containerized pipeline step |
| Compiled pipeline (IR YAML) | The portable artifact KFP's compiler produces from a `@dsl.pipeline` function |

## Recap

Airflow's TaskFlow API expresses an ML workflow as Python functions sharing one
execution environment, wired together with `>>` and XComs. Kubeflow Pipelines
expresses the same workflow as independently containerized, typed components,
compiled into a portable artifact. Up next, Lesson 17: Building a Reproducible
Training Pipeline — where we take this a step further and make sure a pipeline
like the one above gives a stranger the exact same model every time it runs.
