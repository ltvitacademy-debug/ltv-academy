# Lesson 14 — Handling API Errors & Retries

**Chapter 3 · Working With AI Provider APIs · Lesson 14 of 22**

## What you'll learn

- The real HTTP status codes Anthropic's API returns, and what each means
- The real JSON shape of an error response
- Which errors are worth retrying, and which ones never will succeed
- Exponential backoff — the real strategy official SDKs use

## The real error shape

Every error comes back as JSON with a top-level `error` object, plus a
`request_id` you'd quote to support if you needed to:

```json
{
  "type": "error",
  "error": {
    "type": "not_found_error",
    "message": "The requested resource could not be found."
  },
  "request_id": "req_011CSHoEeqs5C35K2UUqR7Fy"
}
```

## The real status codes

| Status | Error type | What it means |
|---|---|---|
| 400 | `invalid_request_error` | Something's wrong with your request body |
| 401 | `authentication_error` | Bad, missing, or expired API key |
| 403 | `permission_error` | Your key lacks permission for this resource |
| 404 | `not_found_error` | The resource doesn't exist |
| 413 | `request_too_large` | Request exceeds the size limit (32 MB for Messages) |
| 429 | `rate_limit_error` | You've hit a rate limit or spend cap |
| 500 | `api_error` | An unexpected error inside Anthropic's systems |
| 529 | `overloaded_error` | The API is temporarily overloaded |

## Which errors are worth retrying

This is the part that actually matters: **retrying a 400 or a 401 will
never succeed.** Your request body is malformed, or your key is bad — doing
the exact same thing again produces the exact same failure. Only retry
errors that are genuinely *transient*: connection errors, `429` rate
limits, and `5xx`-class errors (`500`, `529`). Retrying anything else just
wastes time and API calls.

## Exponential backoff

The official SDKs retry transient failures automatically — twice, by
default — using **exponential backoff**: wait a little after the first
failure, wait longer after the second, and so on, rather than hammering a
struggling server immediately. They also honor a `retry-after` header when
the API includes one, which tells you exactly how long to wait:

```python
import time

for attempt in range(3):
    try:
        return call_api()
    except TransientError:
        if attempt == 2:
            raise
        time.sleep(2 ** attempt)  # 1s, 2s, 4s
```

## Key terms

| Term | Meaning |
|---|---|
| `request_id` | Unique ID in every response; include it in support requests |
| Transient error | A temporary failure (rate limit, server error) worth retrying |
| Exponential backoff | Waiting progressively longer between retry attempts |
| `retry-after` header | The API's own guidance on how long to wait before retrying |

## Lab

Without a real API key, write the retry loop by hand: given a mock
`call_api()` that raises a `RateLimitError` the first two times and
succeeds the third, make your loop retry with exponential backoff and
print each wait time.

## Check yourself

A request fails with a `401`. Should your code retry it automatically?
What about a `529`? Explain the difference in your own words.
