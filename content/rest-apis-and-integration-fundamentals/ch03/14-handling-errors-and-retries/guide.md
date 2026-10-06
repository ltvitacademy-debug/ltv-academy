# Lesson 14 — Handling Errors and Retries

**Chapter 3 · Authentication and Security · Lesson 14 of 19**

## What you'll learn

- The real JSON shape of an Oracle Fusion REST API error response
- Which status codes are worth retrying, and which never will succeed unchanged
- What exponential backoff is and why it beats retrying immediately
- Why o:errorCode matters when escalating an issue

## The real error shape

Oracle Fusion's REST API returns a consistent error structure across
nearly every resource:

```json
{
  "title": "Bad Request",
  "status": 400,
  "detail": "The value US_LE for attribute LegislationCode is invalid.",
  "o:errorCode": "FND_CMN_VALIDATION_ERROR"
}
```

- `title` — a short summary of the error category.
- `status` — the HTTP status code.
- `detail` — a specific, human-readable explanation of what went
  wrong.
- `o:errorCode` — an Oracle-specific application error code, worth
  quoting when escalating to support or a developer. More complex
  errors can also include an `o:errorDetails` array with a
  hierarchical breakdown.

## Which errors are worth retrying

This is the part that actually changes behavior: **retrying a 400 or
401 will never succeed.** The request body is malformed, or the
credentials are bad — sending the identical request again produces
the identical failure. The same is true of a 404: the resource simply
doesn't exist.

Only retry errors that are genuinely **transient**:

| Status | Worth retrying? |
|---|---|
| 400 / 401 / 403 | No — fix the request or credentials first |
| 404 | No — the resource doesn't exist |
| 429 (rate limit) | Yes |
| 500 / 503 (server-side) | Yes |

## Exponential backoff

```python
for attempt in range(3):
    try:
        return call_fusion_api()
    except TransientError:
        if attempt == 2:
            raise
        time.sleep(2 ** attempt)  # 1s, 2s, 4s
```

Rather than retrying immediately (which can make a struggling server
worse), wait progressively longer between attempts — **exponential
backoff**. This is the same strategy well-built integration tools
apply automatically for transient failures.
## Key terms

| Term | Meaning |
|---|---|
| o:errorCode | An Oracle-specific application error code, useful when escalating an issue |
| Transient error | A temporary failure (rate limit, server error) that's worth retrying |
| Exponential backoff | Waiting progressively longer between retry attempts |
| o:errorDetails | An array of hierarchical error details on more complex failures |

## Check yourself

An integration keeps retrying a failed call every second for an hour, and it's still a 400 every time. Explain why this retry logic is wrong, and what it should do instead.
