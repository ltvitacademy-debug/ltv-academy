# Workload Management

A single Redshift cluster typically serves more than one kind of query at once: a two-hour
nightly ETL job, a dashboard someone's refreshing every thirty seconds, and an analyst running
ad hoc exploration — all competing for the same compute. **Workload Management (WLM)**
is Redshift's system for controlling how that shared capacity gets divided up, so one heavy
query doesn't starve everything else.

## What you'll learn

- Query queues, and automatic vs. manual WLM
- Concurrency scaling
- Short query acceleration (SQA)
- Why separating dashboard queries from long ETL matters in practice

## Query queues

WLM routes every incoming query into a **queue**, and each queue gets its own share of memory
and a limit on how many queries can run in it concurrently. With **automatic WLM**, Redshift
manages queue count, memory allocation, and concurrency itself based on workload patterns. With
**manual WLM**, you define the queues yourself — for example, a `dashboards` queue and an `etl`
queue — and assign queries to them by user group or by matching a query's SQL to a label. The
practical reason to go manual: an analytics team's BI tool query shouldn't land in the same
queue as a two-hour transformation job and simply wait its turn.

## Concurrency scaling

When a queue gets busier than its configured capacity can handle, **concurrency scaling** adds
transient, additional cluster capacity automatically to absorb the burst of read queries,
rather than making new queries queue up and wait behind existing ones. It scales back down
again once the burst passes. This targets the same bursty-read problem Serverless targets at
the cluster level (Lesson 24), but applied *within* a provisioned cluster's WLM queues instead
of to the whole cluster's sizing.

## Short query acceleration (SQA)

**SQA** identifies short-running queries — the kind a dashboard or an analyst's quick lookup
generates — and runs them in a dedicated space, ahead of longer-running queries already queued.
Without SQA, a two-second `SELECT` could sit behind a query that's been running for twenty
minutes, simply because it arrived second. SQA uses machine learning to predict a query's
runtime from its execution plan and prioritizes the ones it predicts will be fast.

## Prioritizing dashboards over long ETL

Put these together and you get the actual production pattern: a manual WLM configuration with
a low-concurrency, high-memory queue for long ETL jobs, and a separate, higher-priority queue
(or SQA) reserved for fast BI/dashboard queries — so a business user staring at a dashboard
never has to wonder why it's spinning because someone kicked off a nightly load five minutes
early.

## Key terms

| Term | Meaning |
|---|---|
| WLM | Workload Management — controls how query queues share cluster capacity |
| Query queue | A pool with its own memory allocation and concurrency limit for a class of queries |
| Automatic WLM | Redshift manages queue count, memory, and concurrency itself |
| Concurrency scaling | Adds transient cluster capacity automatically to absorb bursts of read queries |
| SQA | Short Query Acceleration — runs predicted-fast queries ahead of long-running ones |

## Check yourself

A dashboard query that normally takes two seconds is stuck behind a twenty-minute ETL job that
started just before it. Name two WLM features from this lesson that could prevent that, and
explain how each one would help.
