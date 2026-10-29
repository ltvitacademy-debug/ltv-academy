# Lesson 3 — Distributed Tracing: Following a Request Across Services

**Chapter 1 · Cloud Observability Fundamentals · Lesson 3 of 4**

## What you'll learn

- How a single incoming request becomes one trace made of many spans,
  concretely — not just the idea, but the mechanics of how it's built
- What **trace context propagation** actually is, and why it has to
  survive every network hop between services for a trace to exist at
  all
- The OpenTelemetry model at a conceptual level: tracer, span,
  context, and exporter, and how they fit the services you've already
  deployed on Kubernetes
- Why sampling exists, and what it costs you when it's set wrong

## From one request to a tree of spans

Lesson 1 showed you a finished trace tree. This lesson is about how
that tree actually gets built, hop by hop, as a real request moves
through a system you already know how to deploy: a Kubernetes
Ingress routing to a `checkout` Service, which calls an `inventory`
Service, which queries a Postgres database.

A **span** is created the moment a unit of work starts, and closed
the moment it finishes — it's not a log line written after the fact,
it's a timed region wrapped around real code. A **trace** is simply
the set of all spans that share one **trace ID**, reassembled by
their parent/child relationships into a tree. The gateway's span is
the root; the checkout service's span is its child; the call to
inventory-service is a child of that; the Postgres query is a child
of the inventory span. Nothing here requires a human to manually
stitch anything together after the fact — the parent/child structure
is recorded at creation time, by the code (or the instrumentation
library) that created each span.

## Trace context propagation: the part that makes it distributed

Here's the mechanical problem distributed tracing actually has to
solve: `checkout-service` and `inventory-service` are separate
processes, on separate pods, that don't share memory. For
inventory-service's span to end up as a *child* of checkout-service's
span in the same trace, checkout-service has to hand inventory-service
the trace ID and its own span ID — and the only way to do that across
a network call is to put them in the request itself.

That's **trace context propagation**: the calling service injects a
header into the outgoing HTTP request (or gRPC metadata, or a message
broker's headers), and the receiving service extracts it and uses it
to parent its new span correctly. The W3C standard header looks like
this:

```text
traceparent: 00-7e3b2f9c1a4d8e22b6f1a0c9d8e7f6a5-00f067aa0ba902b7-01
             |  |-------- trace id --------------|  |--parent span id--|  flags
```

If that header is dropped anywhere along the chain — a proxy that
strips unknown headers, a message queue that doesn't forward metadata,
a service that calls `fetch()` without copying the header through —
the trace doesn't error out loudly. It just silently splits into two
disconnected traces, and you've lost the one thing tracing exists to
give you: the connective tissue across the hop. This is the single
most common reason a team sets up tracing and then finds their traces
mysteriously end at a service boundary.

## The OpenTelemetry model, conceptually

**OpenTelemetry** (often "OTel") is the vendor-neutral standard most
tracing tooling is built on today, and it's worth knowing its core
pieces even before you touch its SDK in a later lesson, because the
vocabulary is now universal across backends:

- A **Tracer** creates spans for a given service/library
- A **Span** is the unit you've already seen — a name, a start/end
  time, attributes (key-value metadata like `http.route` or
  `db.statement`), and a parent reference
- The **Context** is what carries the active trace ID and span ID
  through your code and across network boundaries — propagation is
  this context being serialized into a header and deserialized on
  the other side
- An **Exporter** ships finished spans out of the process to a
  backend (Jaeger, Tempo, a vendor's collector) for storage and
  querying

A minimal span, created in code, looks roughly like this regardless
of language:

```python
with tracer.start_as_current_span("inventory.check_stock") as span:
    span.set_attribute("item.sku", sku)
    span.set_attribute("item.warehouse", warehouse_id)
    result = db.query(...)
    span.set_attribute("db.rows_returned", len(result))
```

## Sampling: you don't keep every trace, on purpose

At real traffic volumes, recording and exporting a full trace for
*every single request* is often more data than it's worth storing.
**Sampling** decides which traces actually get kept — a common
starting point is "always keep traces with an error or with latency
above a threshold, and keep a small random percentage of everything
else," so you retain the interesting cases without paying to store
every uneventful one. Set the sample rate too low, though, and the
one trace you needed for an obscure, intermittent bug simply wasn't
captured — sampling strategy is a direct trade-off between storage
cost and the odds that the specific request you need later actually
survived.

## Key terms

| Term | Meaning |
|---|---|
| Span | A timed unit of work with a name, start/end time, attributes, and a parent reference |
| Trace | The full set of spans sharing one trace ID, reassembled into a tree by parent/child links |
| Trace context propagation | Passing the trace ID and parent span ID across a network call (e.g. the `traceparent` header) so the receiving service's span attaches to the right trace |
| OpenTelemetry (OTel) | The vendor-neutral standard for generating and exporting traces, metrics, and logs; its core pieces are Tracer, Span, Context, and Exporter |
| Sampling | The strategy for deciding which traces are kept and exported, trading storage cost against the odds of capturing a specific future incident |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: what
specifically happens to a trace when a service in the middle of a
call chain fails to forward the `traceparent` header, and why does
that failure mode stay silent instead of throwing an error?
