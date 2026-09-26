# Hyperparameter Tuning at Scale

You already know that hyperparameters, such as a tree's depth or a learning rate, are settings you choose before training rather than values the model learns. Finding good ones means training many candidates and comparing them. On a laptop that is a loop; in Azure Machine Learning it becomes a **sweep job** that fans the candidates out across a compute cluster, tracks every one, and can cancel the losers early.

> Cloud code in this lesson is illustrative and was not run here (no Azure account). It follows the Microsoft Learn "Hyperparameter tuning a model (v2)" guide as of this writing; check the current docs before copying names into production. The local example was run for real.

## What you'll learn

- The four parts of a sweep job: search space, sampling, objective, limits
- How random, grid and Bayesian sampling differ, and when to pick each
- How early termination policies save compute
- How to read the studio's tuning charts
- Why data preparation belongs outside the sweep

## The idea, run locally first

Before the cloud version, here is the same concept in about twenty lines: sample settings, train, log each trial to MLflow as a nested run, keep the best. The data is a synthetic, illustrative classification set.

```python
import random, mlflow
from sklearn.datasets import make_classification
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split

X, y = make_classification(n_samples=1500, n_features=12,
                           n_informative=6, random_state=7)
X_tr, X_va, y_tr, y_va = train_test_split(X, y, test_size=0.25,
                                          random_state=7)

def trial(learning_rate, max_depth):
    model = GradientBoostingClassifier(
        learning_rate=learning_rate, max_depth=max_depth,
        n_estimators=100, random_state=7)
    model.fit(X_tr, y_tr)
    return model.score(X_va, y_va)

mlflow.set_tracking_uri("file:./mlruns")
mlflow.set_experiment("local-sweep")
random.seed(42)
with mlflow.start_run(run_name="sweep"):
    for i in range(8):
        lr = 10 ** random.uniform(-2.5, -0.5)   # log-uniform
        depth = random.choice([2, 3, 4, 5])
        with mlflow.start_run(run_name=f"trial-{i}", nested=True):
            mlflow.log_params({"learning_rate": round(lr, 4),
                               "max_depth": depth})
            acc = trial(lr, depth)
            mlflow.log_metric("accuracy", acc)
        print(f"trial {i}: lr={lr:.4f} depth={depth} acc={acc:.3f}")
```

Output from the run (your numbers depend on library versions):

```
trial 0: lr=0.0601 depth=2 acc=0.779
trial 1: lr=0.0962 depth=3 acc=0.811
trial 2: lr=0.0088 depth=2 acc=0.632
trial 3: lr=0.0714 depth=2 acc=0.784
trial 4: lr=0.0480 depth=2 acc=0.763
trial 5: lr=0.0036 depth=3 acc=0.747
trial 6: lr=0.0092 depth=2 acc=0.632
trial 7: lr=0.0419 depth=5 acc=0.829
```

Trials 2 and 6 used a tiny learning rate and were clearly losing after the fact. A cloud sweep can notice that mid-training and stop them.

## The four parts of a sweep job

1. **Search space.** For each hyperparameter, the values it may take. `Choice(values=[...])` picks from a list; distributions such as `Uniform(min_value, max_value)` and `LogUniform` cover continuous ranges.
2. **Sampling algorithm.** How combinations are drawn (below).
3. **Objective.** `primary_metric` names the metric to optimize and `goal` is `maximize` or `minimize`. The name must exactly match a metric your script logs with `mlflow.log_metric`.
4. **Limits.** `max_total_trials`, `max_concurrent_trials`, and timeouts. Concurrency is capped by what your cluster can actually run at once.

## The SDK v2 shape (illustrative, not run here)

```python
from azure.ai.ml.sweep import Choice, Uniform, MedianStoppingPolicy

# base_job is your existing command(...) job
job_for_sweep = base_job(
    learning_rate=Uniform(min_value=0.01, max_value=0.9),
    boosting=Choice(values=["gbdt", "dart"]),
)

sweep_job = job_for_sweep.sweep(
    compute="cpu-cluster",
    sampling_algorithm="random",
    primary_metric="accuracy",
    goal="maximize",
)
sweep_job.set_limits(max_total_trials=20, max_concurrent_trials=4)
sweep_job.early_termination = MedianStoppingPolicy(
    delay_evaluation=5, evaluation_interval=1)

returned = ml_client.create_or_update(sweep_job)
```

## Choosing a sampling method

- **Random**: supports discrete and continuous values and early termination. The usual first pass.
- **Grid**: exhaustive, but only for `Choice` values. Use it when the space is small enough to afford.
- **Bayesian**: picks each new trial using results so far. Fewer concurrent trials means more benefit from earlier results, and the docs suggest a budget of at least 20 times the number of hyperparameters.

## Early termination

Policies run every `evaluation_interval` metric reports, after an optional `delay_evaluation`. **Bandit** ends trials that fall outside a slack of the best; **median stopping** ends those worse than the median of running averages; **truncation selection** drops the lowest-performing percentage. Microsoft describes median stopping with interval 1 and delay 5 as a conservative starting point.

## Reading the results

The studio draws a metrics chart (one line per child run) and a parallel coordinates chart linking hyperparameter values to the final metric. Use them to narrow the search space for a second, tighter sweep.

## One trap: every trial starts from zero

Each trial re-runs your whole training script, including data loading. Do expensive preparation once, upstream, so trials only train. Doing that reusably is the job of pipelines, next lesson.

## Recap

A sweep job = search space + sampling + objective + limits, optionally with early termination. Start random, keep the metric name exact, cap concurrency to your cluster, and read the charts to refine.
