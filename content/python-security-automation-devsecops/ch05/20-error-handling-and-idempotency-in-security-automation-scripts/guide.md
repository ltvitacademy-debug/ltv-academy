# Lesson 20 — Error Handling and Idempotency in Security Automation Scripts

**Chapter 5 · Security Orchestration Across Tools · Lesson 4 of 4**

## What you'll learn

- Why a security automation script needs to treat failure as the
  normal case, not the exception
- How to tell a transient error apart from a permanent one, and why
  retrying blindly makes things worse
- How to implement **retry with exponential backoff** correctly
- How **idempotency keys** let a retried action run safely without
  double-executing a real-world side effect
- How to structure error logs so an on-call analyst can actually act
  on them

## Treat failure as the normal case

Every script in this chapter has called an external system: a
webhook sender, a ticketing API, Teams, Slack. Every one of those
calls can fail in ways that have nothing to do with your code —
a network blip, a service deploying a new version at the wrong
moment, a rate limit, a request that legitimately takes longer than
the sender's timeout. A security automation script that only has a
happy path isn't incomplete, it's actively dangerous: a silently
swallowed exception in the middle of a playbook can leave a case half
updated, a block action half applied, or an alert that nobody ever
actually saw. The goal of this lesson is to make failure a handled,
expected branch of the code, not a crash.

## Transient vs. permanent errors

Not every failure deserves the same response. A `503 Service
Unavailable` or a connection timeout is usually **transient** — the
same request will probably succeed if you try again in a few seconds.
A `401 Unauthorized` or a `400 Bad Request` is usually **permanent**
for that exact request — your credentials are wrong, or your payload
is malformed, and retrying the identical request will fail the exact
same way every time. Retrying a permanent error doesn't just waste
time, it can also trip rate limits or alerting on the receiving
system. The first job of good error handling is sorting incoming
failures into those two buckets before deciding what to do next.

```python
import requests

def is_retryable(exc: Exception) -> bool:
    if isinstance(exc, requests.Timeout):
        return True
    if isinstance(exc, requests.HTTPError):
        status = exc.response.status_code
        return status in (429, 500, 502, 503, 504)
    return False
```

## Retrying with exponential backoff

Once you know a failure is retryable, retrying immediately is still a
mistake — if the remote service is overloaded, an instant retry just
adds to the load that caused the failure in the first place.
**Exponential backoff** waits progressively longer between attempts,
and adding a small random jitter stops many failed callers from
retrying in lockstep:

```python
import time
import random

def call_with_backoff(func, *args, max_attempts=5, **kwargs):
    for attempt in range(1, max_attempts + 1):
        try:
            return func(*args, **kwargs)
        except Exception as exc:
            if not is_retryable(exc) or attempt == max_attempts:
                raise
            delay = min(2 ** attempt, 30) + random.uniform(0, 1)
            time.sleep(delay)
```

Each failed attempt doubles the wait (capped at 30 seconds here) and
adds up to a second of jitter, so attempt three waits around 8-9
seconds rather than a fixed interval. A non-retryable exception, or
the final attempt, re-raises immediately instead of burning through
the rest of the budget on a request that was never going to succeed.

## Idempotency keys for real-world side effects

Backoff solves *when* to retry, but retrying anything that has a
real-world side effect — creating a ticket, blocking an IP, posting a
chat message — raises the same question Lesson 17 raised for webhook
delivery: what if the first attempt actually succeeded, and only the
response got lost before your code saw it? An **idempotency key** is
a value you generate once per logical action and send with every
retry of that same action; a well-built API uses the key to recognize
"I've already done this exact thing" and return the original result
instead of doing it again.

```python
import uuid

def block_ip(ip_address: str, idempotency_key: str | None = None) -> dict:
    key = idempotency_key or str(uuid.uuid4())
    resp = requests.post(
        "https://firewall.internal.example.com/api/blocks",
        json={"ip": ip_address},
        headers={"Idempotency-Key": key, "Authorization": f"Bearer {API_TOKEN}"},
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json()
```

Generate the key once, outside the retry loop, and pass the same key
into every attempt of that same logical call — `call_with_backoff`
should retry the whole function with the same key, never mint a new
one per attempt, or the key stops protecting against anything.

## Structured logging an analyst can act on

A `print()` statement buried in a try/except tells no one anything
when a playbook fails at 3 a.m. Structured, JSON-formatted error logs
let an on-call analyst — or a log aggregator — filter and alert on
exactly the failures that matter:

```python
import json
import logging

logger = logging.getLogger("security_automation")

def log_failure(step: str, event_id: str, exc: Exception) -> None:
    logger.error(json.dumps({
        "step": step,
        "event_id": event_id,
        "error_type": type(exc).__name__,
        "error_message": str(exc),
        "retryable": is_retryable(exc),
    }))
```

Logging the `event_id` alongside the error means a human can trace
one alert's entire journey — webhook received, ticket created, Slack
message sent, block applied — across every log line it touched, which
is exactly what you need when a playbook fails partway through and
someone has to figure out, by hand, how far it actually got.

## Key terms

| Term | Meaning |
|---|---|
| Transient error | A failure likely to succeed on retry (timeout, 503, rate limit) |
| Permanent error | A failure that will recur on an identical retry (bad credentials, malformed request) |
| Exponential backoff | Waiting progressively longer between retries, with jitter, instead of retrying immediately or at a fixed interval |
| Idempotency key | A value sent with every retry of one logical action so a well-built API returns the original result instead of repeating the side effect |

## Check yourself

This closes Chapter 5. You're ready for Chapter 6 when you can explain,
without looking: why does retrying a permanent error (like a 401) make
things worse rather than better, and why must an idempotency key be
generated once outside the retry loop rather than freshly on every
attempt?
