# Script — Deployment Environments: Dev, Staging & Prod

## Segment 1 (title)

Every dbt Cloud project has your personal Development environment, and one or more shared deployment environments for everything that isn't a single developer's in-progress work.

## Segment 2 (screenshot: create deployment environment)

Creating one is a real, named choice — General, Staging, or Production. These aren't just naming conventions a team agrees on; they're actual selectable environment types, each with its own connection and schema.

## Segment 3 (steps: why three environments)

Development is your personal sandbox, scoped to your branch. Staging mirrors production closely enough to catch problems safely. Production is what your real dashboards query — only scheduled jobs and merged, tested code should ever write there.

## Segment 4 (steps: how this chapter connects)

One pull request touches all of it: developed in your Development environment, tested by Slim CI against Production's last known state in a temp schema, then run for real in Production by a scheduled job once merged.

## Segment 5 (outro)

Next lesson: Semantic Layer Concepts — defining a metric's logic once in dbt, instead of redefining it in every BI tool.
