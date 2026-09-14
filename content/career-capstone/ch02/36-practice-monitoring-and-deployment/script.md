# Script — Practice Questions: Monitoring and Deployment

## Segment 1 (title)

Domain 3 splits into two families of tooling — monitoring answers "what happened," deployment answers "how did it get there" — and DP-700 loves to put one family's name in an option where the other is the correct answer.

## Segment 2 (code: two families)

The Monitoring Hub, observability, and alerts all answer "what happened, and does someone need to know." Deployment pipelines, Git integration, and blue-green rollouts all answer "how does a change get promoted safely." Neither family answers the other family's question.

## Segment 3 (steps: sort first)

Monitoring Hub shows what ran and whether it succeeded. Alerts push a notification the moment something fails. Deployment pipelines promote an item from Dev to Test to Prod — a completely different job.

## Segment 4 (code: worked scenario)

A team wants Fabric notebook changes tested before Production, with a paper trail of who approved what. The Monitoring Hub shows run history, not code changes — wrong family. Git integration plus deployment pipelines gives both the version trail and the promotion gate.

## Segment 5 (outro)

Sort every monitoring-or-deployment scenario into its family before reading the options. Next up: the honest list of traps and gotchas that show up across every domain, not just this one.
