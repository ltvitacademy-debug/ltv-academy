# Lesson 19 — Rate Limiting & Backoff

**Chapter 4 · Building a Simple API Wrapper · Lesson 19 of 22**

## What you'll learn

- The real rate-limit response headers Anthropic's API sends on every call
- The token bucket algorithm the API actually uses to enforce limits
- Reading `retry-after` instead of guessing a wait time
- Proactive throttling: staying under the limit instead of just reacting to it

## The real headers

Lesson 18 reacted to a `429` after it happened. But Anthropic's API tells
you your standing on *every* response, success or not, through real
headers:

```
anthropic-ratelimit-requests-remaining: 50
anthropic-ratelimit-requests-reset: 2026-10-05T14:32:00Z
anthropic-ratelimit-tokens-remaining: 18000
retry-after: 12
```

`-remaining` tells you how much headroom is left before the next reset;
`-reset` tells you exactly when it refills. `retry-after` only appears on
a `429` itself, and it's the number of seconds the API is telling you to
wait — no guessing required.

## Token bucket, not a fixed window

Anthropic's own docs describe the real algorithm: a **token bucket**. Your
capacity continuously refills up to a maximum, rather than resetting all
at once on a timer. Picture a bucket draining one unit per request and
refilling steadily — it smooths bursts instead of letting you spend your
entire allowance in the first second of every minute.

## Reading retry-after instead of guessing

Lesson 18's backoff guessed 1, 2, 4 seconds. When the API gives you a real
number, use it instead of guessing:

```python
resp = self.session.post(url, json=body)
if resp.status_code == 429:
    wait = int(resp.headers.get("retry-after", 2 ** attempt))
    time.sleep(wait)
```

## Proactive throttling

The most resilient clients don't just react — they watch
`anthropic-ratelimit-requests-remaining` and slow themselves down *before*
hitting zero, instead of waiting to get a `429` back at all:

```python
remaining = int(resp.headers.get(
    "anthropic-ratelimit-requests-remaining", 999))
if remaining < 5:
    time.sleep(1)  # ease off before you actually get limited
```

## Key terms

| Term | Meaning |
|---|---|
| Token bucket | Capacity refills continuously, rather than resetting on a timer |
| `retry-after` | Real header on a 429, telling you exactly how long to wait |
| `*-remaining` | Real header showing current headroom before the next limit |
| Proactive throttling | Slowing down before hitting a limit, not just reacting after |

## Lab

Extend the `send_message` method from Lesson 18 to read
`anthropic-ratelimit-requests-remaining` from every successful response,
and sleep briefly whenever it drops below 5.

## Check yourself

What's the real difference between reacting to a `429` (Lesson 18) and
proactive throttling using `-remaining` headers (this lesson)?
