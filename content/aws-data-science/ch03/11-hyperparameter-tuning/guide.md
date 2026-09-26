# Hyperparameter Tuning

You already know that hyperparameters, such as the number of trees or a tree's maximum depth, are settings you choose before training rather than values the model learns. Finding good ones means training many candidates and comparing them. SageMaker calls its version **automatic model tuning**: you describe a search, and SageMaker launches one training job per candidate, tracks a metric from each, and reports the best.

> Cloud code in this lesson is illustrative and was not run here (no AWS account). It follows the AWS developer guide, API reference and SageMaker Python SDK source as of this writing; class locations changed between SDK versions 2 and 3, so check the current docs. The local search below was run for real.

## What you'll learn

- The five things a tuning job needs: ranges, objective metric, strategy, budget, and (optionally) early stopping
- How a log line becomes a metric through a regular expression
- How Random, Bayesian, Grid and Hyperband strategies differ
- What the SDK call looks like, and how to read the results
- Why tuning multiplies your bill, and how to cap it

## The idea, run locally first

A tuning job is a loop around the training job from lesson 9. This local version calls the very same `train.py`, passes each candidate as command-line arguments, and pulls the metric out of the log with the same regular expression you would give SageMaker. The data is the illustrative synthetic churn table from earlier lessons.

```python
METRIC = re.compile(r"validation:accuracy=([0-9\.]+);")
random.seed(7)
results = []
for i in range(8):
    hp = {"n-estimators": random.randint(20, 300),
          "max-depth": random.randint(2, 10)}
    cmd = [sys.executable, "train.py"]
    for k, v in hp.items():
        cmd += [f"--{k}", str(v)]
    out = subprocess.run(cmd, capture_output=True, text=True,
                         env=dict(os.environ, ...)).stdout
    acc = float(METRIC.search(out).group(1))
    results.append((acc, hp))
best = max(results, key=lambda r: r[0])
```

Output from the run:

```
job 0: {'n-estimators': 185, 'max-depth': 4} -> 0.65
job 1: {'n-estimators': 222, 'max-depth': 2} -> 0.634
job 2: {'n-estimators': 57, 'max-depth': 10} -> 0.616
job 3: {'n-estimators': 68, 'max-depth': 7} -> 0.626
job 4: {'n-estimators': 49, 'max-depth': 10} -> 0.608
job 5: {'n-estimators': 129, 'max-depth': 2} -> 0.628
job 6: {'n-estimators': 64, 'max-depth': 8} -> 0.618
job 7: {'n-estimators': 234, 'max-depth': 3} -> 0.672
best: (0.672, {'n-estimators': 234, 'max-depth': 3})
```

On this noisy data, deep trees overfit, and shallow forests with many trees came out on top. That pattern is exactly what a search is for. The absolute accuracy is low because the data is deliberately noisy.

## The five parts of a tuning job

1. **Hyperparameter ranges.** Each tunable setting gets a range: `IntegerParameter`, `ContinuousParameter` (both take `min_value`, `max_value` and a `scaling_type`), or `CategoricalParameter` (a list of values). The scaling type is `Auto`, `Linear`, `Logarithmic` or `ReverseLogarithmic`; use logarithmic for values that span orders of magnitude, such as a learning rate.
2. **Objective metric.** The name of one metric and whether to maximize or minimize it. For built-in algorithms SageMaker knows the metric names. For your own script, you supply `metric_definitions`, each a `Name` and a `Regex` that extracts the number from the training log.
3. **Strategy.** How candidates are chosen (below).
4. **Budget.** A maximum number of training jobs, a maximum number running in parallel, and optionally a maximum runtime.
5. **Early stopping.** `Off` or `Auto`; with `Auto`, SageMaker may stop training jobs unlikely to improve the objective, which is not guaranteed.

## Choosing a strategy

The AWS guide describes four:

- **Random search** picks values in your ranges independent of earlier results, so running the maximum number of jobs in parallel costs it nothing in search quality.
- **Bayesian optimization** treats tuning as a regression problem: it uses everything learned so far to choose the next candidate, sometimes close to the best so far, sometimes far away to explore. It is the SDK default. Because its choices depend on earlier results, very high parallelism gives it less to learn from.
- **Grid search** tries every combination of categorical values, and only supports categorical parameters. You do not set a maximum job count; it equals the number of combinations.
- **Hyperband** is for iterative algorithms that report a metric after each epoch, such as neural networks. It reallocates resources to promising configurations and stops the rest, using its own internal early stopping (so the separate early stopping type must be `Off`).

The guide also warns that tuning is stochastic and may not converge on the best answer, and may not improve your model at all.

## Launching a tuning job (illustrative, not run here)

In SDK version 3 the `HyperparameterTuner` wraps the `ModelTrainer` from lesson 9. The constructor arguments below come from the SDK source:

```python
from sagemaker.train.tuner import HyperparameterTuner
from sagemaker.core.parameter import IntegerParameter

tuner = HyperparameterTuner(
    model_trainer=trainer,
    objective_metric_name="validation:accuracy",
    hyperparameter_ranges={
        "n-estimators": IntegerParameter(20, 300),
        "max-depth": IntegerParameter(2, 10),
    },
    metric_definitions=[{
        "Name": "validation:accuracy",
        "Regex": "validation:accuracy=([0-9\\.]+);"}],
    strategy="Bayesian",
    objective_type="Maximize",
    max_jobs=20,
    max_parallel_jobs=2,
    early_stopping_type="Off",
)
tuner.tune(inputs=[train_channel, validation_channel])
```

Version 2 offered the same idea as `HyperparameterTuner(estimator=..., ...)` with `fit`. Underneath both is the `CreateHyperParameterTuningJob` API, whose config holds the objective, `ParameterRanges`, `ResourceLimits` (`MaxNumberOfTrainingJobs`, `MaxParallelTrainingJobs`) and the `Strategy`.

## Reading the results

```python
name = tuner.best_training_job()
df = tuner.analytics().dataframe()
df.sort_values("FinalObjectiveValue", ascending=False).head()
```

`analytics().dataframe()` gives one row per training job with the hyperparameters and the final objective value, so you can plot how the metric responds to each setting and narrow the ranges for a second, tighter search. The API reference also notes that tuning creates SageMaker experiments, trials and trial components for each job, which is the subject of the next lesson.

## Cost discipline

Every candidate is a full training job, so total cost is roughly jobs times duration times instance price. Start small (a handful of jobs), set `max_jobs` and `max_runtime_in_seconds`, prefer log scaling for wide ranges, and use managed spot training if your script checkpoints.

## Recap

A tuning job is a managed loop over training jobs: ranges, one objective metric extracted by regex, a strategy, and a budget. Random is simple, Bayesian is the default, Grid needs categorical values, Hyperband suits iterative algorithms. Read the results table, tighten the ranges, and keep the budget honest.
