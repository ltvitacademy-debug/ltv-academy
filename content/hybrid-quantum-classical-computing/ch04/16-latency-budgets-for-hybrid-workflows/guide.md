# Latency Budgets for Hybrid Workflows

"How long will this take to run?" is a question every stakeholder asks, and Chapter 3 showed the honest answer is almost entirely about queue depth, not computation. This lesson turns that into an actual latency budget you can set and defend before a project starts.

## What you'll learn

- How to build a per-stage latency budget for a hybrid iteration, from real measured numbers
- Why queue wait dominates the budget and what levers actually affect it
- How to set a realistic end-to-end deadline for a multi-iteration workflow
- How batching changes the latency budget's shape, not just its total
- How to communicate a latency budget to a non-technical stakeholder honestly

## Building the per-stage budget

Using the same measured stage timings from Lesson 11's orchestration lesson:

```
Stage                          Time (ms)    % of total
classical prep (normalize)            12        0.03%
network: submit request RTT          150        0.39%
queue wait (observed average)     38,000       99.07%
QPU execution time                    40        0.10%
network: fetch result RTT            150        0.39%
classical post-process                  9        0.02%
---------------------------------------------------------
TOTAL                              38,361 ms   100.00%
```

A latency budget built from this data has exactly one lever worth pulling first: queue wait. Shaving the 12ms classical prep step down to 6ms saves 0.016% of total latency — not worth a single engineering hour. Reducing queue wait by switching to a less-congested device, or by reducing the number of times you have to queue (batching), is where all the real leverage is.

![Amazon Braket Devices list, live status](/courses/hybrid-quantum-classical-computing/ch04/16-latency-budgets-for-hybrid-workflows/aws-devices-list.webp)
*Queue depth is a real, checkable property of a real device — the lever that actually moves latency.*

## Setting a realistic end-to-end deadline

For a 150-iteration run with no batching, using the per-iteration total above:

```
150 iterations x 38,361 ms = 5,754,150 ms ≈ 95.9 minutes ≈ 1.6 hours
```

That's the number to put in a project plan, not "it should run in a few minutes" based on the 40ms QPU execution time alone — a mistake that comes from focusing on the part of the system that feels like "the computation" rather than the part that actually consumes wall-clock time.

## How batching changes the budget's shape

Lesson 11 showed that batching the 17 parameter-shift evaluations per iteration into one program-set submission changes the per-iteration total from roughly 717,150ms (unbatched) to roughly 42,750ms (batched) — because batching doesn't eliminate queue wait, it eliminates *paying it 17 times per iteration*. For the full 150-iteration run:

```
Unbatched 150-iteration total: 150 x 717,150 ms ≈ 29.9 hours
Batched 150-iteration total:   150 x  42,750 ms ≈  1.78 hours
```

The latency budget conversation with a stakeholder is completely different depending on which of these numbers you're defending — which is exactly why the orchestration design decision (batch or don't) has to be made before the latency budget is quoted, not after.

![Real Azure Quantum job lifecycle diagram](/courses/hybrid-quantum-classical-computing/ch04/16-latency-budgets-for-hybrid-workflows/azure-job-flow-diagram.png)
*The stages a latency budget is built from — submit, queue, run, retrieve — drawn by the provider itself.*

![Amazon Braket quantum task detail](/courses/hybrid-quantum-classical-computing/ch04/16-latency-budgets-for-hybrid-workflows/aws-quantum-task-detail.webp)
*Where the real timestamps behind a latency budget actually live, for one real task.*

## Communicating a latency budget honestly

A latency budget should be presented as a range tied to an explicit assumption, not a single confident number: "based on an observed average queue wait of 38 seconds per submission on this device, and assuming we use program-set batching, we expect this 150-iteration run to take roughly 1.8 hours — but queue wait varies with overall device demand, so a busier day could push this to 3+ hours." This framing does two things a single point estimate doesn't: it names the dominant variable (queue wait) explicitly, and it gives the stakeholder a way to understand *why* the estimate might change, rather than treating any deviation as evidence the estimate was simply wrong.

## Key terms

| Term | Meaning |
|---|---|
| Per-stage latency budget | A breakdown of where time is spent across classical prep, network, queue, and execution stages |
| Dominant variable | The single stage (here, queue wait) responsible for the overwhelming majority of total latency |
| End-to-end deadline | The total wall-clock time estimate for a complete multi-iteration workflow, derived from the per-stage budget |
| Latency range with assumption | Presenting a time estimate alongside the specific variable (e.g., queue depth) that could change it, rather than a bare point estimate |
| Batching's latency effect | Reducing the number of times queue wait is paid, not reducing queue wait itself |

## Check yourself

A device's observed average queue wait rises from 38 seconds to 90 seconds during a high-demand period. Recompute the batched per-iteration total and the full 150-iteration batched total under this new queue wait, and explain what you'd tell a stakeholder who asks why the estimate changed.
