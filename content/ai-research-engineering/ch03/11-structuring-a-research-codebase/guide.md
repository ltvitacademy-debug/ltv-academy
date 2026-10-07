# Structuring a Research Codebase

Welcome to Chapter 3, Research Codebases. The first two chapters covered the research engineer role and how to read and reproduce papers. Now we get into the code itself: how a well-run research codebase is laid out so that a team can run hundreds of experiments without losing track of what produced which result. There's no single "correct" layout, but the good ones converge on the same handful of ideas.

## What you'll learn

- The directory layout most research codebases converge on, and why each piece is separated the way it is
- Why library code (`src/`) and one-off scripts (`scripts/`) live in different places, not mixed together
- Why notebooks are kept out of the core codebase entirely
- What belongs in the README so anyone on the team can reproduce a result from a commit alone

## The layout research teams converge on

Almost every healthy research repo ends up with some version of this shape:

```
my-project/
├── configs/              # Hydra/YAML configs, one file per experiment or component
│   ├── model/
│   ├── data/
│   └── config.yaml
├── data/                 # small fixtures only — real datasets live elsewhere
├── experiments/          # output dir for run artifacts: logs, checkpoints, metrics
├── src/
│   └── my_project/
│       ├── __init__.py
│       ├── models/
│       ├── data/
│       └── train.py
├── scripts/              # one-off, throwaway, "run this once" scripts
├── notebooks/            # exploratory analysis only, never imported by src/
├── tests/
├── README.md
└── pyproject.toml
```

The organizing principle is: **anything another file imports from lives in `src/`; anything you just run lives in `scripts/`.** That one rule prevents the single most common failure mode in research repos — a critical data-loading function that only exists buried inside a notebook cell, which nobody can find six months later when the result needs to be reproduced.

## Library code vs. scripts vs. notebooks

- **`src/<project>/`** is importable, tested, and versioned like real software. It holds the model definitions, data loaders, training loop, and evaluation code — the pieces that get reused across many experiments. Put an `__init__.py` in it and install it in editable mode (`pip install -e .`) so `import my_project` works from anywhere in the repo, including notebooks and scripts.
- **`scripts/`** holds things you run once or occasionally: a one-off data-cleaning pass, a script that converts a checkpoint format, a plotting script for a specific figure. Scripts should `import my_project` and call into `src/` rather than duplicating logic.
- **`notebooks/`** is for exploration only — poking at a dataset, sanity-checking a tensor shape, prototyping an idea before it's worth writing a real function. The moment code in a notebook is useful more than once, it graduates into `src/`. Notebooks are famously bad at reproducibility (hidden execution order, stale cell state), so nothing load-bearing should live only in one.

## Why `experiments/` is separate from `data/`

`data/` should only ever hold small fixtures used by tests, or scripts that fetch/prepare data — never the actual multi-gigabyte training set, which belongs on shared storage or is pulled by a data-versioning tool (covered in Chapter 5). `experiments/` is where *your own runs* write their outputs: logs, checkpoints, config snapshots, metrics. Separating the two means you can safely `.gitignore` both for different reasons — `data/` because it's huge, `experiments/` because it's generated and different on every run.

## The README is the actual deliverable

A research repo's README should let a stranger reproduce your headline result with copy-pasted commands, not prose. At minimum:

```markdown
## Setup
pip install -e .

## Reproduce the main result (Table 2, row 3)
python src/my_project/train.py model=resnet data=cifar10 seed=0

## Run the full sweep used in the paper
python src/my_project/train.py -m model=resnet,vit seed=0,1,2
```

If a reviewer, collaborator, or your future self can't get from a fresh clone to the reported number using only what's in the README, the repo isn't actually reproducible yet — regardless of how clean the code looks.

## Key terms

- **`src/` layout** — library code kept in a dedicated, importable package directory, separate from scripts and notebooks
- **Config directory** — a dedicated `configs/` tree holding the YAML files that parameterize experiments (full treatment in Lesson 12)
- **Editable install** (`pip install -e .`) — installs the local package so `import my_project` works everywhere without reinstalling after every change
- **Reproducibility by README** — the standard that the README's commands alone, run against a given commit, must regenerate the reported result
