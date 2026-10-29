# Lesson 19 — CI/CD for Models, Not Just Application Code

**Chapter 5 · MLOps Pipelines for Model Lifecycle Management · Lesson 3 of 4**

## What you'll learn

- Why the CI/CD and GitOps discipline from course 12 applies directly to
  models, with the same core idea and a few important differences
- What triggers an automated **retraining** run, as opposed to a developer
  manually kicking one off
- How an automated **evaluation gate** inside a pipeline replaces a human
  eyeballing a metric before a model is promoted
- How this connects back to the model registry from lesson 18 to make
  promotion itself a pipeline step, not a manual action

## The same discipline, a different artifact

In course 12 you built CI/CD pipelines for application code: a commit
triggers a pipeline, the pipeline runs tests, and — if those tests pass —
the change is automatically built, deployed, and (with GitOps) reconciled
into the live environment without anyone running a manual `kubectl apply`.
MLOps CI/CD is the same shape with a different artifact at the center. The
"commit" that triggers a run isn't always a code change — it's just as
often new data arriving or a monitoring alert firing. The "tests" aren't
unit tests — they're the evaluation gate from lesson 17. And the
"deployment" is a model registry promotion, not a container rollout. Same
pipeline discipline, applied to a model instead of a binary.

## What actually triggers a retraining run

A production retraining pipeline typically fires for one of three reasons:

1. **Scheduled retraining.** New data accumulates continuously (new
   transactions, new user events), so the pipeline re-runs on a fixed
   schedule — nightly, weekly — purely because fresh data exists.
2. **Drift-triggered retraining.** The monitoring system from lesson 20
   detects that live data or performance has diverged enough from training
   time to raise an alert, and that alert fires the pipeline directly.
3. **Code or config change.** Someone changes the training script, the
   feature engineering logic, or a hyperparameter default and commits it —
   the same Git-push trigger you already know from application CI/CD.

```yaml
# .github/workflows/retrain.yml (simplified)
on:
  schedule:
    - cron: "0 3 * * 0"       # weekly scheduled retrain
  repository_dispatch:
    types: [drift-alert]       # triggered by the monitoring system
  push:
    paths: ["training/**"]     # triggered by a training-code change
jobs:
  retrain:
    steps:
      - run: python train.py
      - run: python evaluate.py --gate-against=production
```

## The evaluation gate, automated

This is the heart of model CI/CD: instead of a person looking at a
dashboard and deciding "looks good, ship it," the pipeline itself compares
the newly trained model's metrics against the current production model's
metrics (pulled straight from the registry) and only proceeds if the new
model clears the bar.

```python
new_metrics = evaluate(new_model, test_set)
prod_version = registry_client.get_model_version("fraud-model", stage="Production")
prod_metrics = registry_client.get_metrics(prod_version)

if new_metrics["f1"] <= prod_metrics["f1"]:
    sys.exit(1)   # pipeline fails here — no promotion happens
```

A failed gate is not a bug — it's the pipeline working correctly. Most
retraining runs on real-world drift data will *not* beat the current
production model, and the gate's entire job is making sure a worse model
never gets shipped just because a scheduled job happened to run.

## Promotion as a pipeline step, not a human action

When a retrained model does clear the gate, the pipeline's final step
promotes it in the registry automatically — the same
`transition_model_version_stage` call from lesson 18, now triggered by a
passing pipeline run instead of a person typing a command. This is the
model equivalent of GitOps reconciliation from course 12: the desired state
(whichever model version has been promoted) is declared in the registry,
and nothing about getting there required a manual production change.

## Key terms

| Term | Meaning |
|---|---|
| Retraining trigger | The event that starts an automated retraining pipeline run: a schedule, a drift alert, or a code/config change |
| Automated evaluation gate | A pipeline step that compares a new model's metrics against the current production model's metrics and fails the pipeline if the new model doesn't clear the bar |
| CI/CD for models | Applying the commit-trigger / automated-check / automated-promotion pattern from application CI/CD to model training, evaluation, and registry promotion |
| Pipeline-driven promotion | Promoting a model version in the registry as an automated pipeline step after a gate passes, rather than as a manual action |

## Check yourself

You're ready for Lesson 20 when you can name the three common triggers for
an automated retraining run, and explain why a pipeline failing at the
evaluation gate is a sign the system is working, not broken.
