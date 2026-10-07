# Script — Experiment Tracking Infrastructure

## Segment 1 (title)

A single run logged to Weights and Biases or MLflow is easy. The hard part is hundreds of runs a week across sweeps and projects and people — the backend has to stay queryable, storage has to stay affordable, and the team has to agree on what the metrics even mean across experiments.

## Segment 2 (code)

A tracking backend's job is reconstructing a run's full story, not just its final score. That means the resolved config, the git commit hash, and per-step metrics logged frequently enough to see the training curve — a final loss number alone tells you almost nothing about whether training was actually stable.

## Segment 3 (steps)

Both W&B and MLflow offer a managed, hosted option and a self-hosted one. Managed costs per seat or per gigabyte but removes an entire category of operational burden. Self-hosting is cheaper at scale and keeps data in-house, which some labs require — but someone on the team now owns keeping that database and artifact store alive. The burden doesn't disappear, it moves.

## Segment 4 (code)

Checkpoints and datasets are too large to log as metrics and need their own artifact store, typically backed by S3 or GCS, versioned separately from the lightweight metric time series. Treating them as artifacts rather than attaching them to every log call keeps the metrics database fast to query.

## Segment 5 (outro)

That's what a tracking backend needs to store and how to keep it affordable and queryable as a team scales up. Next: compute scheduling across a team — tracking tells you what ran, scheduling decides what gets to run in the first place.
