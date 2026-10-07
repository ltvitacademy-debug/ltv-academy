# Lineage: From Data to Deployed Model

When a production model starts behaving strangely, the first question is almost never "what's wrong with the model." It's "what fed this model, and what is this model feeding right now." Answering that requires lineage — a traceable chain connecting raw data all the way through to a deployed model instance. This lesson follows that chain link by link.

## What you'll learn

- The full lineage chain: data → features → training run → model version → deployment
- How MLflow captures dataset lineage with `mlflow.data` and `log_input()`
- How a registered model version links back to the exact run and commit that produced it
- Where a feature store fits as the data-to-features link
- Why lineage matters most during an incident, not during normal operation

## The chain, link by link

Lineage is the answer to "how did we get here," traced across five stages:

1. **Raw/source data** — the original table, stream, or file a pipeline reads from.
2. **Feature engineering / dataset version** — the transformed, feature-engineered snapshot actually used for training.
3. **Training run** — the tracked run (Lesson 10) with its parameters, metrics, code version, and environment.
4. **Registered model version** — the named, versioned artifact (Lesson 11) that run produced.
5. **Deployed instance** — the specific serving endpoint or batch job currently running that version.

Each link is a pointer to the one before it. If any link is missing — if a model version doesn't know which run trained it, or a run doesn't know which dataset snapshot it read — the chain breaks, and "what fed this model" becomes a question nobody can answer with certainty.

## Capturing the data → run link

MLflow's `mlflow.data` module lets a run log exactly which dataset it consumed, not just a path string that might point somewhere different tomorrow:

```python
import mlflow
import mlflow.data
from mlflow.data.pandas_dataset import from_pandas

dataset = from_pandas(
    train_df, source="s3://ml-data/fraud/2026-09-30/train.parquet"
)

with mlflow.start_run():
    mlflow.log_input(dataset, context="training")
    clf.fit(train_df.drop(columns=["label"]), train_df["label"])
```

`log_input` attaches the dataset's schema, row count, and source URI to the run as structured metadata — queryable the same way parameters and metrics are, and distinct from a comment that just says "trained on the usual data."

## Capturing the run → code link

When a training script runs from inside a git repository, MLflow autologs the commit hash as a tag without any extra code:

```python
# Inside a git-tracked repo, this happens automatically:
# mlflow.set_tag("mlflow.source.git.commit", "<commit sha>")
```

Combined with `log_input`, a single run now carries both "which code" and "which data" — two of the five links already closed automatically, before anyone has to remember to do it by hand.

## Capturing the run → model version link

This link is closed by the registry itself. Every model version created with `mlflow.register_model()` stores the `run_id` of the run its artifact came from:

```python
from mlflow import MlflowClient

client = MlflowClient()
mv = client.get_model_version("fraud-detector", "7")
print(mv.run_id)       # the exact run that trained this version
print(mv.source)       # the artifact URI within that run
```

From a model version, you can always walk backward to the run, and from the run, backward to the dataset and the code. That's three of the five links, all closed without a human maintaining a spreadsheet.

## The data → features link: where a feature store fits

The one link MLflow doesn't own is the connection between raw source data and the engineered features a model actually trains on. That's the job of a **feature store** (such as Feast): it defines feature transformations once, materializes them into a store both training and serving can read from, and records which raw sources and transformation logic produced each feature. When a feature's definition changes, a feature store can tell you every model that depends on it — the same way a tag query tells you every model version trained on a given dataset snapshot.

## The run → deployment link: closing the loop

The final link — which model version is actually deployed right now — has to be tracked wherever deployment happens: a deployment system tagging a serving endpoint with the model version it's running, or an alias like `@champion` (Lesson 11) resolved at deploy time and logged in the deployment's own metadata. Without this link, you can have perfect lineage back through training and still not know, during an incident, which version is live.

## Why lineage earns its cost during an incident

Most days, nobody queries any of this. The payoff shows up during an incident: a model's predictions degrade, and the real question is never "is the model bad" in isolation — it's "did the input data distribution shift," "did a feature's upstream source change," or "is the wrong version even deployed." A complete lineage chain turns that investigation from hours of guessing into a few queries: which dataset snapshot, which commit, which version, which deployment. Audits ask the same questions from the other direction — "prove what trained this model" — and the answer is the same chain, walked forward instead of backward.

## Key terms

| Term | Meaning |
|---|---|
| Lineage | The traceable chain from raw data through features, training, versioning, to deployment |
| `mlflow.data` / `log_input()` | MLflow's mechanism for attaching a structured dataset reference to a run |
| Feature store | A system (e.g. Feast) that owns the data-to-features link and tracks which features depend on which sources |
| Deployment link | The record of which model version is actually serving traffic right now |

## Recap

Lineage is five linked pointers — data, features, training run, model version, deployment — and MLflow closes three of those links automatically through `log_input()`, git-commit autologging, and the registry's own `run_id` tracking; a feature store closes the data-to-features link, and deployment metadata closes the final one. The payoff is almost entirely during incidents and audits, when "what fed this model" needs a fast, certain answer. Next, in Lesson 14, you'll use this same traceability to compare model versions already running in production.
