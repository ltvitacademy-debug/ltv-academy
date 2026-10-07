# Comparing Model Versions in Production

A new model version that beats the old one offline is a candidate, not a verdict. This lesson covers how teams actually decide whether a challenger replaces a champion: comparing runs with real tooling, and rolling a challenger out carefully enough that a bad decision doesn't take down production.

## What you'll learn

- The champion/challenger pattern as the default framing for this decision
- How to compare runs quantitatively with `mlflow.search_runs()` and the MLflow UI's Compare view
- Shadow deployment: letting a challenger see real traffic without acting on it
- Canary rollout: letting a challenger serve a small slice of real traffic
- The promotion gate that should sit between "looks better" and "is now champion"

## Champion and challenger

Every production model system eventually needs a vocabulary for "the model currently live" versus "the model being evaluated to possibly replace it." The common pattern, and the one Lesson 11's aliases are built for, is **champion** (what's serving traffic now) and **challenger** (a candidate competing to take over). Nothing gets promoted to champion just because it exists — it has to clear a sequence of comparisons first.

## Step one: compare offline, on the same evaluation set

Before anything touches real traffic, a challenger has to beat the champion on an identical, fixed holdout set — never a different sample, never a different time window. MLflow makes this a query, not a manual spreadsheet exercise:

```python
import mlflow

runs = mlflow.search_runs(
    experiment_names=["fraud-detection"],
    order_by=["metrics.val_auc DESC"],
)
print(runs[["run_id", "params.max_depth", "metrics.val_auc"]].head())
```

`search_runs()` returns a pandas DataFrame, so comparing ten candidate runs is a sort and a `head()` call, not ten browser tabs. The same comparison is available visually in the tracking UI's run list and its Compare view, which plots multiple runs' metrics side by side.

![MLflow's run list page, showing multiple tracked runs with their parameters and metrics as sortable columns](/courses/ml-infrastructure-and-platform-engineering/ch03/14-comparing-model-versions-in-production/mlflow-ui-run-list.png)
*Every column here is sortable — ranking runs by validation AUC is a click, not a spreadsheet export.*
Source: [MLflow Documentation — Hyperparameter Tuning tutorial](https://mlflow.org/docs/latest/ml/getting-started/hyperparameter-tuning/)

![MLflow's Compare Runs chart view, plotting a metric across several selected runs so trends are visible at a glance](/courses/ml-infrastructure-and-platform-engineering/ch03/14-comparing-model-versions-in-production/mlflow-ui-compare-metrics.png)
*Selecting several runs and switching to Chart view turns a table of numbers into a trend you can actually read.*
Source: [MLflow Documentation — Hyperparameter Tuning tutorial](https://mlflow.org/docs/latest/ml/getting-started/hyperparameter-tuning/)

Weights & Biases does the same comparison through its own run tables and Reports feature, which lets you pin several runs' metrics into one shareable view — same purpose, different vendor.

## Step two: shadow deployment

Beating a fixed holdout set is necessary but not sufficient — offline evaluation sets go stale, and production traffic has patterns a static holdout can't capture. **Shadow deployment** addresses this: the challenger receives a copy of real production traffic and produces real predictions, but those predictions are logged, not served or acted on. The champion keeps serving every actual decision. This is how you find out a challenger behaves badly on live traffic with literally zero user-facing risk.

## Step three: canary rollout

Once a challenger survives shadow deployment, a **canary rollout** lets it serve a small percentage of real traffic — predictions it makes now actually count. Monitoring compares the champion's and challenger's real-world metrics (not just the offline metric that got it this far) on equal footing, with the blast radius of a mistake capped to that small percentage. The canary slice is typically increased gradually, not jumped to 100%.

## The promotion gate

Only after clearing all three steps — offline comparison, shadow, canary — should a challenger actually become champion:

```python
client.set_registered_model_alias(
    name="fraud-detector", alias="champion", version=12
)
```

That single line is the entire mechanical act of promotion, by design. Lesson 11 made alias reassignment a one-line, instant operation on purpose, so that all the real work — and all the real risk — happens in the comparisons that come before it, not in the promotion step itself.

## Key terms

| Term | Meaning |
|---|---|
| Champion | The model version currently serving real production decisions |
| Challenger | A candidate version being evaluated to possibly replace the champion |
| Shadow deployment | Running a challenger on real traffic without serving or acting on its predictions |
| Canary rollout | Serving a small, gradually increased percentage of real traffic from the challenger |

## Recap

Promoting a model version is a decision earned through stages, not a single comparison: beat the champion on a fixed offline set using `mlflow.search_runs()` or the Compare UI, survive shadow deployment on real traffic with zero risk, then prove out on a small canary slice before the one-line alias reassignment that makes it official. This closes out Chapter 3 — in Chapter 4, you'll see how all of this, including training itself, gets automated into pipelines.
