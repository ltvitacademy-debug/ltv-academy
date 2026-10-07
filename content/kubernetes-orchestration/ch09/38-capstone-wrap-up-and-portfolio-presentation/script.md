# Script — Capstone: Wrap-Up & Portfolio Presentation

## Segment 1 (title)

You've built a working, autoscaled, rollback-capable Kubernetes deployment of Northbridge's app. This final lesson is about making sure that work actually counts toward getting hired — repository structure, documentation, and how to talk through it in an interview.

## Segment 2 (steps)

A reviewer skims, not reads line by line. README.md leads with what the project is, the architecture, and the exact commands to run it, plus what was deliberately left out of scope. RUNBOOK.md is separate and operational: how to diagnose a CrashLoopBackOff on checkout, confirm the HPA is actually scaling, and roll back a bad release.

## Segment 3 (steps)

Interviewers care about decisions more than the fact that YAML exists. Practice a thirty-second answer: what you built — Helm charts with per-environment values and an HPA on checkout specifically — and why: its traffic is spiky, Helm gives an atomic rollback hand-applied YAML never had, and the Argo CD manifest means it's ready for GitOps.

## Segment 4 (steps)

Expect follow-ups. Why Helm over raw manifests — one parameterized chart instead of near-duplicate YAML per environment. What would you add if this ran for real — a live GitOps controller actually watching the repo, and a PodDisruptionBudget so a node drain doesn't take out every checkout replica at once. Naming what's next, and why it was reasonable to scope out, reads as more senior than pretending it's perfect.

## Segment 5 (outro)

That closes the course — from why Kubernetes exists at all, through Deployments, Services, Helm, troubleshooting, and GitOps, to a real, documented, interview-ready project built on all of it.
