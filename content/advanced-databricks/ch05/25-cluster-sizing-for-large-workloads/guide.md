# Lesson 25 — Cluster Sizing for Large Workloads

**Chapter 5 · Performance at Scale · Lesson 25 of 34**

## What you'll learn

- Sizing by workload shape — shuffle-heavy vs. scan-heavy — not by guesswork
- Autoscaling min/max worker bounds, and what each one is actually protecting against
- Why a bigger cluster sometimes does nothing at all
- The skew case from Lesson 23, seen from the sizing side

## Sizing by workload shape

```text
SHUFFLE-HEAVY workload:
  wide transformations -- joins, high-cardinality GROUP BY
  bottleneck: network + disk I/O moving data BETWEEN nodes
  needs: nodes with strong network throughput, enough local
         disk for shuffle spill

SCAN-HEAVY workload:
  simple filters/reads over a huge volume of files
  bottleneck: raw parallelism -- more cores reading more files
              at once
  needs: more, possibly smaller, nodes; per-node memory matters
         less than node COUNT
```

A cluster sized right for one shape can be badly wrong for the
other, even at the same total core count. Sizing has to start from
"what does this specific job actually do," not from a generic
"medium" or "large" instance-size guess.

## Autoscaling — min and max, not just "autoscaling: on"

```json
{
  "autoscale": {
    "min_workers": 2,
    "max_workers": 12
  }
}
```

`min_workers` protects against cold-start latency — every job
trigger on a 0-worker cluster waits for new nodes to spin up before
any work starts; a small floor keeps a baseline ready. `max_workers`
protects against the opposite problem: an unexpectedly large job (or
a runaway query) scaling out to consume far more compute budget than
intended, unbounded. Neither bound is "set it and forget it" — both
should reflect the *typical* load (the floor) and the worst
*tolerable* load (the ceiling) for that specific job.

## When a bigger cluster helps — and when it doesn't

```text
Bigger cluster helps when:
  the job is genuinely parallelizable and evenly distributed --
  more scan-heavy work to spread across more cores actually
  finishes faster with more cores available

Bigger cluster does NOT help when:
  the query is bottlenecked on ONE skewed partition (Lesson 23) --
  that one task still runs alone, on one core, no matter how many
  OTHER cores are sitting idle waiting for it to finish
```

This is the direct, practical consequence of Lesson 23's AQE skew
handling: doubling a cluster's worker count does nothing for a job
whose real bottleneck is a single oversized shuffle partition.
Fixing that means fixing the skew (AQE, or a manual salting
technique) — not buying more hardware to sit idle around it.

## A sizing checklist that actually reflects this

```text
1. Is this shuffle-heavy or scan-heavy? -- changes the answer
2. What's the WORST observed skew in this data? -- if it's bad,
   more nodes won't fix the real bottleneck
3. What's the typical vs. peak load? -- sets min/max, not a
   single fixed size
4. Is this a job cluster (terminates after) or all-purpose
   (stays up)? -- changes whether right-sizing or auto-termination
   (Lesson 26) matters more
```

## Key terms

| Term | Meaning |
|---|---|
| Shuffle-heavy workload | Bottlenecked on network/disk I/O moving data between nodes (joins, wide GROUP BY) |
| Scan-heavy workload | Bottlenecked on raw parallelism across many files/rows |
| `min_workers` / `max_workers` | Autoscaling floor (cold-start protection) and ceiling (runaway-cost protection) |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why
doesn't doubling a cluster's worker count fix a job that's
bottlenecked on one severely skewed shuffle partition?
