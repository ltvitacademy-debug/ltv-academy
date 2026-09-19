# Lambda's Limitations for Data Workloads

Lessons 30 through 32 made Lambda look like the answer to almost everything: cheap, fast,
serverless, triggered automatically. It's genuinely great at what it's built for — but data
engineering also includes workloads it was never built for, and knowing exactly where that
line sits keeps you from reaching for Lambda when Glue or EMR is the right call.

## What you'll learn

- The three hard ceilings Lambda imposes
- Why those ceilings specifically rule out large-scale ETL
- Where the actual dividing line is: what stays in Lambda, what moves to Glue/EMR

## The three ceilings

- **15-minute timeout.** A transformation over a genuinely large dataset — a multi-terabyte
  join, a full historical reprocessing run — simply cannot finish inside that window, no
  matter how the function is written.
- **Memory ceiling (10,240 MB max).** Large in-memory joins, aggregations, or anything that
  needs to hold a substantial working set in memory will hit this ceiling on real production-
  scale data, well before it hits the timeout.
- **Ephemeral `/tmp` storage.** Lambda gives each invocation up to 10,240 MB of temporary local
  disk in `/tmp` — enough for moderate intermediate files, nowhere near enough for large
  datasets that need to spill to disk during processing.

## No built-in distributed processing

The deeper issue underneath all three ceilings: **a single Lambda invocation is one instance
running your code, not a cluster.** Glue and EMR spread a job's work across many workers, each
handling a slice of the data in parallel — that's what lets them process datasets far larger
than any single machine's memory or disk. Lambda has no equivalent built in. You can fan work
out across many concurrent Lambda invocations for embarrassingly parallel tasks, but that's a
pattern you build yourself, not a distributed engine Lambda gives you the way Spark gives Glue
and EMR one.

## Where the line actually sits

Lambda is the right tool for **small, fast, event-driven work**: validating a single file's
schema, converting one moderate CSV to Parquet, enriching a single record, triggering a
downstream process. **Glue and EMR are the right tools for large-scale, longer-running ETL**:
transforming terabytes of data, complex multi-table joins across a full dataset, anything that
would need more than 15 minutes or more memory than a single Lambda invocation can hold. In
practice, a real pipeline often uses both — Lambda as the lightweight trigger that reacts to a
file landing and *kicks off* a Glue job, rather than Lambda trying to do the heavy processing
itself.

## Key terms

| Term | Meaning |
|---|---|
| Timeout ceiling | Lambda's hard 15-minute maximum execution time per invocation |
| Memory ceiling | Lambda's maximum configurable memory, 10,240 MB |
| Ephemeral storage | Lambda's temporary /tmp disk space, up to 10,240 MB per invocation |
| Single-instance execution | One Lambda invocation runs on one instance, with no built-in distributed processing |

## Check yourself

A pipeline needs to join two datasets totaling 800 GB and write the result back to S3, a job
that historically takes about 40 minutes on a Spark cluster. Why is Lambda the wrong tool for
this specific job, and what would you reach for instead?
