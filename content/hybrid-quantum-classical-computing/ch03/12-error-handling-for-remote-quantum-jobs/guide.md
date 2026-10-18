# Error Handling for Remote Quantum Jobs

A quantum cloud job can fail in more ways than a typical REST API call, and several of those failure modes still cost you money even though they produced no usable result. Error handling here isn't a defensive afterthought — it's where a meaningful fraction of a hybrid project's real-world cost and reliability risk lives.

## What you'll learn

- The distinct failure modes a quantum cloud job can hit, beyond a generic "request failed"
- Why some failures still get billed, and what that means for your error-handling design
- How to distinguish a retryable failure from one that needs a fallback instead
- How to structure error handling so a failure in one evaluation doesn't corrupt the whole optimization loop
- A worked example of wasted spend from unhandled failures, with real numbers

## The failure modes specific to this domain

1. **Queue timeout / cancellation**: a job sits in queue past a caller-specified or provider-imposed timeout and is cancelled before ever running.
2. **Device goes offline mid-queue**: the specific device a job was queued for is taken offline for recalibration or maintenance while the job is waiting, and the job fails or is rerouted depending on the provider's policy.
3. **Partial shot completion**: for some providers/devices, a job can complete only a subset of the requested shots before erroring out (e.g., a transient hardware fault partway through), returning a counts dictionary with fewer total shots than requested.
4. **Circuit validation failure**: the submitted circuit violates a device's constraints (too many qubits, an unsupported gate, exceeding max circuit depth) and is rejected before ever queueing — this one is a classical bug (a validation step that should have run before submission) rather than a hardware issue.
5. **Transient API/network failure**: the submission or polling call itself fails due to an ordinary network blip or provider API rate limit, unrelated to the quantum job's actual state.

## Why some failures still cost money

Several cloud providers bill based on the task being submitted and queued, not strictly on a successful completion — a cancelled or partially-completed job can still incur the flat per-task fee, and in some documented cases a partial run still bills for the shots actually executed before the failure. A job that fails after reaching the device (failure modes 2 and 3 above) is the expensive case to get wrong: unlike failure modes 4 and 5, which fail before any real compute happens, these failures can still generate real spend for a result you can't use.

```
Example: a job fails twice (modes 2/3) before succeeding on the 3rd attempt,
on IonQ Aria ($0.30/task + $0.03/shot, 1,000 shots/task):

wasted spend = 2 x ($0.30 + 1,000 x $0.03) = 2 x $30.30 = $60.60
```

An orchestration layer with no error handling doesn't just fail the job — in a loop with no circuit-breaker (Lesson 5's Mistake 3), it can retry blindly and keep incurring this $30.30-per-attempt cost indefinitely without any visibility into cumulative waste.

## Retryable vs. needs-a-fallback: a decision table

| Failure mode | Retryable? | Why |
|---|---|---|
| Queue timeout/cancellation | Yes | Likely transient demand; retrying (possibly on a different device) often succeeds |
| Device offline mid-queue | Yes, but to a different device | Retrying the same offline device wastes time; fall over to an alternate device |
| Partial shot completion | Depends | If enough shots completed for an acceptable standard error (Chapter 4), treat as a usable partial result; otherwise retry |
| Circuit validation failure | No | This is a classical bug in your submission code — retrying the identical invalid circuit will fail identically every time |
| Transient API/network failure | Yes | Classic transient-error retry case, same as any REST API client |

This table is why error handling can't be one generic `try/except: retry` block — the correct response genuinely differs by failure mode, and treating a validation failure (a code bug) the same as a queue timeout (a transient condition) either wastes retries on an unfixable error or gives up too early on a recoverable one.

## Isolating one failed evaluation from the whole optimization loop

In a variational loop (Lesson 2) making 17 evaluations per iteration, one evaluation failing shouldn't silently corrupt the gradient estimate by being treated as a zero or being dropped without anyone noticing. Production orchestration code should mark a failed evaluation explicitly, decide (per the table above) whether to retry it before the optimizer step proceeds, and — if it can't be recovered within the iteration's time/cost budget — explicitly flag that iteration's result as degraded rather than feeding a silently-incomplete gradient into the optimizer as if nothing happened.

## Key terms

| Term | Meaning |
|---|---|
| Partial shot completion | A job that errors out partway through execution, returning results for fewer shots than requested |
| Circuit validation failure | A pre-queue rejection because the submitted circuit violates device constraints — a classical code bug, not a hardware issue |
| Billed failure | A failed or cancelled job that still incurs a provider's per-task or per-shot fee |
| Retryable failure | A failure mode (queue timeout, transient network error, device offline) where resubmission is likely to succeed |
| Degraded iteration | An optimization loop iteration explicitly flagged as using incomplete/lower-confidence data, rather than silently treated as normal |

## Check yourself

A job fails with a circuit validation error on its first attempt. Your orchestration code's generic retry handler resubmits it automatically three times before giving up. Using the decision table, explain what's wrong with this behavior and what the orchestration code should do instead.
