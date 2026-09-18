# Script — IaC in CI/CD

## Segment 1 (title)

Git/GitHub/CI-CD Lesson 19 had a workflow run tests automatically on every commit. The same pattern applies to infrastructure: run terraform plan automatically on every pull request.

## Segment 2 (code: plan on every PR)

The plan output — the actual computed diff — sits right there in the PR for review, not buried on someone's laptop where nobody else can see it before merge.

## Segment 3 (code: a human approval gate)

Merging to main should trigger apply, but not without a person saying so. GitHub's environment setting requires a reviewer's approval before that job proceeds — the same discipline Lesson 20's real workflow modeled for application code.

## Segment 4 (steps: credentials as secrets)

Both workflows need Azure credentials. Lesson 23 covered exactly this — a service principal's client ID, secret, tenant ID, and subscription ID live as CI secrets, injected at run time, never committed to code.

## Segment 5 (outro)

Plan on every PR, a human gate before apply, credentials as secrets. Chapter 4 is done — next up, Chapter 5: this course's capstone.
