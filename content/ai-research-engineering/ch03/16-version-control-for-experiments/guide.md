# Version Control for Experiments

This chapter closes with the piece that ties everything else in it together: git. A clean repo layout, a disciplined config system, and fast reviews are all in service of one property — the ability to point at any reported result and say exactly what code and what config produced it. That traceability lives in how a research team uses version control day to day, not as an afterthought bolted on at publication time.

## What you'll learn

- Branch-per-experiment vs. trunk-based development with config flags, and when each fits a research team
- How to tag or log a commit hash so a specific W&B/MLflow run is traceable back to exact code
- The git commands that make a run's provenance recoverable later
- Why "which commit produced this number" has to be answerable without asking the person who ran it

## Branch-per-experiment vs. trunk-based with config flags

Two workflows dominate research teams, and both are legitimate:

**Branch-per-experiment** creates a new branch for each experimental direction:

```bash
git checkout -b experiment/sparse-attention
# ...edit code, run training...
git add -A && git commit -m "Add sparse attention variant"
git push -u origin experiment/sparse-attention
```

This isolates risky or exploratory code changes from everyone else's work, and is a natural fit when an experiment requires actually changing the model or training loop, not just a hyperparameter.

**Trunk-based with config flags** keeps almost everyone on `main`, and expresses most experiment variation through Hydra config overrides rather than branches:

```bash
# No new branch -- the variant lives entirely in the config override
python train.py model=sparse_attention sparsity=0.5 seed=0
```

This fits teams whose experiments differ mostly in hyperparameters and config choices (which Lesson 12's Hydra setup handles directly) rather than in code structure, and it avoids the overhead of managing dozens of long-lived branches. Most mature research teams end up using both: trunk-based for config-only variation, short-lived branches for anything that touches shared code.

## Tying every run to an exact commit

The property that actually matters is: **given a result, can you recover the exact code that produced it?** The mechanism is simple but has to be applied consistently — log the commit hash as a field alongside every experiment-tracking run:

```python
import subprocess
import wandb

commit_hash = subprocess.check_output(
    ["git", "rev-parse", "HEAD"]
).decode().strip()

wandb.init(project="sparse-attention", config={"git_commit": commit_hash, **cfg})
```

Now every run logged to Weights & Biases (or MLflow, which supports the same pattern via `mlflow.log_param("git_commit", commit_hash)`) carries the exact commit it ran from as a queryable field. Combined with Hydra's per-run config snapshot from Lesson 12, this answers both halves of "what produced this number": the code (commit hash) and the configuration (resolved config file) — together, not one without the other.

## Guarding against the uncommitted-changes trap

Logging a commit hash is worthless if the working tree had uncommitted changes when the run launched — the hash points at code that wasn't actually what ran. A simple guard:

```bash
if [[ -n "$(git status --porcelain)" ]]; then
  echo "Uncommitted changes present -- commit or stash before launching." >&2
  exit 1
fi
```

Some teams go further and have the launch script fail fast, refusing to start a run at all with a dirty working tree. Others allow it but log a `git diff` of the uncommitted changes alongside the run, so the exact state is still recoverable even without a commit. Either is fine; silently ignoring the problem is not.

## Useful commands for provenance

```bash
git log --oneline -5              # recent history, compact
git rev-parse HEAD                # current commit hash, full
git rev-parse --short HEAD        # current commit hash, short form
git tag run-214-sparse-0.5        # tag a commit for a specific named run
git show <commit>:configs/config.yaml  # view a config file as it was at that commit
```

Tagging specific commits that correspond to headline results (`git tag paper-table2-row3`) is a lightweight habit that pays off enormously the first time someone — often a reviewer, sometimes a future version of yourself — asks "can you show me the exact code behind this number" months later.

## Key terms

- **Branch-per-experiment** — creating a dedicated git branch for an experimental direction that changes code structure, not just config
- **Trunk-based development** — keeping most work on `main`, expressing experiment variation through config overrides instead of branches
- **Commit hash logging** — recording the exact git commit (`git rev-parse HEAD`) as a field in every experiment-tracking run, tying results to code
- **Dirty working tree** — a repo state with uncommitted changes, which invalidates commit-hash provenance unless explicitly guarded against or logged separately
