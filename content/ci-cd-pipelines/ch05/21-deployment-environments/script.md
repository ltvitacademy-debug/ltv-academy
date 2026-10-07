# Script — Deployment Environments

## Segment 1 (title)

Chapter four ended with a pinned image sitting in a registry. Chapter five is about getting that exact artifact running somewhere real, safely. Northbridge Retail doesn't deploy storefront-api straight to production — it moves through a sequence of environments, each one more trusted, and more cautious, than the last.

## Segment 2 (steps)

Dev is where every merge to main lands automatically, and it's disposable — Northbridge Retail's engineers expect it to break occasionally, and that's fine, because nothing real depends on it. Staging mirrors production's configuration against realistic, but not real customer, data, one more exercise before anyone trusts a release with real traffic. Production is where actual customers place actual orders, and everything upstream exists to prove what lands here is safe.

## Segment 3 (code)

The needs chain enforces the order directly inside the workflow file itself: deploy-staging needs deploy-dev, and deploy-production needs deploy-staging in turn. There's no path that skips a step — production can only be reached by passing cleanly through staging first, every single time.

## Segment 4 (screenshot)

The same idea exists outside of GitHub Actions too. Azure DevOps gives environments their own place in the navigation, under Pipelines, Environments — a deployment target that exists separately from any one pipeline definition.

## Segment 5 (screenshot)

Each environment tracks every run that's ever targeted it, independent of which pipeline triggered it, along with which resources — a namespace, a VM group — it's actually connected to, and the approval rules gating it — that's next.

## Segment 6 (outro)

Naming an environment is the easy part, and takes almost no real configuration at all. What actually matters is the rules attached to that name — who, if anyone, has to approve a deployment before it's allowed to proceed any further. That's Lesson 22.
