# Profiling a Quantum-Classical Hybrid Program

A VQE or QAOA program spends time in two completely different places: a classical optimizer loop running on your laptop's CPU, and quantum circuit execution that might be a local simulator call or a network round-trip to a cloud queue. Profiling them as one undifferentiated blob hides which one is actually your bottleneck.

## What you'll learn

- Why hybrid quantum-classical programs need profiling split into "classical time" and "quantum time" categories
- Using Python's `cProfile` and simple timing instrumentation to separate the two
- Why queue wait time on real hardware dwarfs almost everything else, and how to profile around that reality
- A worked example profiling a small VQE loop and identifying where time actually goes
- Connecting profiling results to the resource-estimation work in Lesson 19

## Two fundamentally different kinds of time

A typical VQE loop looks like: classical optimizer proposes parameters → build/bind circuit → execute circuit (shots) → compute expectation value from counts → optimizer uses that to propose new parameters → repeat. Lumping "total time for one VQE run" into a single number tells you nothing about where to optimize, because the two halves have completely different cost structures:

- **Classical time**: optimizer step computation, Python overhead, parameter binding — generally CPU-bound, improvable with standard Python profiling and optimization techniques.
- **Quantum time**: circuit execution — on a local simulator this is still CPU-bound (but a different kind of computation, often matrix/tensor operations); on real hardware this is dominated by network latency and **queue wait**, which no amount of code optimization touches at all.

## Instrumenting the split

```python
import time
from dataclasses import dataclass, field

@dataclass
class ProfileAccumulator:
    classical_time: float = 0.0
    quantum_time: float = 0.0
    n_iterations: int = 0

def run_vqe_iteration(params, backend, acc: ProfileAccumulator):
    t0 = time.perf_counter()
    circuit = bind_ansatz_parameters(params)  # classical: building/binding
    t1 = time.perf_counter()

    counts = backend.run(circuit, shots=1024)  # quantum: execution
    t2 = time.perf_counter()

    expectation = compute_expectation_from_counts(counts)  # classical: analysis
    t3 = time.perf_counter()

    acc.classical_time += (t1 - t0) + (t3 - t2)
    acc.quantum_time += (t2 - t1)
    acc.n_iterations += 1
    return expectation
```

This small amount of instrumentation, applied consistently, answers the question that matters: of the total wall-clock time for a VQE run, what fraction was actually "the quantum part," and what fraction was ordinary Python work that could be sped up with standard classical profiling tools?

## Using `cProfile` for the classical half

Once you know the classical portion is worth optimizing, use Python's built-in profiler on just that portion:

```python
import cProfile

cProfile.run("compute_expectation_from_counts(counts)", sort="cumulative")
```

`cProfile` output shows per-function call counts and cumulative time, which is the right tool once you've confirmed (via the split above) that classical overhead, not quantum execution, is actually where the time is going. Applying `cProfile` to a `backend.run()` call against real hardware is close to useless — it will faithfully report that most of the time was spent "waiting," without telling you anything actionable, because the time isn't being spent in your code at all.

## Queue wait dominates on real hardware

On a local simulator, quantum execution time is typically comparable to or smaller than classical overhead for small circuits. On real cloud-hardware backends, queue wait — time spent waiting for your job to reach the front of a shared device's queue — regularly dominates total wall-clock time by orders of magnitude, and it has nothing to do with your code's efficiency at all. Profiling a hybrid program destined for real hardware should explicitly separate "queue wait" from "actual device execution time" as a third category, since conflating them with classical time would make you chase a nonexistent code-performance problem:

```python
acc.queue_wait_time += (job_started_executing_at - job_submitted_at)
acc.device_execution_time += (job_completed_at - job_started_executing_at)
```

## Worked example: where did the time actually go

A 20-iteration VQE run on a local simulator profiles as: 85% classical time, 15% simulator execution time. The same algorithm submitted to real hardware for a final validation run profiles as: 2% classical time, 1% device execution time, 97% queue wait. These are not contradictory results — they correctly reflect that optimizing the classical loop matters enormously for simulator-based development iteration speed, and matters almost not at all for the cost of a single real-hardware validation run, where the dominant lever is simply submitting fewer, larger jobs rather than many small ones.

## Connecting to resource estimation

Profiling tells you where time went *after* a run. Lesson 19 builds the complementary skill: estimating resource requirements — qubits, depth, shot budget — *before* submitting, so you can predict (and reduce) the number of actual hardware submissions and the circuit size per submission before paying queue-wait cost at all.

## Key terms

| Term | Meaning |
|---|---|
| Classical time | Time spent in ordinary CPU-bound Python code: parameter binding, expectation-value computation, optimizer logic |
| Quantum (device) execution time | Time the backend actually spends running the circuit, separate from any queueing |
| Queue wait time | Time spent waiting for a submitted job to reach the front of a shared real-hardware device's queue; dominates real-hardware wall-clock time |
| `cProfile` | Python's built-in deterministic profiler, useful for classical code but not informative when applied to a network/queue-bound call |

## Check yourself

A teammate runs `cProfile` on their entire VQE script, including the real-hardware `backend.run()` calls, and concludes "the bottleneck is backend.run(), so I need to optimize my code's call to it." Explain what's wrong with that conclusion and what they should profile instead.
