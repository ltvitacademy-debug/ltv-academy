# Random, Grid & Bayesian Search

A sweep's `method` field picks one of three search strategies, and the choice matters as much as the search space itself. Grid, random, and Bayesian search make very different tradeoffs between coverage, sample efficiency, and parallelism — picking the wrong one for a given budget wastes compute before a single result comes back useful.

## What you'll learn

- How grid, random, and Bayesian search actually explore a space differently
- Why random search usually beats grid search at an equal budget
- How Bayesian search trades parallelism for sample efficiency
- A practical rule of thumb for picking between the three given budget and team size

## Grid search

Grid search enumerates every combination of the discrete values provided for each parameter:

```yaml
method: grid
parameters:
  learning_rate:
    values: [0.0001, 0.001, 0.01]
  dropout:
    values: [0.1, 0.3, 0.5]
```

This config runs all 3 x 3 = 9 combinations, guaranteed. Grid search is exhaustive and easy to reason about, but it scales catastrophically with dimensionality — adding a third 3-valued parameter makes it 27 runs, a fourth makes it 81. It also wastes budget: if a parameter barely affects the result, grid search still runs every value of it combined with every value of everything else.

## Random search

Random search samples each parameter independently from its distribution, for a fixed number of trials set by the user:

```yaml
method: random
parameters:
  learning_rate:
    distribution: log_uniform_values
    min: 0.00001
    max: 0.01
  dropout:
    distribution: uniform
    min: 0.0
    max: 0.5
```

The well-known result from Bergstra and Bengio (2012) is that for a fixed budget, random search outperforms grid search whenever only a few hyperparameters actually matter — which is the common case. Grid search wastes trials on fine-grained coverage of unimportant dimensions; random search's coverage of each individual dimension stays good regardless of how many other dimensions are in the space, because every trial samples every parameter independently.

## Bayesian search

Bayesian search builds a probabilistic model (commonly a Gaussian process) of how the metric depends on the hyperparameters, and uses it to choose the next configuration that's expected to be most informative — balancing exploring unknown regions against exploiting regions that already look promising:

```yaml
method: bayes
metric:
  name: val_loss
  goal: minimize
parameters:
  learning_rate:
    distribution: log_uniform_values
    min: 0.00001
    max: 0.01
```

This makes Bayesian search dramatically more sample-efficient than random search when trials are expensive — it often finds a near-optimal configuration in a fraction of the trials. The cost is that it's inherently sequential: each new suggestion depends on the results of prior trials, so it parallelizes worse than random or grid search, where every trial is independent and can run simultaneously on as many workers as are available.

## Choosing between them

A practical rule of thumb: use grid search only when the space is genuinely small (2-3 parameters, few values each) and you want exhaustive coverage for a report or paper table. Use random search when you have many parallel workers and want to explore broadly and cheaply. Use Bayesian search when individual training runs are expensive (hours or days) and you have limited parallelism — the sample efficiency more than makes up for the sequential bottleneck.

## Key terms

- **Grid search** — exhaustive enumeration of every combination of discrete parameter values
- **Random search** — independent random sampling of each parameter for a fixed number of trials
- **Bayesian search** — a probabilistic model of the metric surface used to choose the next most-informative configuration
- **Sample efficiency** — how much a search method improves per trial, most important when individual trials are expensive
