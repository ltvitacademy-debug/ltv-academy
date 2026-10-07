# Script — Version Control for Experiments

## Segment 1 (title)

This chapter closes with the piece that ties everything else together: git. A clean layout, a disciplined config system, and fast review all serve one property — being able to point at any result and say exactly what code and config produced it. That traceability lives in daily git habits, not something bolted on later.

## Segment 2 (steps)

Two workflows dominate research teams, and both are legitimate. Branch-per-experiment isolates a new direction on its own branch, which fits changes to the model architecture or training loop itself. Trunk-based development keeps most work on main and expresses variation through Hydra config overrides instead. Most mature teams end up using both — trunk-based for config-only changes, short-lived branches for anything touching shared code.

## Segment 3 (code)

The mechanism that actually matters is logging the exact commit hash alongside every experiment-tracking run. A few lines around git rev-parse HEAD, logged into Weights and Biases or MLflow as a config field, means every run carries the exact commit it ran from. Combined with Hydra's resolved config snapshot, that answers both halves of what produced a number: the code and the configuration.

## Segment 4 (code)

That commit hash is worthless if the working tree had uncommitted changes when the run launched — the hash points at code that isn't what actually ran. A simple launch-script guard checks git status before starting. And tagging commits behind headline results, like paper-table2-row3, pays off the first time someone asks to see the exact code behind a number months later.

## Segment 5 (outro)

That closes Chapter 3 — structure, config, trade-offs, tests, review, and now version control, all pointed at the same goal: every result traceable back to exact code. Up next, Chapter 4: experiment management at scale, starting with designing a hyperparameter sweep.
