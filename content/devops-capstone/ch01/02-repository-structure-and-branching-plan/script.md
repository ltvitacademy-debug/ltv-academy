# Script — Repository Structure & Branching Plan

## Segment 1 (title)

Before you write a Dockerfile or a Terraform resource, you need to know where things live and how a change is allowed to move through the repository. This lesson covers the monorepo layout, the branching plan, and how environments map onto branches and tags.

## Segment 2 (code)

Northbridge Retail keeps both services, infrastructure, and pipelines in one GitHub repo called storefront, rather than splitting them across separate repositories. Services live under services slash product dash catalog and services slash checkout, each with its own Dockerfile. Terraform lives in infra slash terraform, Helm charts in charts, and the CI/CD pipeline definitions in dot github slash workflows. Keeping all of that together means a change to checkout and its matching Helm chart update land in the exact same pull request.

## Segment 3 (steps)

The team uses trunk-based development — main is always deployable, with no long-lived branches drifting out of sync for days or weeks. Every change starts as a feature branch named feature slash ticket dash short description, so you can trace any branch straight back to the work item behind it. That branch becomes a pull request requiring one reviewer and passing CI, and once both are satisfied it merges to main as a single squash-merged commit, collapsing every "fix typo" and "wip" commit into one clean entry in the history.

## Segment 4 (steps)

That branching plan connects directly to deployment. Every merge to main automatically deploys to the dev namespace, because trunk-based development and required CI make that assumed-safe — the team ships to dev dozens of times a day without a second thought. A maintainer cutting a semver tag like v1.4.0 automatically promotes that exact build to staging. Only after that succeeds does production get touched, and only behind a manual approval gate — a deliberate, versioned decision rather than an automatic one.

## Segment 5 (outro)

Memorize that mapping — merge means dev, tag means staging, approval means prod — because every pipeline you build in later phases assumes it. Next up, lesson three: defining what "done" actually means for this capstone.
