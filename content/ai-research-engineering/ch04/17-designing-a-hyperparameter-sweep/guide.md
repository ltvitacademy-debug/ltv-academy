# Designing a Hyperparameter Sweep

A sweep turns "try a few settings by hand and see what sticks" into a systematic search over a defined space, with a defined budget, that someone other than the person who ran it can reproduce. Designing one well happens before you launch a single run: deciding what varies, how it varies, and when to stop costs nothing in compute but saves enormous amounts of it.

## What you'll learn

- How to translate a training config into a sweep search space
- Which hyperparameters are worth sweeping and which should stay fixed
- Log-scale vs. linear-scale parameterization, and why the choice matters
- Setting a compute budget and an early-termination policy before launching

## Defining the search space

A sweep search space is a config file, not a mental note. In Weights & Biases, it's YAML with a method, a metric to optimize, and a `parameters` block:

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
  batch_size:
    values: [16, 32, 64, 128]
  dropout:
    distribution: uniform
    min: 0.0
    max: 0.5
  weight_decay:
    distribution: log_uniform_values
    min: 0.000001
    max: 0.01
early_terminate:
  type: hyperband
  min_iter: 3
```

Every parameter here has an explicit distribution — `log_uniform_values` for quantities that span orders of magnitude, `values` for a discrete set, `uniform` for a quantity whose sensible range is narrow and linear. This file is the entire specification of what the sweep will explore; it belongs in version control next to the training code, same as any other config from Lesson 12.

## Choosing what to sweep vs. what to fix

Not every hyperparameter deserves a slot in the search space. Architecture choices with strong prior evidence (number of layers, attention head count, whether to use a particular normalization) are usually fixed at a sensible default from the literature rather than swept — sweeping them multiplies the search space without much expected benefit. Reserve sweep slots for hyperparameters where the paper or your own intuition gives you real uncertainty: learning rate, weight decay, and dropout are reliable candidates because models are genuinely sensitive to them and the right value is rarely obvious in advance.

This matters because the cost of a sweep grows fast with dimensionality. A grid over 4 values each across 5 hyperparameters is 1,024 combinations; random and Bayesian search handle high dimensions better than grid search, but even Bayesian optimization's sample efficiency degrades past roughly 10-15 dimensions — there just isn't enough signal per additional trial to localize the optimum. A sweep with 4 well-chosen parameters that each matter is worth more than one with 12 where half barely move the metric.

## Log scale vs. linear scale

Learning rate and weight decay are swept on a log scale because their effect on training is roughly multiplicative, not additive — the difference between 1e-5 and 1e-4 matters as much as the difference between 1e-3 and 1e-2. A linear-uniform sample over `[1e-5, 1e-2]` would waste the overwhelming majority of its samples above 1e-3, where the dynamics are already understood to be unstable for most architectures. Dropout, by contrast, lives in `[0, 0.5]` where the relationship to validation performance is closer to linear, so a plain `uniform` distribution samples that range sensibly.

## Setting a budget and an early-termination policy

Decide the trial budget before launching, driven by available compute rather than curiosity: a Bayesian sweep with a budget of 40 runs on 4 GPUs is a very different commitment than a grid sweep with 1,024 combinations on the same hardware. Pair the budget with an early-termination policy like Hyperband or ASHA, which kills clearly underperforming runs partway through training rather than letting them run to completion — this reallocates compute toward configurations that are actually promising, often doubling the effective number of configurations explored for the same total GPU-hours.

```bash
wandb sweep sweep.yaml --project my-project
wandb agent my-entity/my-project/<sweep-id>
```

`wandb sweep` registers the search space and returns a sweep ID; `wandb agent` is what actually pulls configurations and runs training — launch as many agents as you have available workers, and they pull from the same shared sweep.

## Key terms

- **Search space** — the YAML specification of which hyperparameters vary in a sweep, their ranges, and their distributions
- **Log-uniform distribution** — a sampling distribution appropriate for hyperparameters whose effect is roughly multiplicative (learning rate, weight decay)
- **Early termination (Hyperband/ASHA)** — a policy that kills underperforming runs partway through training to free compute for more promising configurations
- **Sweep agent** — the worker process (`wandb agent`) that pulls a configuration from the sweep and executes a training run
