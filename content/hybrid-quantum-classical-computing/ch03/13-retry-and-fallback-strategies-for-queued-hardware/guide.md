# Retry & Fallback Strategies for Queued Hardware

Knowing which failures are retryable (Lesson 12) is half the job. This lesson builds the actual retry mechanism — exponential backoff with jitter — and the fallback decision logic for when retrying stops being the right call.

## What you'll learn

- How exponential backoff with jitter works, with a real computed delay sequence
- Why naive fixed-interval retrying makes queue congestion worse, not better
- How to decide when to stop retrying and fall back instead, with a concrete threshold
- What a reasonable fallback actually looks like for a hybrid quantum job
- How to log retry/fallback events so they're visible in the cost tracking from Chapter 4

## Why fixed-interval retry is the wrong default

Retrying every failed request after exactly 1 second sounds reasonable until you consider what happens when the failure is caused by provider-side congestion (a busy queue, a rate limit): every client retrying on the same fixed interval creates synchronized retry storms that make the congestion worse, not better. The standard fix, used across distributed systems generally and directly applicable here, is **exponential backoff with jitter**: each retry waits longer than the last, following a doubling pattern, with some randomization to desynchronize simultaneous retriers.

## Computing a real backoff sequence

With a base delay of 500ms and a cap of 60,000ms (60 sec), the deterministic backoff cap per attempt is:

```
attempt 0: min(60000, 500 * 2^0) =   500 ms
attempt 1: min(60000, 500 * 2^1) = 1,000 ms
attempt 2: min(60000, 500 * 2^2) = 2,000 ms
attempt 3: min(60000, 500 * 2^3) = 4,000 ms
attempt 4: min(60000, 500 * 2^4) = 8,000 ms
attempt 5: min(60000, 500 * 2^5) = 16,000 ms
---------------------------------------------
total worst-case wait across 6 attempts: 31,500 ms (~31.5 sec)
```

"Full jitter" (a common, recommended variant) doesn't retry at exactly these delays — it picks a *random* delay uniformly between 0 and the computed cap for that attempt. This keeps the same overall backoff growth while ensuring that even many clients hitting the same failure at the same moment don't all retry in lockstep, which is the entire point of adding jitter in the first place.

![Amazon Braket real task run history](/courses/hybrid-quantum-classical-computing/ch03/13-retry-and-fallback-strategies-for-queued-hardware/aws-quantum-tasks-list.webp)
*A real task list — exactly where retried attempts and their outcomes actually show up, over time.*

## Deciding when to stop retrying and fall back

A retry loop needs an explicit stopping rule, not an implicit "eventually give up." Two common rules, usually combined: a **max-attempt count** (e.g., 6 attempts, as above) and a **cumulative-time budget** (e.g., stop retrying once total elapsed time exceeds the iteration's latency budget from Chapter 4 — there's no point retrying a job whose result would arrive too late to matter). Once either limit is hit, the orchestration layer needs a concrete fallback, not just an error thrown back to the caller.

## What a reasonable fallback actually looks like

For a hybrid quantum job, three fallback options cover most real cases, in order of preference: **(1) retry on a different, available device** (handles the device-offline case from Lesson 12 directly, often at only a small cost/latency penalty); **(2) fall back to a classical simulator for this one evaluation**, clearly flagged as a lower-fidelity result (useful mid-development, or for a non-critical evaluation where an approximate answer is acceptable); **(3) fail the iteration explicitly and let the calling optimizer decide how to handle a missing data point** (e.g., skip this iteration's update, rather than silently substituting a wrong number — directly connecting to Lesson 12's warning against silent corruption).

![Amazon Braket Devices list](/courses/hybrid-quantum-classical-computing/ch03/13-retry-and-fallback-strategies-for-queued-hardware/aws-devices-list.webp)
*Fallback option 1: retry on a different, available device — the first and usually cheapest choice.*

![Real Azure Quantum job state diagram](/courses/hybrid-quantum-classical-computing/ch03/13-retry-and-fallback-strategies-for-queued-hardware/azure-job-state-diagram.png)
*A failed or cancelled state is exactly where the retry-vs-fallback decision actually gets made.*

## Logging retries and fallbacks as first-class cost/reliability events

Every retry attempt and every fallback decision should be logged with its cost (even failed attempts that were billed, per Lesson 12) and its outcome, feeding directly into the cost dashboard built in Chapter 4. A project that doesn't log this has no way to answer a basic operational question after the fact: "how much of our spend last month went to retries on a congested device, and should we have been using a different device from the start?"

## Key terms

| Term | Meaning |
|---|---|
| Exponential backoff | A retry strategy where each successive delay roughly doubles, reducing load on a congested or recovering system |
| Full jitter | Randomizing the actual retry delay uniformly between 0 and the computed exponential cap, to desynchronize simultaneous retriers |
| Cumulative-time budget | A retry-stopping rule based on total elapsed time, independent of attempt count, tied to the job's latency budget |
| Fallback | A pre-planned alternative action (different device, simulator, explicit failure) taken once retrying is no longer worthwhile |
| Retry storm | The congestion-worsening effect of many clients retrying on the same fixed interval simultaneously |

## Check yourself

Using a base delay of 1,000ms and a cap of 30,000ms, compute the deterministic exponential backoff cap for attempts 0 through 4, and the total worst-case wait across those 5 attempts. Then explain, using the three fallback options above, which one you'd choose for a time-sensitive production job that has exhausted all 5 retries, and why.
