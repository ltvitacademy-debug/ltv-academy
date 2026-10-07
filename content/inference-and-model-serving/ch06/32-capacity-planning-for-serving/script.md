# Script — Capacity Planning for Serving

## Segment 1 (title)

The last lesson defined what you're committing to. This lesson is about turning that commitment into a number of GPUs — enough to hold the SLO at the traffic you actually expect, with enough headroom that a spike or a failed node doesn't immediately break it.

## Segment 2 (steps)

The core question divides peak concurrent load, not average load, by the proven capacity one replica can hold while still meeting your SLO, then multiplies by a headroom factor. A fleet sized for the average falls over during every peak, which is exactly when it matters most.

## Segment 3 (steps)

That per-replica number has to come from your own benchmarks on your own model, GPU, and SLO — not a vendor's marketing throughput, which is almost always measured without any latency constraint. Any real change, like a new model version or a quantization change, invalidates the old number and calls for re-measuring it.

## Segment 4 (code)

Here's that formula as a few lines of code: divide peak requests per second by a replica's proven capacity at your SLO, add thirty percent headroom, and round up. Four hundred fifty peak requests per second against sixty per replica, with that headroom, comes out to ten replicas.

## Segment 5 (steps)

Headroom covers two different things. Spike headroom buys time for autoscaling to react to demand beyond forecast. Failover headroom means that if a node or a whole availability zone goes down, the rest of the fleet still holds the SLO. On top of that, reserved capacity covers the steady baseline cheaply, on-demand covers the variable part above it, and spot capacity — cheap but reclaimable — fits burst, not the SLO-critical floor.

## Segment 6 (outro)

Capacity planning turns an SLO into a replica count using real peak load, a measured per-replica number, and headroom for both spikes and failover, mixed across reserved, on-demand, and spot capacity. Up next, lesson thirty-three: pulling cost, latency, and quality together into the trade-off behind everything in this chapter.
