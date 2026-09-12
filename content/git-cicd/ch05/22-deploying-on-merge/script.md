# Script — Deploying on Merge to Main

## Segment 1 (title)

Lesson 20's ci.yml triggers on both pull request and push to main — but those are different moments needing different behavior. A PR should check the change against a disposable CI schema. A merge to main should run again against the real production schema, because the change is now trusted.

## Segment 2 (code: two jobs, two conditions)

Conflating those two would either run untested PR branches against production, or never actually update production at all. The fix is two separate jobs, each gated by its own if condition on the same trigger — build-and-test only runs on pull_request, deploy only runs on a push landing directly on main.

## Segment 3 (code: two targets, one profiles.yml)

The --target prod flag switches which block of profiles.yml dbt reads, without changing the file's structure. Same project, same models, same tests — pointed at a disposable ci schema during review, and the real analytics schema once the change is trusted enough to merge.

## Segment 4 (steps: what deploy means here)

Deploying a web application usually means restarting a running process. A dbt deploy is different — there's no server to restart. Running dbt build against the real production schema, successfully, is the entire deployment.

## Segment 5 (outro)

Next lesson: environment variables and secrets — where those production credentials actually come from, and how GitHub keeps them out of the repository entirely.
