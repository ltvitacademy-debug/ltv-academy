# Script — Securing CI/CD Pipelines

## Segment 1 (title)

Every scan in Chapter 4 runs inside a pipeline — which makes the pipeline itself a target worth protecting, since it has standing access to deploy, pull secrets, and push images.

## Segment 2 (steps)

A compromised pipeline can do everything a legitimate deploy can: push a malicious image, exfiltrate secrets, deploy straight to production. Securing it means applying earlier chapters directly to the pipeline's own config — least-privilege workload identity instead of a long-lived token, secrets pulled at runtime instead of stored as variables, and third-party actions pinned to a commit SHA, not a mutable tag.

## Segment 3 (screenshot)

GitHub Actions environments carry their own protection rules, configured right here under Settings — the most direct being required reviewers, which pause a deploy until a named person approves it.

## Segment 4 (screenshot)

Sometimes a deploy genuinely needs to skip the wait — an urgent hotfix. GitHub Actions supports that, but makes the bypass itself a visible, logged action, "Start all waiting jobs," not a silent workaround. A control that can only be bypassed visibly, with a record left behind, still counts as a control.

## Segment 5 (outro)

Required reviewers enforce a human checkpoint, workload identity limits the blast radius if something still goes wrong, and Chapter 4's scans gate what's even allowed to reach this point — none of these alone is "pipeline security." Next up, Lesson 23: runtime security.
