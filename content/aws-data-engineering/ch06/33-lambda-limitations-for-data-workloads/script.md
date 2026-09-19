# Script — Lambda's Limitations for Data Workloads

## Segment 1 (title)

Lambda looks like the answer to almost everything, but data engineering also has workloads it was never built for. Knowing exactly where that line sits keeps you from reaching for Lambda when Glue or EMR is the right call.

## Segment 2 (steps: three hard ceilings)

Three ceilings rule Lambda out for large-scale ETL. A hard fifteen-minute timeout, no exceptions. A memory ceiling around ten gigabytes, which a large in-memory join or aggregation can blow past on real production data. And limited temporary disk space in /tmp, nowhere near enough to spill a large dataset during processing.

## Segment 3 (code: one instance, not a cluster)

The deeper issue underneath all three: a single Lambda invocation is one instance running your code, not a cluster. Glue and EMR spread a job across many workers handling slices of the data in parallel — that's what lets them process datasets far larger than any single machine could hold. Lambda has no equivalent built in.

## Segment 4 (outro)

Lambda's limitations down. Next up: Lambda plus Step Functions — orchestrating multiple Lambda steps together instead of asking one function to do everything.
