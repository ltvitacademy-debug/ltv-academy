# Lesson 16 — Retry, Backoff and Dead-Letter Handling

**Chapter 3 · Reliability and Operations · Lesson 16 of 28**

## What you'll learn

- Why naive, immediate retries can make an outage worse instead of better
- Exponential backoff and jitter, and why both are needed together
- What a dead-letter queue is, and why "retry forever" is never actually the right final answer
- How retry strategy, idempotency (Lesson 15), and dead-letter handling fit together as one coherent reliability design

## Retrying immediately can make things worse

Once Lesson 15 has established that an operation is safe to retry, the next question is *how* to retry it — and the naive answer, "just try again immediately, repeatedly," is actually a common cause of cascading failure. If a remote system is struggling under load and every failed caller immediately retries, the retry traffic adds to the load that caused the failure in the first place, and the system that might have recovered in a few seconds under reduced load instead stays overwhelmed by a wave of simultaneous retries. This specific failure mode — a system never recovering because retries keep re-creating the load that caused the original failure — is common enough to have its own name: a **retry storm**.

## Exponential backoff and jitter

**Exponential backoff** fixes the timing problem by waiting progressively longer between each retry attempt — for example, 1 second, then 2, then 4, then 8 — rather than retrying at a fixed interval. This gives a struggling remote system increasing breathing room to recover, and it naturally limits how many retries pile up in a short window. Backoff also typically includes a maximum number of attempts and a cap on the maximum wait time, so a caller doesn't retry indefinitely into the far future for a request that's probably never going to succeed.

Exponential backoff alone still has a weakness: if many callers all failed at the same moment (because the remote system just went down), they'll all compute the same backoff schedule and all retry again at the same moment, re-creating the retry storm at a lower frequency instead of eliminating it. **Jitter** fixes this by adding a small, randomized amount of variation to each caller's wait time, so that even callers who failed at the exact same instant end up retrying at slightly different times, spreading the retry load out instead of concentrating it. Exponential backoff and jitter are almost always used together in production retry logic for exactly this reason — backoff alone and jitter alone each solve half the problem.

## Dead-letter handling: retry has to end somewhere

No retry strategy should genuinely be "try forever" — at some point, continuing to retry a request that keeps failing stops being useful and starts being noise, or worse, a silent resource drain. A **dead-letter queue** (sometimes called a dead-letter channel) is where a message or request goes after it has exhausted its retry attempts without succeeding: instead of being silently dropped (the silent data loss failure mode from Lesson 2) or retried forever, it's moved somewhere a human or a separate recovery process can see it, investigate why it kept failing, and decide what to do — fix the underlying data problem and resubmit it, escalate it, or in rare cases accept the specific record as a permanent failure after review. The dead-letter queue is the deliberate alternative to both extremes: endless silent retries and silent data loss.

## How the three pieces fit together

Idempotency, backoff-with-jitter, and dead-letter handling aren't three separate features — they're one coherent reliability design, each covering a gap the others leave open. Idempotency (Lesson 15) makes a retry *safe* to attempt. Exponential backoff with jitter makes retrying *responsible*, so the act of retrying doesn't itself cause further damage to an already-struggling system. Dead-letter handling makes failure *visible* once retries have been exhausted, so a request that genuinely can't succeed doesn't vanish silently or retry forever. An architect reviewing an integration's error handling checks for all three, in that order: is this operation idempotent, does its retry logic back off with jitter rather than hammering immediately, and does it have a defined dead-letter destination once retries run out.

## Key terms

| Term | Meaning |
|---|---|
| Retry storm | A cascading failure where simultaneous retries re-create the load that caused the original failure, preventing recovery |
| Exponential backoff | Waiting progressively longer between retry attempts instead of retrying at a fixed interval |
| Jitter | Randomized variation added to each caller's backoff wait time, to spread retries out instead of concentrating them |
| Dead-letter queue | Where a message or request goes after exhausting its retry attempts, for human or process-level review instead of silent loss |

## Lab

An integration calling an external shipping-rate API starts failing for every order during a 10-minute outage on the shipping provider's side. The current implementation retries every failed call immediately, with no delay and no limit. Redesign the retry logic using exponential backoff and jitter, specify a reasonable maximum number of attempts, and describe exactly what should happen to an order's rate-calculation request if it still hasn't succeeded after the maximum attempts are exhausted.

## Check yourself

Can you explain why immediate, unlimited retries can make an outage worse rather than better? Can you explain, in your own words, why exponential backoff and jitter are normally used together rather than either one alone, and what a dead-letter queue is for?
