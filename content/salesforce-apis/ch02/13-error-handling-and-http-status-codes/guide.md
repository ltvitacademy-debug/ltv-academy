# Lesson 13 — Error Handling and HTTP Status Codes

**Chapter 2 · Using the APIs · Lesson 13 of 22**

## What you'll learn

- The error response shape: always a JSON array, even for one error
- The most common status codes you'll actually see, and what each one means
- `errorCode` values worth recognizing by name
- A sane retry strategy, and what you should never just retry blindly

## The error response shape

Whenever a Salesforce REST call fails, the response body is a **JSON array** of error objects — always an array, even when there's exactly one error:

```json
[
  {
    "message": "Required fields are missing: [LastName]",
    "errorCode": "REQUIRED_FIELD_MISSING",
    "fields": ["LastName"]
  }
]
```

Code that assumes the error body is a single object instead of an array will break the first time Salesforce returns more than one error for a single request — always parse it as an array.

## Common status codes

| Code | Meaning | Typical cause |
|---|---|---|
| `200 OK` | Success | A successful GET |
| `201 Created` | Success | A successful POST (create) |
| `204 No Content` | Success | A successful PATCH or DELETE |
| `400 Bad Request` | Client error | Malformed request, bad field value, failed validation |
| `401 Unauthorized` | Client error | Missing or invalid access token (`INVALID_SESSION_ID`) |
| `403 Forbidden` | Client error | Insufficient permissions, or `REQUEST_LIMIT_EXCEEDED` |
| `404 Not Found` | Client error | The record ID or resource URL doesn't exist |
| `405 Method Not Allowed` | Client error | Wrong HTTP verb for that resource |
| `415 Unsupported Media Type` | Client error | Missing or wrong `Content-Type` header |
| `500 Internal Server Error` | Server error | Something failed on Salesforce's side |

## Recognizing common `errorCode` values

The HTTP status code tells you the category of failure; `errorCode` tells you specifically what went wrong. A `401` almost always pairs with `INVALID_SESSION_ID` — your token expired or was never valid. A `403` can mean either an org-wide `REQUEST_LIMIT_EXCEEDED` (Lesson 14) or a field/object-level permission denial like `INSUFFICIENT_ACCESS_ON_CROSS_REFERENCE_ENTITY`. A `400` frequently pairs with `REQUIRED_FIELD_MISSING` or `MALFORMED_ID` (an ID that isn't the right length or format for the object you're querying).

## A sane retry strategy

Not every failure should be retried, and treating them all the same is itself a bug:

- **Retry with backoff**: a transient `500` or a `403` specifically carrying `REQUEST_LIMIT_EXCEEDED` (wait before retrying, don't hammer the API immediately).
- **Refresh the token and retry once**: a `401` with `INVALID_SESSION_ID` — get a new access token (Lesson 7's refresh token flow), then retry the original call exactly once.
- **Never blindly retry**: a `400` with `REQUIRED_FIELD_MISSING` — the request itself is wrong, and retrying the identical payload will fail identically every time. Fix the payload first.

Distinguishing "this failed because something was temporarily wrong with the system" from "this failed because the request itself is wrong" is the core judgment call behind any reasonable error-handling logic.

## Key terms

| Term | Meaning |
|---|---|
| Error response array | The JSON array shape of every REST API error body, even for a single error |
| `errorCode` | A specific machine-readable code identifying what went wrong, more precise than the HTTP status alone |
| `INVALID_SESSION_ID` | The errorCode typically paired with a 401, meaning the access token is missing or expired |
| `REQUEST_LIMIT_EXCEEDED` | The errorCode typically paired with a 403 when an org has hit its API request allocation |
| Retry with backoff | Waiting progressively longer between retries of a transient failure, rather than retrying immediately |

## Lab

For each of these three error responses, state the HTTP status code you'd expect, what likely caused it, and whether your integration should retry the exact same request, retry after refreshing a token, or not retry at all without first fixing something: (1) `[{"errorCode": "INVALID_SESSION_ID", "message": "Session expired or invalid"}]`; (2) `[{"errorCode": "REQUIRED_FIELD_MISSING", "message": "Required fields are missing: [Name]", "fields": ["Name"]}]`; (3) `[{"errorCode": "REQUEST_LIMIT_EXCEEDED", "message": "TotalRequests Limit exceeded."}]`.

## Check yourself

Can you explain why the error response body is always a JSON array, even for a single error, and why that matters for how you parse it? Can you name which of the three error scenarios in the Lab above should never be retried without changing something first, and why?