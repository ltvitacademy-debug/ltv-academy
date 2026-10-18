# Orchestrating a Pipeline Across Classical & Quantum Compute

Orchestration is the layer that actually runs the variational loop (Lesson 2) against the real-world asynchronous job lifecycle (Lesson 10): submitting, waiting, handling partial failure, and feeding results to the next classical step. This lesson builds that layer concretely.

## What you'll learn

- The concrete responsibilities of an orchestration layer, beyond "submit and wait"
- How to measure where time actually goes in one hybrid iteration, with real numbers
- Why queue wait time dominates total latency, and what that implies for architecture choices
- How batching circuit submissions changes the orchestration code's shape and its latency
- How to structure orchestration code as a state machine, not a single blocking call

## The orchestration layer's actual job list

Beyond the bare `submit -> poll -> get_result` sequence from Lesson 10, a production orchestration layer owns: tracking job state across restarts (so a crashed classical process doesn't lose track of an in-flight $60 job), enforcing timeouts on the poll loop, deciding when to retry vs. fail vs. fall back (Lesson 12-13), logging every submission's cost and latency for the budget tracking in Chapter 4, and feeding each completed result into the next step of the variational loop. None of this is quantum-specific logic — it is the same orchestration discipline used for any long-running, asynchronous, costly external job (think: a batch ML training job, or a long-running database migration).

## Measuring where time actually goes: one iteration's stage timings

```
Stage                      Time (ms)
classical prep (normalize)        12
network: submit request RTT      150
queue wait (observed average)  38,000
QPU execution time                 40
network: fetch result RTT        150
classical post-process              9
-----------------------------------
TOTAL                          38,361 ms  (~38.36 sec)
```

The queue wait alone is **99.1% of total iteration time**. This single number should drive almost every orchestration design decision you make: optimizing the 40ms QPU execution time or the 21ms of pure classical work is not where the engineering effort belongs — reducing the number of times you have to queue, and what you do with your classical compute while waiting, is.

![Amazon Braket Hybrid Jobs wizard](/courses/hybrid-quantum-classical-computing/ch03/11-orchestrating-a-pipeline-across-classical-and-quantum-compute/aws-hybrid-job-wizard.webp)
*A real five-step wizard for exactly the batched, state-tracked submission this lesson describes.*

## The batching tradeoff, made concrete

Lesson 2's 150-iteration VQE loop with 8 parameters needs 17 circuit evaluations per iteration under the parameter-shift rule. Submitting those 17 evaluations as 17 separate queued jobs versus batching them into one queued program-set submission changes total wall-clock time dramatically:

```
Unbatched: 17 x (150ms + 38,000ms + 40ms) + 8ms  ≈ 717,150 ms  (~11.95 min) per iteration
Batched:            150ms + 38,000ms + (40ms x 17) + 8ms ≈ 42,750 ms  (~42.75 sec) per iteration

Speedup from batching: ~16.8x per iteration
```

Batching doesn't reduce the number of circuit evaluations (still 17) — it reduces the number of times you wait in a *separate* queue, since all 17 circuits share one queue wait instead of each paying their own. Over a full 150-iteration run, this is the difference between roughly 30 hours and roughly 1.8 hours of wall-clock time, with identical total QPU compute.

![Real Azure Quantum job lifecycle diagram](/courses/hybrid-quantum-classical-computing/ch03/11-orchestrating-a-pipeline-across-classical-and-quantum-compute/azure-job-flow-diagram.png)
*Microsoft's own diagram of the same submit -> queue -> run -> retrieve flow, provider-agnostic.*

## Structuring orchestration as a state machine, not a blocking call

A naive orchestration function that calls `submit()` then spins in a `while True: poll()` loop with a `sleep()` blocks an entire process/thread for the full queue wait — fine for a demo script, unworkable for a service handling multiple concurrent hybrid jobs. Production orchestration code models each job as an explicit state (`PENDING_SUBMIT -> QUEUED -> RUNNING -> AGGREGATING -> DONE/FAILED`), persists that state (so a restart can resume rather than resubmit), and uses an event-driven or scheduled-polling mechanism (a job queue, a cron-triggered poll, or a provider webhook where available) instead of a blocking loop — letting one classical process manage many in-flight quantum jobs concurrently, which matters enormously once you're running a real workload instead of a single interactive experiment.

## Key terms

| Term | Meaning |
|---|---|
| Orchestration layer | The classical code responsible for job lifecycle management, timeouts, retries, logging, and feeding results onward — beyond bare submit/poll |
| Queue wait dominance | The observation that queue time, not execution time, is almost always the largest share of total hybrid iteration latency |
| Batching (program sets) | Submitting multiple circuit evaluations as one queued job to share a single queue wait instead of paying it per evaluation |
| Job state machine | Modeling a quantum job's lifecycle as explicit, persisted states, enabling restart-safe and concurrent job management |
| Event-driven polling | Checking job status via scheduled or webhook-triggered mechanisms rather than a blocking loop that ties up a process |

## Check yourself

Using the unbatched/batched timing model above, compute the total wall-clock time for a 60-iteration run (instead of 150) under both the unbatched and batched approaches, and state the speedup factor. Then explain, in terms of the orchestration layer's responsibilities, what would have to change in the code (not just the math) to actually realize the batched version's speedup in production.
