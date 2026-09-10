# Lesson 55 — Right-Sizing Compute

**Chapter 3 · Production Data Engineering · Lesson 55 of 70**

## What you'll learn

- Two symmetric mistakes: over-provisioning and under-provisioning
- Reading Lesson 14's bursting/smoothing behavior as a sizing signal
- Sizing by evidence, not by guessing at the start
- A practical process for adjusting a Fabric Capacity SKU over time

## Two mistakes, same root cause

```
Over-provisioned:   an F64 capacity running at 15% utilization,
                    most months -- paying for headroom nobody uses
Under-provisioned:  an F8 capacity constantly bursting/throttling,
                    Eventstream backlog building up during peak hours
```

Both mistakes come from the same root cause: sizing a Fabric
Capacity (Lesson 14) based on a guess made once, at the start,
rather than on actual measured behavior. An oversized capacity
wastes Lesson 54's budget on headroom nobody uses. An undersized one
creates exactly the kind of pipeline-health problem Lesson 53's
alerts exist to catch — except now it's happening constantly instead
of occasionally.

## Reading bursting and smoothing as a signal

Lesson 14 described Fabric Capacity's bursting behavior — short
spikes borrow against future capacity, smoothed out over a rolling
window. Frequent, sustained bursting is a real signal that the base
SKU is too small for the workload's actual baseline, not just its
occasional peaks. Bursting once during an unusual traffic spike is
normal and expected; bursting every single day at the same hour
means the "normal" baseline itself has outgrown the SKU.

## Sizing by evidence, not by guessing

```
1. Start with a reasonably conservative SKU (not the smallest, not the largest)
2. Watch the Monitoring Hub (Lesson 16) and CU consumption metrics for 2-4 weeks
3. Look for sustained bursting (too small) or persistent low utilization (too large)
4. Adjust the SKU based on that evidence, then repeat the observation period
```

This mirrors Lesson 48's broader lesson about testing against
production-shaped data rather than assumptions: a capacity decision
made from real, observed utilization is reliable in a way a decision
made from a spec sheet at project kickoff never can be, because
real workloads rarely behave exactly as predicted.

## The tradeoff is never fully solved, only managed

There's no SKU that's perfectly sized forever — a real-time
pipeline's load changes as usage grows, as new dashboards get added,
as Chapter 2's Eventstream logic gets extended. Right-sizing isn't
a one-time decision; it's a recurring check, informed by the same
observability (Lesson 52) already built for other reasons.

## Key terms

| Term | Meaning |
|---|---|
| Over-provisioned | Paying for capacity headroom that goes consistently unused |
| Under-provisioned | Insufficient capacity causing sustained bursting or throttling |
| Sustained bursting | A signal the baseline SKU itself is too small, not just handling a rare spike |

## Check yourself

You're ready for Lesson 56 when you can explain, without looking: why
is bursting once during an unusual spike different from bursting
every day at the same hour?
