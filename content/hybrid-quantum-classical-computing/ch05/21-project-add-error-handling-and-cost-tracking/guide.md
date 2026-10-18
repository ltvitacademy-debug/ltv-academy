# Project: Add Error Handling & Cost Tracking

The orchestration layer from Lesson 20 runs the happy path correctly. This lesson adds the two things every real deployment of this system needs before it can be trusted unattended: proper failure handling and a live, trustworthy cost ledger.

## What you'll learn

- How to implement the retry/fallback decision table from Lessons 12-13 inside this project's loop
- How to build a running cost ledger that updates per iteration, not just at the end
- How to set and enforce the cost circuit-breaker from Lesson 5's Mistake 3, with this project's real numbers
- How to log enough detail to answer "what happened and what did it cost" without re-running anything
- How to test the error-handling code using injected synthetic failures, not by waiting for a real one

## Implementing the retry/fallback decision inside this project's loop

When an iteration's program-set submission returns `FAILED`, the orchestration code checks the failure reason against Lesson 12's decision table: a device-offline or queue-timeout failure triggers exponential backoff (Lesson 13's formula: `min(cap, base x 2^attempt)`) and resubmission to the next-available device; a circuit-validation failure is logged as a code bug and does not retry; if backoff exhausts a 3-attempt budget, the iteration falls back to a flagged classical-simulator estimate for that one iteration rather than silently treating it as zero or dropping it from the optimizer's view (Lesson 13's fallback ordering).

![Amazon Braket quantum task detail](/courses/hybrid-quantum-classical-computing/ch05/21-project-add-error-handling-and-cost-tracking/aws-quantum-task-detail.webp)
*Exactly the fields a ledger entry needs — status, shots, cost — for one real submission.*

## Building the running cost ledger

Every submission — successful or failed — appends a ledger entry: `{iteration, attempt, device, shots, cost, status, latency_ms}`. The cumulative cost is the running sum of every entry's `cost` field, updated after each submission completes, not computed once at the end of the run. Using this project's numbers (13 evaluations/iteration, 1,000 shots/eval, Rigetti Ankaa-3 pricing):

```
per-submission cost (normal) = $0.30 + 13,000 x $0.0009 = $0.30 + $11.70 = $12.00
```

If iteration 23 fails once (billed) before succeeding on retry, the ledger shows two $12.00 entries for iteration 23 (one `FAILED`, one `DONE`) instead of collapsing them into a single silent $12.00 — making the wasted spend visible exactly the way Lesson 14's orchestration lab required.

## Enforcing a cost circuit-breaker

Lesson 19's brief budgeted this project's full 80-iteration run at $960.00 (80 x $12.00 under all-success conditions). The circuit-breaker checks cumulative ledger cost against a ceiling set with headroom for expected retries — say, $1,200 (25% headroom) — after every submission, independent of the iteration counter. If cumulative cost crosses $1,200 before iteration 80 completes, the loop halts immediately and raises an alert, rather than continuing to spend on an optimization run that's already run far more expensively than planned, which is exactly the Lesson 5 Mistake 3 fix applied with this project's real ceiling.

![Amazon Braket Spending limits](/courses/hybrid-quantum-classical-computing/ch05/21-project-add-error-handling-and-cost-tracking/aws-spending-limits.webp)
*A real per-QPU cap — the same mechanism this project's $1,200 ceiling is built on.*

## What the log needs to answer after the fact

A completed (or halted) run's log should let a reviewer answer, without re-running anything: total cost, total wall-clock time, number of failed/retried iterations and their individual cost, whether any fallback was used and for which iteration, and the final converged cost-function value with its standard error. This is the same operational-log requirement from Lesson 14's orchestration lab, now applied concretely to this project rather than described abstractly.

![Real Azure Quantum job state diagram](/courses/hybrid-quantum-classical-computing/ch05/21-project-add-error-handling-and-cost-tracking/azure-job-state-diagram.png)
*The states fault injection targets — forcing exactly these transitions on command.*

## Testing error handling with injected failures

Real device failures are too rare and unpredictable to wait for during testing. Instead, the test harness wraps the backend adapter (Lesson 10's abstraction layer) with a fault-injection layer that can force a specific submission to return `FAILED` with a chosen reason on command — letting you verify, deterministically, that a device-offline failure on iteration 10 triggers backoff-and-retry, that a validation failure on iteration 40 does not retry, and that forcing 4 consecutive failures correctly triggers the fallback path, all without needing a real device to actually fail at the right moment.

## Key terms

| Term | Meaning |
|---|---|
| Running cost ledger | A per-submission log of cost, status, and latency that's summed cumulatively throughout a run, not computed only at the end |
| Cost circuit-breaker ceiling | A cumulative-spend threshold, set with headroom above the planned budget, that halts the loop and alerts if crossed |
| Fault-injection testing | Wrapping the backend adapter with a test layer that can force specific, deterministic failures on command for testing error handling |
| Visible wasted spend | Logging failed-but-billed attempts as their own ledger entries, rather than silently merging them into the successful attempt's cost |
| Post-hoc answerability | The property that a completed run's log lets a reviewer answer cost/time/failure questions without re-running the system |

## Check yourself

The cost circuit-breaker is set to $1,200 with 25% headroom over the $960 planned budget. If 5 iterations each incur one wasted $12.00 failed attempt before succeeding, does the run complete all 80 iterations before the circuit-breaker would trip? Show the cumulative cost calculation and your conclusion.
