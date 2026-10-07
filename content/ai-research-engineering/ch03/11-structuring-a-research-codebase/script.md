# Script — Structuring a Research Codebase

## Segment 1 (title)

Welcome to Chapter 3, Research Codebases. We've covered the role and how to read papers — now it's the code itself. A well-run research codebase has to survive hundreds of experiments without anyone losing track of what produced which result, and the good ones all converge on a similar layout.

## Segment 2 (steps)

The whole layout comes down to one rule: anything another file imports from lives in src, and anything you just run lives in scripts. Notebooks are for exploration only, and never load-bearing — the moment notebook code gets used twice, it graduates into src as a real, tested module. That one rule prevents the classic failure: a critical function buried in a notebook cell that nobody can find six months later when the result needs reproducing.

## Segment 3 (code)

A typical repo has configs for Hydra YAML files, a small data folder for fixtures only, an experiments folder for run outputs like logs and checkpoints, and src slash project holding models, data loaders, and the training loop as an installable package. Scripts and notebooks both import from src rather than duplicating logic.

## Segment 4 (code)

The README is the actual deliverable, not just documentation. It should list copy-pasteable commands that reproduce the headline result and the full sweep from a fresh clone — things like python train.py model=resnet seed=0. If those commands don't regenerate the reported number, the repo isn't reproducible yet, no matter how clean the code looks.

## Segment 5 (outro)

Keep that one rule in mind — imported code in src, run-once code in scripts, exploration in notebooks. Up next, lesson twelve: config systems for experiments, where that configs folder actually comes to life.
