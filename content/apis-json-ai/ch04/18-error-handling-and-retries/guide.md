# Lesson 18 — Error Handling & Retries

**Chapter 4 · Building a Simple API Wrapper · Lesson 18 of 22**

## What you'll learn

- Turning Lesson 14's error knowledge into real code inside your client
- Defining your own exception types for the errors callers actually care about
- Wrapping `send_message` with a retry loop for transient failures
- Why retry logic belongs on the class, not copy-pasted into every caller

## Giving errors real names

Lesson 14 covered the real status codes Anthropic's API returns. A client
class turns that knowledge into exceptions callers can actually catch,
instead of making every caller inspect raw status codes themselves:

```python
class RateLimitError(Exception):
    pass

class APIError(Exception):
    def __init__(self, status_code, message):
        super().__init__(message)
        self.status_code = status_code
```

## Wrapping the call with retry logic

Now `send_message` can retry the errors Lesson 14 identified as
transient — `429` and `5xx` — while raising immediately on anything else:

```python
import time

def send_message(self, model, messages, max_tokens=1024):
    for attempt in range(3):
        resp = self.session.post(f"{self.base_url}/v1/messages",
            json={"model": model, "messages": messages,
                  "max_tokens": max_tokens})
        if resp.status_code == 429 or resp.status_code >= 500:
            if attempt < 2:
                time.sleep(2 ** attempt)
                continue
            raise RateLimitError("Retries exhausted")
        resp.raise_for_status()
        return resp.json()
```

## Why this lives on the class, not the caller

Without this, every single place in your codebase that calls the API
needs its own copy of this retry loop — and when one copy has a bug, the
others probably do too. With it on the client, callers just write
`client.send_message(...)` and get resilience for free, consistently,
everywhere.

## What callers do with it

A caller now has a clean, specific exception to catch — no need to know
raw status codes at all:

```python
try:
    reply = client.send_message("claude-sonnet-5", messages)
except RateLimitError:
    print("Still rate-limited after retries — try again later.")
```

## Key terms

| Term | Meaning |
|---|---|
| Custom exception | An application-defined error type callers can catch by name |
| Transient error | 429 / 5xx — worth retrying, per Lesson 14 |
| Retry loop | Logic inside the client that retries, with backoff, before failing |
| `continue` | Skips to the next loop iteration — here, the next retry attempt |

## Lab

Extend the retry loop above so it also catches `requests.ConnectionError`
(a dropped network connection) as a retryable failure, alongside `429` and
`5xx` status codes.

## Check yourself

Why is it better for `send_message` to raise a `RateLimitError` than to
return `None` or an empty dictionary when retries run out?
