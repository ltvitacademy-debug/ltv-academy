# Script — Lakeflow Deployment

## Segment 1 (title)

Every pipeline so far has been a definition — code that exists somewhere. Here's how that code actually becomes a running pipeline, deployed on purpose and repeatably, plus Chapter 3's close.

## Segment 2 (code: Asset Bundle pipeline resource)

Databricks Asset Bundles are Databricks' own YAML-based deployment tool. A resources.pipelines entry in databricks.yml declares a pipeline as code, pointing at the same source files behind Lesson 13's table definitions.

## Segment 3 (code: pipeline modes revisited)

Lesson 53 already covered triggered versus continuous in full. The continuous field in a bundle is where that choice actually lives — set once, deployed with everything else.

## Segment 4 (code: chapter 3 recap)

Chapter 3 covered Lakeflow's declarative model, the real SQL and Python syntax, the honest trade-off against a notebook, Expectations' SQL side, and now deployment as code.

## Segment 5 (outro)

Chapter 3 is complete. Chapter 4, Jobs, Workflows & Orchestration, picks up where Lesson 54 left off — Databricks Jobs, the Workflows UI, task dependencies, and cluster choices.
