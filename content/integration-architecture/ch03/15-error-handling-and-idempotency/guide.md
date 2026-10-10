# Lesson 15 — Error Handling and Idempotency

**Chapter 3 · Reliability and Operations · Lesson 15 of 28**

## What you'll learn

- Why "the response was lost, not the request" is the central ambiguity every integration failure has to account for
- What idempotency means precisely, and why it's the direct answer to that ambiguity
- How to design an idempotent operation using an idempotency key, with a worked example
- Why not every operation can be made idempotent, and what to do about the ones that can't

## The ambiguity every integration failure shares

An integration call fails or times out. The calling system now has to decide what to do next — and it faces a genuine ambiguity it usually can't resolve from the failure alone: did the remote system never receive the request at all, did it receive the request but fail before completing it, or did it actually complete the request successfully and only the *response* got lost on the way back? These three situations call for completely different reactions (safe to retry, safe to retry, and dangerous to retry, respectively), and from the caller's side, a timeout or dropped connection looks identical in all three cases. This ambiguity — did it actually happen, or not? — is the single most important problem Chapter 3 exists to solve, and idempotency is the architectural answer to it.

## Idempotency: making "maybe it happened twice" harmless

An operation is **idempotent** if performing it multiple times produces the exact same result as performing it once. Setting a field to a fixed value is naturally idempotent — setting Status to "Shipped" twice leaves the record in exactly the same state as setting it once. Incrementing a counter, or creating a new record every time the operation runs, is naturally **not** idempotent — running it twice produces a different, wrong result (the counter is too high, or there are two duplicate records instead of one). The entire point of designing for idempotency is that it makes the ambiguity above irrelevant: if an operation is genuinely idempotent, it's always safe to retry after an ambiguous failure, because even if the first attempt actually succeeded, retrying it causes no harm.

## Designing idempotency with an idempotency key

Most real-world operations aren't naturally idempotent on their own — "create an order" run twice naturally creates two orders. The standard fix is an **idempotency key**: the caller generates a unique identifier for a specific logical operation (not for each HTTP attempt, but for the *business action* being attempted) and includes it with the request. The receiving system checks whether it has already processed a request with that exact key. If it has, it returns the same result it returned the first time without repeating the underlying work a second time; if it hasn't, it performs the operation and records that this key has now been handled. Concretely: a Salesforce integration pushing a new Order to an external billing system generates a unique key per order (an order ID, or a UUID generated once when the order is first created) and sends it with every attempt, including retries. The billing system stores which keys it has already processed; a retried request with a key it recognizes returns the prior result instead of creating a second, duplicate charge.

## Not everything can be made idempotent

Some operations genuinely resist idempotency — a request that triggers an irreversible external side effect with no way to check "has this already happened" (certain legacy systems with no lookup mechanism at all, or a one-way notification to a system that can't be queried back) can't be made safely retryable through this mechanism alone. For operations like this, the architect's options narrow: either invest in giving the remote system a way to check prior execution (even a simple processed-keys log), accept that retries carry real risk and require a human review step instead of automatic retry, or redesign the interaction so the risky, non-idempotent step happens only after an earlier, safely-retryable confirmation step has already succeeded. The discipline is recognizing which category an operation falls into *before* building its retry logic (Lesson 16), rather than discovering during an incident that a "safe" automatic retry just created a duplicate charge or a duplicate shipment.

## Key terms

| Term | Meaning |
|---|---|
| Idempotency | The property that performing an operation multiple times produces the same result as performing it once |
| Idempotency key | A unique identifier for a specific business operation, used by the receiving system to detect and ignore duplicate attempts |
| Ambiguous failure | A failure where the caller cannot tell whether the request was never received, failed before completing, or completed but lost its response |

## Lab

A payments integration sends a "charge customer $500" request to a payment gateway. The request times out with no response. Using this lesson's framework, explain the three possible real outcomes behind that timeout, describe exactly how an idempotency key would let the integration safely retry the charge without risking a duplicate $500 charge, and identify what specific information the payment gateway needs to store to make that guarantee actually work.

## Check yourself

Can you define idempotency precisely and give one example each of a naturally idempotent and a naturally non-idempotent operation? Can you explain, step by step, how an idempotency key resolves the ambiguity of an unknown-outcome failure?
