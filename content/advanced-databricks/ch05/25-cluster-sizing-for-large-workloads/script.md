# Script — Cluster Sizing for Large Workloads

## Segment 1 (title)

A cluster sized right for one workload shape can be badly wrong for another, even at the same core count. Sizing has to start from what the job actually does — shuffle-heavy or scan-heavy — not from a generic instance-size guess.

## Segment 2 (code: workload shape)

Shuffle-heavy work — joins, high-cardinality group by — bottlenecks on network and disk moving data between nodes. Scan-heavy work — simple filters over huge file volumes — bottlenecks on raw parallelism, where node count matters more than per-node memory.

## Segment 3 (code: autoscaling bounds)

min_workers protects against cold-start latency, keeping a baseline ready instead of spinning up from zero every trigger. max_workers protects against a runaway job scaling out to consume far more budget than intended. Both should reflect typical load and worst tolerable load, not be set once and forgotten.

## Segment 4 (code: when bigger doesn't help)

A bigger cluster helps genuinely parallelizable, evenly distributed work. It does nothing when the real bottleneck is one severely skewed partition — that single task still runs alone on one core no matter how many other cores sit idle. That's Lesson 23's skew problem, seen from the sizing side: more hardware doesn't fix it, only actually splitting the skewed work does.

## Segment 5 (outro)

Size for the workload's real shape, set autoscaling bounds around real load, and know when more nodes simply can't help. Next up: turning right-sizing into an actual cost story.
