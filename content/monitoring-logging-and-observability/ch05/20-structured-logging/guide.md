# Structured Logging

A log line that reads `ERROR checkout failed for user` is almost useless at 2 a.m. during an incident — useless not because it's wrong, but because it isn't searchable. Which user? Which order? Which request? **Structured logging** means writing every log entry as a consistent, machine-parseable record (almost always JSON) with named fields, instead of a free-form sentence. It's the foundation everything else in this chapter builds on: you can't centralize, search, or correlate logs you can't parse.

## What you'll learn

- Why plain-text log lines break down the moment you have more than one server
- The anatomy of a well-formed structured log line
- Log levels, and how to use them so alerts don't drown in noise
- Why a **correlation ID** (and later, a trace ID) is the single most valuable field you can add

## The problem with plain-text logs

A traditional log line looks like this:

```
2026-10-06 14:32:07 ERROR Checkout failed for user 48213, order 991820: payment gateway timeout after 30000ms
```

A human can read that. A log search tool can only grep it. If Northbridge Retail's checkout service is running on twelve autoscaled pods during a flash sale, and you need every failed checkout in the last five minutes where the payment gateway timed out, you're left writing fragile regular expressions against a format that might change the next time someone edits the log statement.

## Structured logs: the same information, as data

```json
{"timestamp":"2026-10-06T14:32:07.481Z","level":"error","service":"checkout","event":"payment_timeout","user_id":48213,"order_id":991820,"gateway":"stripe","timeout_ms":30000,"trace_id":"a1b2c3d4e5f6a7b8","message":"Checkout failed: payment gateway timeout"}
```

Same information, but now every field is a key you can filter, aggregate, or chart on: `level:error AND event:payment_timeout AND gateway:stripe`. This is what makes centralized log search (next lesson) actually useful — a search index needs fields, not sentences.

A few conventions worth adopting as defaults:

- **`timestamp`** in ISO 8601 with milliseconds, always UTC — never rely on server-local time across a fleet
- **`level`** — a small fixed set (`debug`, `info`, `warn`, `error`, `fatal`), lowercase, consistent across every service
- **`service`** — which component emitted the line, so you can filter one service out of a shared index
- **`message`** — a short human-readable summary, kept even in structured logs because humans still read these
- One JSON object **per line** (newline-delimited JSON), never pretty-printed with embedded newlines — log shippers read line by line

## Log levels: what belongs where

| Level | Use it for | Northbridge example |
|---|---|---|
| `debug` | Verbose detail, off in production by default | Full request/response payload for a cart update |
| `info` | Normal operation worth recording | Checkout started, order placed |
| `warn` | Recoverable but worth noticing | Payment gateway retried once, succeeded |
| `error` | An operation failed | Checkout failed: payment gateway timeout |
| `fatal` | The process cannot continue | Service can't reach its database on startup |

The discipline that pays off: if every `error` line in Northbridge's checkout service represents an actual failed checkout, an alert on "error rate" is trustworthy. If `error` is used loosely for anything mildly unexpected, the signal drowns in noise and nobody trusts the alert — this is the same alert-fatigue problem Chapter 6 covers in depth, and it starts here, at the log statement.

## Correlation IDs: the field that makes everything else possible

A single checkout request at Northbridge might touch the checkout service, the inventory service, the payment service, and the notification service — each one logging independently. Without something tying those log lines together, reconstructing "what happened to this one request" means guessing from timestamps.

A **correlation ID** (sometimes called a request ID) is a unique value generated once, at the edge of the system, and passed through every downstream call — usually as an HTTP header like `x-correlation-id` — and included in every log line any service writes while handling that request:

```json
{"timestamp":"2026-10-06T14:32:06.112Z","level":"info","service":"checkout","event":"checkout_started","correlation_id":"req-9f31-4c02","user_id":48213}
{"timestamp":"2026-10-06T14:32:06.340Z","level":"info","service":"inventory","event":"stock_reserved","correlation_id":"req-9f31-4c02","sku":"NB-4471"}
{"timestamp":"2026-10-06T14:32:07.481Z","level":"error","service":"checkout","event":"payment_timeout","correlation_id":"req-9f31-4c02","order_id":991820}
```

Search any log index for `correlation_id:"req-9f31-4c02"` and you get the full story across every service that touched this one request, in order. Lesson 22 introduces the OpenTelemetry **trace ID**, which does the same job but standardized and automatically propagated — but the underlying idea is identical, and plenty of production systems still rely on a hand-rolled correlation ID exactly like this one.

## Key terms

- **Structured logging** — writing log entries as machine-parseable records (typically JSON) with named fields, rather than free-form text
- **Newline-delimited JSON (NDJSON)** — one JSON object per line, the standard shape log shippers expect
- **Log level** — a severity label (`debug`/`info`/`warn`/`error`/`fatal`) used to filter and alert
- **Correlation ID** — a unique identifier generated per request and propagated through every service that handles it, so its log lines can be reassembled later
