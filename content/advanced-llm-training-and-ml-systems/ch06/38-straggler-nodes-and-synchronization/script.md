# Script — Straggler Nodes & Synchronization

## Segment 1 (title)

Not every slowdown is a crash or a hang. This lesson covers a quieter, costly problem: a node that never fails at all, it just runs slower than the rest of the fleet -- and in synchronous training, that's enough to drag everyone else down with it.

## Segment 2 (steps)

In standard synchronous data parallelism, every rank computes its gradients and then hits an all-reduce to average them before anyone takes an optimizer step. That all-reduce is a synchronization point -- every rank has to arrive before any of them can move past it. If one rank is twenty percent slower, every other rank sits idle for that extra twenty percent. The job's throughput is bounded by its single slowest member, not the average.

## Segment 3 (steps)

A node doesn't need to be broken to be slow. Manufacturing variance and thermal throttling mean no two GPUs behave identically under sustained load. Network topology matters too -- nodes farther from the switch fabric's center see higher latency on their collective communication. And a noisy neighbor, another job competing for the same shared bandwidth, can slow a perfectly healthy node intermittently.

## Segment 4 (code)

Aggregate throughput tells you something's wrong but not which node. The useful signal is per-rank, per-step timing -- logging how long each rank spends in forward and backward before it reaches the all-reduce, and comparing ranks against each other rather than a global average. A rank that's consistently slower across many steps, not just an occasional blip, is a straggler worth draining out of the job.

## Segment 5 (outro)

There's no single fix -- thermal stragglers often get drained and replaced through the elastic restart machinery, while NCCL timeout tuning bounds how long the job tolerates a straggler before treating it as a failure. None of this works without good visibility into what's actually happening during a run, which is exactly what the next lesson covers: training run observability.
