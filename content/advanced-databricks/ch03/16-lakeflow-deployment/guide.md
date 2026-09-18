# Lesson 16 — Lakeflow Deployment

**Chapter 3 · Lakeflow & Declarative Pipelines · Lesson 16 of 34**

## What you'll learn

- Deploying a pipeline definition with Databricks Asset Bundles — genuinely new, the earlier course never covered this
- The `databricks.yml` shape: a `pipelines` resource, alongside a `jobs` resource
- Pipeline modes, briefly revisited: triggered vs. continuous (Lesson 53 covered this in full)
- Chapter 3 close: what Chapter 4 covers next

## Why deployment is a real, separate topic

Every pipeline in Lessons 13-15 has been a SQL or Python definition — code
that exists somewhere, but nothing so far has said how that code actually
becomes a running pipeline in a workspace, on purpose, repeatably, without
someone clicking through the UI by hand each time. **Databricks Asset
Bundles** are Databricks' own YAML-based deployment tool for exactly this: a
`databricks.yml` file that declares a pipeline (or a job) as code, checked
into source control, deployed with one CLI command.

## The shape of a pipeline resource

```yaml
# databricks.yml
resources:
  pipelines:
    nyc_taxi_pipeline:
      name: nyc_taxi_pipeline
      catalog: nyc_taxi
      target: silver
      libraries:
        - notebook:
            path: ./src/bronze_trips.py
        - notebook:
            path: ./src/gold_daily_revenue.py
      continuous: false
```

`resources.pipelines.<name>` is the top-level shape; `libraries` points at
the source files containing the `@dp.table`/`@dp.materialized_view`
definitions from Lesson 13, and `continuous: true`/`false` sets the pipeline
mode. Deploy it with `databricks bundle deploy`, the same CLI Chapter 4 will
use for jobs.

## Pipeline modes, briefly revisited

Lesson 53 already covered this distinction in full: **triggered** pipelines
process everything available, then stop; **continuous** pipelines keep
running, processing new data as it arrives. The `continuous` field above is
where that choice actually lives in a bundle definition — one line, set
once, deployed with everything else, instead of a setting adjusted by hand
in the UI after the fact.

## Chapter 3 close

Chapter 3 covered Lakeflow's declarative authoring model (Lesson 12), the
real SQL and Python syntax (Lesson 13), the honest trade-off against a
traditional notebook pipeline (Lesson 14), Expectations' SQL side (Lesson
15), and now deploying a pipeline definition as code. Chapter 4, **Jobs,
Workflows & Orchestration**, picks up where Lesson 54 left off: Databricks
Jobs, the Workflows UI, task dependencies, cluster choices, and tying a full
multi-step pipeline together.

## Key terms

| Term | Meaning |
|---|---|
| Databricks Asset Bundle | A `databricks.yml`-based, source-controlled way to deploy pipelines and jobs as code |
| `resources.pipelines` | The top-level YAML key declaring a pipeline resource in a bundle |
| `databricks bundle deploy` | The CLI command that deploys a bundle's declared resources to a workspace |

## Check yourself

You're ready for Chapter 4 when you can explain, without looking: where does
a pipeline's triggered-vs-continuous choice live in a Databricks Asset
Bundle definition?
