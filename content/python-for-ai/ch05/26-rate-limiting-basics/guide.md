# Rate Limiting, Basics

**Chapter 5 · Working With APIs in Python · Lesson 26 of 37**

This chapter's closing lesson covers what happens when you call an API too often: every AI provider caps how many requests you can make in a given window, and calling too fast gets you a specific, recognizable error rather than a silent failure. This lesson covers recognizing it and responding correctly.

## What you'll learn

- What a 429 status code means and why providers rate-limit
- The `Retry-After` header, and how to honor it
- Exponential backoff — the standard retry strategy
- A complete retry loop combining everything from this chapter

## HTTP 429 — Too Many Requests

When you exceed a provider's allowed request rate, the response isn't a crash — it's a normal HTTP response with status code 429.

```python
response = requests.post(url, json=payload, headers=headers, timeout=10)
if response.status_code == 429:
    print("Rate limited — need to slow down and retry.")
```

Rate limits exist to keep a shared service usable for everyone, not just to be annoying — a well-behaved client backs off rather than hammering the API harder.

## Reading `Retry-After`

Many APIs tell you exactly how long to wait before trying again, in a `Retry-After` header (seconds):

```python
import time

if response.status_code == 429:
    wait_seconds = int(response.headers.get("Retry-After", 5))
    time.sleep(wait_seconds)
```

`.get("Retry-After", 5)` falls back to a 5-second default if the header isn't present — not every API sends it.

## Exponential backoff

When `Retry-After` isn't available, the standard strategy is **exponential backoff**: wait a little after the first failure, then progressively longer after each repeated one, instead of retrying at a fixed interval that might hit the same limit again immediately.

```python
import time
import requests

def call_with_backoff(url, payload, headers, max_retries=4):
    wait = 1
    for attempt in range(max_retries):
        response = requests.post(url, json=payload, headers=headers, timeout=10)
        if response.status_code != 429:
            return response
        time.sleep(wait)
        wait *= 2   # 1s, 2s, 4s, 8s...
    raise RuntimeError("Still rate-limited after max retries")
```

Doubling the wait each time (`wait *= 2`) means early retries happen quickly, in case the limit clears fast, while later retries space themselves out if the service is genuinely under sustained load.

## Putting the chapter together

A real production call combines this lesson with Lessons 23–25: parameters and a JSON body, an `Authorization` header, a `timeout`, `raise_for_status()` for non-429 errors, and a backoff loop specifically for 429s. That combination — not any single piece alone — is what a reliable AI API client actually looks like.

## Recap

- A 429 status means you've been rate-limited — a normal response, not a crash.
- `Retry-After` tells you exactly how long to wait, when the API provides it.
- Exponential backoff (doubling the wait after each retry) is the standard fallback strategy.
- A production-ready client combines query/body params, headers, timeout, status handling, and backoff together.
- Chapter 5 complete — Chapter 6 moves to async Python, for calling multiple AI APIs concurrently instead of one at a time.
