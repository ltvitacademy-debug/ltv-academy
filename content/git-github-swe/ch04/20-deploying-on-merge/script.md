# Script — Deploying on Merge

## Segment 1 (title)

Last lesson's test job ran on every PR and every push. You never want to deploy just because a PR was opened — you want to deploy after that PR's code is actually merged.

## Segment 2 (code: two jobs, two conditions)

Every PR triggers build and test. The deploy job's if condition only evaluates true when the event is a push, not a pull request, and the branch is literally refs heads main — a real merge, never an open PR.

## Segment 3 (code: secrets)

A deploy step needs real credentials, and those can never be hardcoded into a plain-text workflow file. GitHub Actions secrets inject as environment variables at run time and get automatically masked in any log output.

## Segment 4 (steps: what deploy means)

For a web app, deploy might mean restarting a process or triggering a hosting platform's deploy hook. For a static site, it's building and pushing the output. For a dbt project, there's no server at all — running dbt build against production successfully IS the deploy.

## Segment 5 (outro)

Next lesson starts Chapter 5: the capstone — applying everything in this course to a real GitHub workflow of your own.
