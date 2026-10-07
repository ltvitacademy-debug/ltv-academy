# Idempotency and Retries

Lesson 9 showed that most real delivery guarantees reduce to at-least-once plus deduplication, and Lesson 10 showed that failure can only ever be inferred, which is exactly why systems retry in the first place. This lesson closes the chapter by covering the property that makes retries safe — idempotency — and the retry strategy that keeps retries themselves from becoming a new source of failure.

## What you'll learn

- What it means for an operation to be idempotent
- Why retrying a non-idempotent operation can duplicate its effect
- How idempotency keys let a server safely deduplicate retried requests
- Exponential backoff with jitter, and why naive immediate retries cause retry storms

## Idempotent operations

An operation is **idempotent** if performing it multiple times has exactly the same effect as performing it once. "Set my account balance to $100" is idempotent — running it five times leaves the balance at $100. "Add $100 to my account balance" is *not* idempotent — running it five times adds $500. This distinction matters enormously once you introduce retries: Lesson 6 showed that a caller who gets no response genuinely cannot tell whether its request succeeded and only the *response* was lost. If the caller retries a non-idempotent "add $100" operation to be safe, and the first attempt actually did succeed, the customer is now charged — or credited — twice.

## Idempotency keys

The standard fix is an **idempotency key**: the client generates a unique identifier for a specific logical operation (not for each network attempt) and sends it along with the request. The server remembers which idempotency keys it has already processed and, if it sees the same key again, returns the original result without re-executing the operation. This turns even a naturally non-idempotent operation like "charge this card" into something safe to retry: the first attempt executes the charge; every retry with the same key just replays the same recorded outcome. This is precisely the deduplication mechanism that Lesson 9 described as the missing piece behind real-world "exactly-once" delivery.

## Why naive retries are dangerous: retry storms

Idempotency makes it *safe* to retry, but it doesn't make retrying *free*. If every client retries immediately after a failure, and many clients fail at once (say, because a shared dependency briefly slowed down), all of them retry at the same instant — a **retry storm** (also called the thundering herd problem) that can overwhelm the very dependency that was only briefly struggling, turning a minor blip into a full outage.

## Exponential backoff with jitter

The standard defense is **exponential backoff**: after each failed attempt, wait longer before retrying — for example, 1 second, then 2, then 4, then 8 — so repeated failures don't hammer the dependency at a constant rate. But if many clients fail at the same moment and all back off on the exact same schedule, they'll still retry in lockstep. Adding **jitter** — a small random amount added to or subtracted from each wait time — spreads those retries out over time instead of letting them bunch up, which is what actually prevents the retry storm rather than just delaying it.

## Key terms

- **Idempotent operation** — an operation whose effect is the same whether it runs once or many times
- **Idempotency key** — a client-generated unique ID the server uses to detect and safely ignore duplicate retries of the same logical operation
- **Retry storm (thundering herd)** — many clients retrying at the same moment, overwhelming a recovering dependency
- **Exponential backoff** — increasing the wait time between successive retries
- **Jitter** — randomness added to backoff timing so retries don't bunch up in lockstep

## Recap

Retries are necessary because failure can only be inferred, never confirmed — and idempotency keys plus exponential backoff with jitter are what make those retries safe and non-destructive rather than a second source of outages. That closes out Chapter 2's look at consistency and communication. Next, in Lesson 12, Chapter 3 begins applying everything from this course to a concrete setting: distributed systems concepts as they show up inside Salesforce.
