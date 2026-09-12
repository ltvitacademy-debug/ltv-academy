# Script — What Is CI/CD, Really?

## Segment 1 (title)

CI/CD gets used as one word, but it's actually three distinct practices chained together: Continuous Integration, then either Continuous Delivery or Continuous Deployment — and those last two mean genuinely different things, despite the same abbreviation.

## Segment 2 (screenshot: CI/CD flow diagram)

Continuous Integration means merging code back into a shared branch frequently, with an automated build and test run on every merge. For a dbt project, that means every pull request runs dbt build and dbt test automatically, catching a broken model before it reaches main, not after.

## Segment 3 (steps: delivery vs. deployment)

Continuous Delivery means every change that passes CI is automatically packaged and ready to release, but a human still clicks the button. Continuous Deployment means it ships automatically, no approval step at all. An experimental dbt model might need a human gate; a well-tested internal report might not.

## Segment 4 (steps: applies beyond application code)

None of this requires application code specifically. A dbt project has a build step, a test step, and a release step — the exact same shape as any CI/CD pipeline, just with SQL models instead of application binaries.

## Segment 5 (outro)

Next lesson: pipelines as code — defining this entire process in a file that lives in the repository itself.
