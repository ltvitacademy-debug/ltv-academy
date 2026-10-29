# Lesson 2 — Structured Logging So a Log Line Is Actually Queryable

**Chapter 1 · Cloud Observability Fundamentals · Lesson 2 of 4**

## What you'll learn

- Why a traditional free-text log line is a dead end at production
  scale, even though it reads perfectly well to a human
- What a structured (JSON) log line actually looks like, field by
  field, and why each field earns its place
- How to carry context — request ID, trace ID, user ID — through
  every log line a single request produces, so they can be joined
  back together later
- What a log level actually controls, and how to pick one on purpose
  instead of defaulting everything to `INFO`

## The problem with "it reads fine to me"

A classic unstructured log line looks like this:

```text
2026-10-28 14:03:12 ERROR Failed to process order 48213 for user bob@example.com: timeout after 30000ms
```

That's perfectly readable — you, a human, can scan it in a terminal
and understand exactly what happened. The problem shows up the moment
you have thousands of instances writing millions of these lines a
day, and you need to ask a precise question across all of them: "show
me every failed order for users on the EU shard in the last hour,
grouped by failure reason." With free text, that question becomes a
fragile regular expression, guessing at where `order` and the number
after it land in the sentence, breaking the instant someone edits the
message wording in a future deploy. You're pattern-matching prose. It
doesn't scale, and it doesn't compose.

## Structured logging: the log line as data, not prose

**Structured logging** means every log line is emitted as a
well-defined data structure — almost always JSON — with named fields
instead of a freeform sentence. The same event, structured:

```json
{
  "timestamp": "2026-10-28T14:03:12.481Z",
  "level": "error",
  "service": "order-service",
  "event": "order_processing_failed",
  "order_id": 48213,
  "user_id": "bob@example.com",
  "region": "eu-west-1",
  "duration_ms": 30000,
  "error": "timeout",
  "trace_id": "7e3b2f9c1a4d8e22",
  "request_id": "req_91ac3f"
}
```

Nothing here is less informative than the free-text version — it's
the same facts. What changed is that every fact now lives at a known
address. A log aggregation backend (Loki, CloudWatch Logs Insights,
Elasticsearch, Datadog Logs — the specific product doesn't matter,
the shape does) can index `order_id`, `region`, and `error` as real
fields and let you run exactly the query you wanted: filter
`region = "eu-west-1" AND level = "error"`, group by `error`, over
the last hour. No regex, no guessing, no breakage when someone
rewords a message next sprint.

## Fields that earn their place in every log line

Not every field belongs in every log line, but a few belong in
*nearly all of them*, because they're what make individual log lines
joinable into a bigger story later:

- **`timestamp`** — in a fixed, sortable format (ISO 8601, as above),
  never a locale-dependent string
- **`level`** — severity, covered below
- **`service`** — which process emitted this, essential the moment
  you have more than one
- **`trace_id`** / **`request_id`** — the thread that ties this log
  line to the specific request it came from, and therefore to the
  trace that request produced (Lesson 3 is entirely about this
  propagation)
- **`event`** — a stable, machine-friendly name for *what happened*
  (`order_processing_failed`), separate from any human-readable
  message, so the event name survives even if the prose around it
  changes

That `trace_id` field is the hinge between pillars: it's what lets you
go from a slow span in a trace straight to the exact log lines that
request produced, with one filter, instead of guessing at a timestamp
window and hoping you caught the right lines.

## Log levels: a decision, not a default

A **log level** tells both humans and alerting systems how urgently a
line matters, from most to least severe in the common convention:
`FATAL` / `CRITICAL`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `TRACE`. The
level isn't decoration — it's what downstream tooling filters and
alerts on. A production alerting rule might page someone on any
`ERROR`-level log from a payment service, while `DEBUG` lines are
dropped or sampled before they ever leave the host, because storing
every debug line from every request, forever, is the fastest way to
make your logging bill bigger than your compute bill.

Picking a level is a judgment call worth making deliberately: `ERROR`
means this specific operation failed and probably needs a human or an
automated retry; `WARN` means something unexpected happened but the
request still completed; `INFO` means a normal, expected lifecycle
event worth keeping for business visibility (an order was placed);
`DEBUG` is detail you only want when actively troubleshooting. A
codebase where everything is logged at `INFO` is a codebase where
`grep -i error` is the only effective filter anyone has left.

```json
{"timestamp":"2026-10-28T14:03:12.481Z","level":"info","service":"order-service","event":"order_placed","order_id":48213,"trace_id":"7e3b2f9c1a4d8e22"}
```

## Key terms

| Term | Meaning |
|---|---|
| Unstructured log | A free-text log line meant for human reading; expensive to query reliably at scale |
| Structured log | A log line emitted as a well-defined data structure (usually JSON) with named, indexable fields |
| `event` field | A stable, machine-friendly name for what happened, independent of any human-readable message text |
| `trace_id` / `request_id` | The field that ties every log line from one request together, and connects logs back to that request's trace |
| Log level | The severity classification (`ERROR`, `WARN`, `INFO`, `DEBUG`, etc.) that downstream tooling filters, samples, and alerts on |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why
does a `trace_id` field in a structured log line matter more than
almost any other field, and what specifically breaks when a team logs
everything unstructured and at `INFO`?
