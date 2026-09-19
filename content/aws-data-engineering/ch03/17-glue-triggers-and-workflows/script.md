# Script — Glue Triggers & Workflows

## Segment 1 (title)

Crawlers, the Catalog, and jobs are independent components that have to be composed. Triggers and workflows are what actually connect them — the piece that says "run this crawler, then run that job" without a human clicking buttons in sequence.

## Segment 2 (steps: three trigger types)

There are three kinds. Scheduled triggers fire on a cron-like expression, the same style as crawler scheduling. On-demand triggers start manually or from an external API call. And event-based triggers fire when an upstream job or crawler in the same workflow reaches a specific state — usually success. That last one is what lets you chain steps without external orchestration.

## Segment 3 (code: a chained end-to-end sequence)

Here's a realistic pattern. A scheduled trigger kicks off a crawler against a raw landing zone. On its success, a conditional trigger starts an ETL job that transforms raw data into a staging location. On that job's success, a second conditional trigger runs a crawler against the staging output — so the transformed data becomes queryable automatically, with nobody registering it by hand.

## Segment 4 (code: why a workflow, not just loose triggers)

You could wire individual triggers together without a workflow, but a workflow groups the whole chain — crawlers, jobs, and their triggers — into one visual, monitorable unit. One place to see status, and one place to restart the pipeline if something fails.

## Segment 5 (outro)

That closes out Glue: crawlers, the Catalog, jobs, and now triggers and workflows tying it together. Next up: Athena — serverless SQL directly against S3, no cluster to run.
