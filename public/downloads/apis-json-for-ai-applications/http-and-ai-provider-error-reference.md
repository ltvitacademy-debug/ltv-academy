# HTTP & AI Provider Error Code Reference

## The five HTTP methods (Lesson 3)

| Method | Means | Idempotent? |
|---|---|---|
| `GET` | Read a resource — never changes anything | Yes |
| `POST` | Create a new resource | No |
| `PUT` | Replace a resource entirely | Yes |
| `PATCH` | Partially update a resource | No (usually) |
| `DELETE` | Remove a resource | Yes |

## General HTTP status classes (Lesson 3)

```
1xx — informational   (rare; "request received, continuing")
2xx — success          (the request worked)
3xx — redirection      (go look somewhere else)
4xx — client error     (you did something wrong)
5xx — server error     (the server did something wrong)
```

## Anthropic's real status codes and whether to retry (Lesson 14)

| Status | Error type | What it means | Retry? |
|---|---|---|---|
| 400 | `invalid_request_error` | Something's wrong with your request body | **No** — fix the request |
| 401 | `authentication_error` | Bad, missing, or expired API key | **No** — fix the key |
| 403 | `permission_error` | Your key lacks permission for this resource | **No** — fix permissions |
| 404 | `not_found_error` | The resource doesn't exist | **No** — fix the URL/ID |
| 413 | `request_too_large` | Request exceeds the size limit (32 MB for Messages) | **No** — shrink the request |
| 429 | `rate_limit_error` | You've hit a rate limit or spend cap | **Yes** — back off, honor `retry-after` |
| 500 | `api_error` | An unexpected error inside Anthropic's systems | **Yes** — transient |
| 529 | `overloaded_error` | The API is temporarily overloaded | **Yes** — transient |

**The one rule that matters most:** only retry what's genuinely
transient — `429` and `5xx`-class errors. Retrying a `400` or `401`
produces the exact same failure every time, because the problem is in
your request or your credentials, not in the server's current state.

## The real error response shape

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

Always log `request_id` alongside any error you handle — it's what
support needs if the failure ever needs to be escalated.
