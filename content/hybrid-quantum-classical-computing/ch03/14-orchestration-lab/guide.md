# Orchestration Lab

This lab assembles Lessons 10-13 into one orchestration design for a realistic scenario: a 150-iteration VQE loop that has to survive real-world queue congestion and occasional device failures without silently corrupting results or blowing a budget.

## What you'll learn

- How to design a complete orchestration flow combining batching, retry, and fallback decisions
- How to trace a single iteration through every decision point the orchestration layer has to make
- How to compute the realistic cost and latency impact of a bad day (congestion + failures) versus a good day
- How to decide, with numbers, whether a fallback decision was the right call in hindsight
- How to write the operational log entries that make this system debuggable after the fact

## The scenario

A 150-iteration VQE loop, 8 parameters, 17 circuit evaluations per iteration (Lesson 2), running on AWS Braket against Rigetti Ankaa-3 ($0.30/task + $0.0009/shot), 1,000 shots per evaluation, using program-set batching (Lesson 11) so all 17 evaluations per iteration share one queued submission.

## Tracing one iteration through the orchestration decision points

```
1. Classical: build 17 shifted circuits for this iteration's gradient + cost estimate
2. Orchestration: check device status (Lesson 10) -- Ankaa-3 reports QUEUED, ~35 jobs ahead
3. Orchestration: submit as ONE program-set job (batching, Lesson 11)
4. Orchestration: poll job status on a scheduled interval (not a blocking loop, Lesson 11)
5a. SUCCESS path: job completes, all 17 circuits' counts returned -> aggregate (Lesson 8) -> optimizer step
5b. FAILURE path: job fails with "device offline mid-queue" (Lesson 12, failure mode 2)
     -> orchestration checks: retryable? YES, but not on the same device (decision table, Lesson 12)
     -> attempt 1: exponential backoff delay (Lesson 13) -> resubmit to next-best available device
     -> if that also fails and cumulative wait exceeds this iteration's latency budget:
        fall back to a flagged classical-simulator result for this ONE iteration (Lesson 13, fallback #2)
6. Orchestration: log cost, latency, and which path (5a or 5b) was taken, for this iteration
```

## Computing the cost of a "bad day"

Suppose across the 150-iteration run, 10 iterations hit the device-offline failure (path 5b) and each requires exactly one failed billed attempt (per Lesson 12's logic) before succeeding on retry with a different device:

```
Normal iteration cost  = 17 x $0.30 + 17,000 x $0.0009 = $5.10 + $15.30 = $20.40
Failed-attempt cost (1 wasted program-set submission, same 17 circuits) = $20.40
10 failed iterations' wasted spend = 10 x $20.40 = $204.00

Total run cost = 150 x $20.40 (successful attempts) + $204.00 (wasted retries) = $3,060 + $204 = $3,264.00
```

Without the retry's wasted spend logged as its own line item, a post-run cost review would just see "$3,264 total" with no way to see that **$204 (6.25% of total spend) came from device failures**, not from the optimization itself — exactly the operational blindness Lesson 13 warns against.

## Was the fallback the right call? Checking in hindsight

Suppose 2 of those 10 failed iterations exhausted their retry budget and fell back to a classical simulator result instead (fallback #2, flagged as lower-fidelity). In hindsight, you can check whether this was the right call by comparing the flagged simulator-estimated cost value for that iteration against the real hardware value from the following iteration's re-evaluation at the same parameters (if available) — if they agree within a few standard errors (Lesson 8), the fallback didn't meaningfully harm the optimization; if they disagree substantially, that's a signal the simulator fallback may need tighter conditions (e.g., only use it for iterations past a certain convergence point, where precision matters less).

## What the operational log needs to capture

For every iteration: iteration number, device used, job status path taken (5a/5b), number of retry attempts, cost of each attempt (including failed ones), total latency, and — if a fallback was used — which fallback and why. This is the data that turns "our quantum project cost more than expected" from a mystery into an answerable question, and it's entirely classical logging code with no quantum-specific complexity.

## Key terms

| Term | Meaning |
|---|---|
| Decision point | A specific branch in the orchestration flow (e.g., "is this failure retryable?") requiring an explicit, logged choice |
| Wasted-spend line item | Cost attributable specifically to failed/retried attempts, tracked separately from normal operating cost |
| Fallback hindsight check | Comparing a fallback result against a later real measurement to assess whether the fallback decision held up |
| Operational log | The structured record of cost, latency, device, and outcome for every job, enabling post-hoc debugging and budget review |
| Bad day vs. good day cost | The cost delta between a run with no failures and one with a realistic rate of retries/fallbacks, used for budget planning |

## Check yourself

Using the same per-iteration cost ($20.40) and a 150-iteration run, compute the total cost if 20 iterations (instead of 10) each require exactly one failed billed attempt before succeeding. What percentage of total spend does the wasted-retry cost represent, and what does that percentage tell you about whether this device is a good choice for this workload going forward?
