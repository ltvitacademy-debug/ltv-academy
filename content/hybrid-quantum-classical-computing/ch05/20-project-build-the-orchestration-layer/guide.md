# Project: Build the Orchestration Layer

With the project brief from Lesson 19 approved, this lesson builds the actual orchestration layer: the state machine, the batched submission strategy, and the job-lifecycle handling that will run the 80-iteration VQE loop for real.

## What you'll learn

- How to translate the project brief's numbers into a concrete orchestration state machine
- How to implement batched submission for the 13-evaluations-per-iteration workload
- How to structure the polling mechanism so it doesn't block the whole process
- How to wire the aggregation logic (Lesson 8) into the loop so the optimizer gets a correctly-computed value
- How to verify the orchestration layer's correctness against a simulator before touching real hardware

## The state machine for this project's job lifecycle

Following Lesson 11's model, each iteration's program-set submission moves through explicit states:

```
PENDING_SUBMIT -> QUEUED -> RUNNING -> AGGREGATING -> DONE
                        \-> FAILED -> (retry decision, Lesson 12/13) -> QUEUED (new device) or FALLBACK
```

Each iteration's state is persisted (even a simple structured log line is enough at this scale) so that if the orchestration process restarts mid-run, it can resume from the last completed iteration rather than silently restarting the whole 80-iteration loop and re-incurring cost for already-completed work.

![Amazon Braket Hybrid Jobs wizard](/courses/hybrid-quantum-classical-computing/ch05/20-project-build-the-orchestration-layer/aws-hybrid-job-wizard.webp)
*This five-step flow is literally where this orchestration layer gets configured and launched.*

![Amazon Braket Hybrid Jobs, Step 1](/courses/hybrid-quantum-classical-computing/ch05/20-project-build-the-orchestration-layer/aws-hybrid-job-step1.webp)
*Script upload, entry point, hyperparameters — where the orchestration code itself actually lives.*

## Implementing batched submission

Per iteration, the orchestration code builds all 13 shifted circuits (12 parameter-shift evaluations + 1 cost evaluation) and submits them as one program-set job rather than 13 separate submissions — directly applying Lesson 11's batching math, where this reduced per-iteration wall-clock time by roughly 16.8x in the general case. For this project's 6-parameter circuit: `evalsPerIter = 6x2+1 = 13`, so the batching benefit here is slightly smaller than the 17-evaluation example from Lesson 11 but follows the identical pattern — one queue wait shared across 13 evaluations instead of paid 13 times.

## Polling without blocking

The orchestration code polls each submitted job's status on a scheduled interval (e.g., every 5 seconds) rather than blocking in a tight loop, exactly as Lesson 11 specified — this matters even for a single-job capstone project because it's the pattern that scales to running this workflow for multiple molecules or multiple portfolio-risk scenarios concurrently later, without a rewrite.

## Wiring in the aggregation logic

When a submission completes, the orchestration layer passes the returned per-circuit counts to the shot-weighted aggregation function from Lesson 8 — computing the cost-function value (the Hamiltonian expectation estimate) and its standard error, both of which get passed to the classical optimizer and logged (setting up Lesson 21's cost/error tracking). The optimizer never sees raw counts; it only ever sees the aggregated `(value, stderr)` pair, keeping the optimizer's code completely decoupled from quantum-specific data formats — the same separation-of-concerns principle from the Pre/Post-Processing Lab (Lesson 9).

![Amazon Braket Hybrid Jobs, Step 4](/courses/hybrid-quantum-classical-computing/ch05/20-project-build-the-orchestration-layer/aws-hybrid-job-step4.webp)
*Quantum and classical compute settings — where the simulator-first, hardware-second plan is set.*

## Verifying against a simulator first

Before this orchestration layer touches Rigetti Ankaa-3 or any real device, it runs identically against a classical simulator backend — same state machine, same batching logic, same aggregation code — with the only difference being which backend adapter (Lesson 10's abstraction layer) is plugged in. Running the full 80-iteration loop against the simulator costs effectively nothing and confirms the optimizer converges and the state machine correctly handles at least one artificially-injected failure (e.g., a test harness that forces one submission to return a `FAILED` status) before any real money is spent — directly applying Lesson 5's Mistake 1 fix.

## Key terms

| Term | Meaning |
|---|---|
| Persisted job state | Recording each iteration's lifecycle state durably, so a process restart can resume rather than re-run completed work |
| Scheduled polling | Checking job status on a timed interval rather than blocking a thread/process in a tight loop |
| Backend adapter | The provider-specific implementation behind the abstraction layer's submit/poll/result interface, swappable between simulator and real hardware |
| Decoupled optimizer | An optimizer that only consumes the aggregated (value, stderr) pair, with no dependency on raw quantum measurement formats |
| Simulator-first verification | Running the complete orchestration logic against a free simulator backend before any real-hardware submission |

## Check yourself

The orchestration layer's test harness forces iteration 23 (of 80) to return a FAILED status when run against the simulator. Walk through, step by step, what the state machine should do in response, citing the specific lessons (12/13) whose logic applies, and explain how you'd confirm the test passed.
