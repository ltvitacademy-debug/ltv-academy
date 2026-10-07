# Script — Idempotency and Retries

## Segment 1 (title)

Lesson nine showed that real delivery guarantees mostly reduce to at-least-once plus deduplication, and lesson ten showed failure can only ever be inferred, which is exactly why systems retry at all. This lesson covers what makes retries safe — idempotency — and the strategy that keeps retrying itself from becoming a new source of failure.

## Segment 2 (steps)

An operation is idempotent if doing it five times has the same effect as doing it once. "Set my balance to $100" is idempotent. "Add $100 to my balance" is not — do that five times and you've added $500. That matters because if a caller gets no response, it genuinely can't tell whether the request failed or just the response got lost. Retry a non-idempotent operation to be safe, and you might charge someone twice.

## Segment 3 (code)

The fix is an idempotency key: the client generates one unique ID per logical operation, not per network attempt, and sends it along. The server remembers which keys it's already handled, and if the same key comes in again, it just replays the stored result instead of redoing the work. That's the exact deduplication mechanism behind real-world "exactly-once" delivery.

## Segment 4 (steps)

Idempotency makes retrying safe, but not free. If a shared dependency briefly slows down and every client that failed retries immediately, they all hit it again at the same instant — a retry storm, or thundering herd — which can turn a minor blip into a full outage.

## Segment 5 (steps)

The standard defense is exponential backoff: wait longer after each failure — one second, then two, then four, then eight — instead of hammering the dependency at a constant rate. But if everyone backs off on the same schedule, they still retry in lockstep. Jitter, a small random variation added to each wait, is what actually spreads retries apart instead of just delaying the pile-up.

## Segment 6 (outro)

Idempotency keys and backoff with jitter are what make retries safe rather than a second outage — and that closes out this chapter on consistency and communication. Next, lesson twelve starts chapter three: applying everything in this course to a concrete setting, starting with Salesforce.
