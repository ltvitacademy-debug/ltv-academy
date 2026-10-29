# Lesson 11 — AWS X-Ray for Distributed Tracing

**Chapter 3 · AWS CloudWatch & X-Ray in Depth · Lesson 3 of 4**

## What you'll learn

- What an X-Ray **segment** and **subsegment** actually record, and how
  they attach to the trace ID concept you already learned in Chapter 1
- How the X-Ray **daemon** collects trace data and forwards it, and
  what the **X-Ray SDK** instruments inside your application code
- How X-Ray builds a **service map** out of nothing but segment data,
  and what it's actually useful for on a real incident
- How **sampling rules** control which requests get traced at all, and
  why you can't just trace everything in a high-traffic service

## Segments and subsegments: the units X-Ray actually records

A **segment** is the record of one service's work on one request — its
start time, end time, and metadata (HTTP method, response status,
errors). When a request enters your checkout service, the X-Ray SDK
opens a segment for that service's own work. A **subsegment** is a
finer breakdown inside that segment — a call out to DynamoDB, a call to
another downstream service, a block of custom code you wrapped
explicitly — each with its own start/end time nested inside the parent
segment's timeline.

All of a request's segments, across every service it touches, share
one **trace ID** — exactly the same concept Chapter 1 introduced in the
abstract, now tied to a specific AWS implementation. X-Ray assembles
every segment and subsegment carrying that trace ID into one
reconstructed timeline, so a single trace view shows the full request
across every service it crossed, not just one.

```json
{
  "trace_id": "1-5f2b3c4d-abcdef1234567890abcdef12",
  "id": "a1b2c3d4e5f6a7b8",
  "name": "checkout-service",
  "start_time": 1700000000.123,
  "end_time": 1700000000.531,
  "http": { "request": { "method": "POST", "url": "/checkout" },
            "response": { "status": 200 } },
  "subsegments": [
    { "name": "inventory-service", "start_time": 1700000000.150,
      "end_time": 1700000000.530 }
  ]
}
```

## The X-Ray daemon and the X-Ray SDK

Two separate pieces do the actual work. The **X-Ray SDK**, included in
your application code (available for Node.js, Python, Java, .NET, Go,
Ruby, and more), is what creates segments and subsegments as your code
runs — wrapping an outgoing HTTP call, a database query, or a block you
annotate explicitly. The **X-Ray daemon** is a small background
process (running as a sidecar container, a DaemonSet on EKS, or
automatically inside the Lambda execution environment) that receives
completed segment data from the SDK over UDP and batches it up to the
X-Ray API — your application code never talks to the X-Ray API
directly, which keeps tracing from adding request-path latency to the
thing it's measuring.

## Service maps: the topology X-Ray builds for you

Because every segment records which service it came from and which
downstream calls it made, X-Ray can assemble a **service map** —
a visual graph of every service seen in recent traces, the calls
between them, and per-edge health (average latency, error rate) —
without you ever having drawn that architecture diagram yourself. On a
real incident, the service map is often the first place to look: a
node colored for elevated errors or latency tells you immediately
which service in the chain actually degraded, before you open a single
individual trace to see why.

## Sampling rules: you can't trace everything

Tracing every single request in a high-traffic service is wasteful —
most requests are unremarkable, and recording full trace data for all
of them costs storage and API calls for information you'll never look
at. X-Ray's default sampling rule traces the first request each second
and 5% of any additional requests beyond that, per service — enough to
catch the overall shape of traffic without tracing every single call.

Custom **sampling rules** let you override that default by priority,
matched against the service name, HTTP method, or URL path, with their
own reservoir (a guaranteed number of traces per second before
percentage sampling kicks in) and fixed rate:

```json
{
  "rules": [
    {
      "description": "Always trace checkout, rarely trace health checks",
      "priority": 1,
      "service_name": "checkout-service",
      "http_method": "POST",
      "url_path": "/checkout",
      "reservoir_size": 2,
      "fixed_rate": 0.10
    },
    {
      "description": "Health checks are noise",
      "priority": 2,
      "service_name": "*",
      "url_path": "/health",
      "reservoir_size": 0,
      "fixed_rate": 0.001
    }
  ]
}
```

That configuration guarantees checkout traffic gets meaningfully
traced (2 reserved traces/second plus 10% beyond that) while health
check pings, which tell you nothing interesting on an incident, get
traced almost never.

## Key terms

| Term | Meaning |
|---|---|
| Segment | The record of one service's work on one request — start/end time and metadata |
| Subsegment | A finer breakdown inside a segment — one downstream call or wrapped code block |
| Trace ID | The shared ID linking every segment/subsegment from one request across all services |
| X-Ray SDK | The in-application library that creates segments and subsegments as code runs |
| X-Ray daemon | The background process that batches completed segment data to the X-Ray API over UDP |
| Service map | X-Ray's auto-built graph of services, their calls, and per-edge latency/error health |
| Sampling rule | A rule controlling what percentage of requests get traced, by service/method/path, with a reservoir and fixed rate |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: what
is the real difference between a segment and a subsegment, why does
the X-Ray SDK talk to a local daemon instead of the X-Ray API directly,
and why would you set a near-zero sampling rate on a health-check
endpoint specifically?
