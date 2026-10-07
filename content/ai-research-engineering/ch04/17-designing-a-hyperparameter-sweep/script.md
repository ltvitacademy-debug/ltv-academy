# Script — Designing a Hyperparameter Sweep

## Segment 1 (title)

A sweep turns trying a few settings by hand into a systematic search over a defined space with a defined budget. Designing one well happens before you launch a single run — deciding what varies, how it varies, and when to stop costs nothing in compute but saves enormous amounts of it.

## Segment 2 (code)

The search space is a config file, not a mental note. In Weights and Biases, it's YAML with a method, a metric to optimize, and a parameters block, where each parameter declares its own distribution — log-uniform for learning rate and weight decay, since their effect is roughly multiplicative, uniform for dropout, whose sensible range is narrow and linear.

## Segment 3 (steps)

Not every hyperparameter deserves a slot in the search space. Architecture choices with strong prior evidence get fixed at a sensible default rather than swept. Reserve sweep slots for parameters with real uncertainty — learning rate, weight decay, dropout. And watch dimensionality: even Bayesian optimization's sample efficiency degrades past roughly ten to fifteen dimensions, so four well-chosen parameters beat twelve where half barely move the metric.

## Segment 4 (code)

Decide the trial budget before launching, driven by available compute, and pair it with an early-termination policy like Hyperband, which kills clearly underperforming runs partway through training. wandb sweep registers the search space and returns a sweep ID; wandb agent is the worker that actually pulls configurations and runs training — launch as many agents as you have workers.

## Segment 5 (outro)

That's how to design the search space itself. Next up: random, grid, and Bayesian search — the three strategies a sweep's method field can choose between, and when each one actually wins.
