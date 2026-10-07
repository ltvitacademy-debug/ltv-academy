# Script — Reproducibility Across the Full ML Lifecycle

## Segment 1 (title)

Versioning the data and versioning the model each solve one link in a chain, but neither alone answers the question that actually matters during an incident: given this exact deployed model, can you reproduce the exact training run that created it. That requires data, code, environment, and parameters captured together, not separately.

## Segment 2 (steps)

A training run is only reproducible if all four of these are pinned to a specific version at the same time. Which exact data version, which exact Git commit, which exact library versions and container digest, and which hyperparameters and random seeds. Miss any one of the four and a pinned commit with an unpinned requirements file can quietly produce a different model six months later.

## Segment 3 (code)

DVC's lockfile records the exact hash of every dependency and output for every stage at the moment it ran, and because it's a plain file, it gets committed to Git right alongside the code. Checking out a commit now gets you the code and a lockfile pointing at the exact data version it ran against, together.

## Segment 4 (code)

MLflow's tracking API captures several of these links under one run so they're never recorded separately. The run ID becomes the single identifier that tells you the parameters, the git commit, and the data version together, without hunting across three different systems.

## Segment 5 (steps)

Teams in regulated settings often go one step further and generate an explicit manifest. It names the model version and the git commit that produced it, the data version and environment digest it ran against, and the hyperparameters used — so the question "can we rebuild this" has one file to check instead of a chain to reconstruct by hand.

## Segment 6 (outro)

Pin data, code, environment, and parameters together, and give that chain one retrievable identifier. Next, lesson twenty-nine: where all of these artifacts, data, models, containers, actually get stored, and for how long.
