# Capacity Planning for Serving

Lesson 31 defined what you're committing to. This lesson is about turning that commitment into a number of GPUs — enough to hold the SLO at the traffic you actually expect, with enough headroom that a spike or a failed node doesn't immediately break it.

## What you'll learn

- The core capacity-planning question, and the inputs it actually needs
- Why the per-replica capacity number has to come from real benchmarks, not a vendor spec sheet
- Why headroom for spikes and failover isn't optional padding
- How reserved, on-demand, and spot capacity get mixed to balance cost against availability

## The core capacity question

At its simplest:

```
replicas needed = (peak concurrent load) / (proven per-replica capacity at your SLO) × (1 + headroom factor)
```

Each piece matters:

- **Peak concurrent load** — not average load; a fleet sized for the average will fall over during every peak, which is exactly when it matters most
- **Proven per-replica capacity at your SLO** — not raw maximum throughput, but how much load one replica can take while *still meeting* the latency target from Lesson 31 — a replica can often process more tokens/sec if you let p99 latency blow up, which defeats the purpose
- **Headroom factor** — extra capacity on top of the bare minimum, covering both unplanned spikes and planned failover

## Where the per-replica number actually comes from

This is where Lesson 30's benchmarking work pays off directly: the "proven capacity" input has to be measured on your actual model, your actual GPU, and your actual SLO — not a vendor's marketing throughput number, which is almost always measured under conditions (unrealistic batch sizes, no latency constraint, best-case prompts) that don't match production. Any meaningful change — a new model version, a quantization change, a serving-framework upgrade — invalidates the old number and calls for re-measuring, not re-using it.

```python
import math

def replicas_needed(peak_rps, per_replica_rps_at_slo, headroom_factor=0.3):
    base = peak_rps / per_replica_rps_at_slo
    return math.ceil(base * (1 + headroom_factor))

# Example (illustrative): 450 peak RPS, a replica proven to hold
# the SLO at 60 RPS, and 30% headroom for spikes/failover.
replicas_needed(450, 60, 0.30)  # -> 10
```

## Headroom isn't optional padding

Two separate things usually get folded into one "headroom factor," and it's worth keeping them distinct in your own head even if the final number is combined:

- **Spike headroom** — covers demand exceeding your forecast, buying time for autoscaling (Lesson 23) to react
- **Failover headroom (N+1)** — if a node, replica, or availability zone goes down, the remaining fleet still needs to hold the SLO without everyone else's requests degrading

## Mixing capacity types

Not all of that capacity needs to be the same commitment type:

- **Reserved / committed-use capacity** — covers the steady, predictable baseline at the lowest cost per GPU-hour
- **On-demand capacity** — covers the variable part above baseline, at a higher price but no long-term commitment
- **Spot / preemptible capacity** — cheapest, but can be reclaimed with little notice, so it's a fit for burst capacity that can tolerate interruption, not for the steady baseline an SLO depends on

Forecasted growth matters here too — sizing reserved capacity for today's peak while traffic is growing means re-running this calculation on a regular cadence, not once.

## Key terms

| Term | Meaning |
|---|---|
| Peak concurrent load | The highest simultaneous demand the fleet must handle, not the average |
| Proven per-replica capacity | Load one replica can hold while still meeting the SLO, measured, not estimated |
| Headroom factor | Extra capacity above the bare minimum, covering spikes and failover |
| Reserved vs. spot capacity | Steady baseline on committed capacity; burst on cheaper, interruptible capacity |

## Recap

Capacity planning turns an SLO into a replica count using peak (not average) load, a per-replica capacity number that's actually been measured against that SLO, and headroom for both spikes and failover — with reserved, on-demand, and spot capacity mixed to balance cost against availability. Next up, Lesson 33: pulling cost, latency, and quality together into the trade-off that underlies everything in this chapter.
