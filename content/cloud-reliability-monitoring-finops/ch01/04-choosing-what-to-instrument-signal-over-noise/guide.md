# Lesson 4 — Choosing What to Instrument: Signal Over Noise

**Chapter 1 · Cloud Observability Fundamentals · Lesson 4 of 4**

## What you'll learn

- Why "instrument everything" is not the finish line — it's how teams
  end up with an unreadable dashboard and an unaffordable telemetry
  bill at the same time
- A practical framework for deciding what's worth a metric, a log
  line, or a span, based on business impact and known failure history
- What over-instrumentation actually costs you, concretely, beyond
  just the storage bill
- How this decision connects straight into FinOps — the discipline
  this course builds toward next, where telemetry cost is itself a
  line item to manage

## "Instrument everything" is not a strategy

After three lessons on metrics, logs, and traces, the obvious
temptation is to wrap every function, log every branch, and emit a
metric for every counter you can imagine. Don't. A system instrumented
indiscriminately produces so much telemetry that finding the signal
inside it becomes its own investigation — you've traded "not enough
data" for "too much data to search," which is barely an improvement
during an actual incident at 2 a.m. It also costs real money: every
metric series, every log line, every span gets stored and usually
billed by volume, and teams that instrument first and think later
regularly discover their observability vendor's bill rivaling their
compute bill. This lesson is the discipline that prevents that, and
it sets up this course's FinOps chapters directly, because
observability cost is a budget line like any other cloud spend.

## A framework: instrument where it actually matters

Three questions, asked about every candidate piece of telemetry,
cut the decision down to something tractable:

**1. Is this on a business-critical path?** The checkout flow, the
authentication flow, the payment processor call — these deserve
metrics, structured logs, *and* trace spans, the full treatment,
because a failure here has direct revenue or trust impact. An
internal admin tool used by three people on your own team does not
need the same depth. Rank instrumentation depth by business
consequence of failure, not by how interesting the code is to
instrument.

**2. Has this broken before, or is it structurally likely to?** A
known failure point — the third-party API that occasionally times
out, the cache that's gone stale under load twice already, the
database connection pool that's exhausted under traffic spikes —
earns dedicated instrumentation specifically shaped around *how it
failed last time*. If your Redis cache caused an incident last
quarter because of connection pool exhaustion, you instrument
`cache_pool_active_connections` and `cache_pool_wait_time_ms` as
metrics, and you log pool-exhaustion events explicitly. That's
targeted, because you're not guessing what might go wrong — you're
closing a gap you've already seen.

**3. Would a human actually act on this signal?** If a metric would
never trigger an alert, a log line would never be searched for, or
a span would never be the thing someone opens during an incident —
it isn't earning its storage cost. A good gut check: for any piece
of proposed telemetry, ask "what would I *do* differently if I saw
this value change?" If there's no answer, it's noise, not signal,
no matter how easy it was to add.

## What over-instrumentation actually costs

Beyond the direct storage and ingestion bill, over-instrumentation
has a second, subtler cost: **alert fatigue** and **signal dilution**.
A dashboard with 200 metrics panels, most of them flat lines nobody
has looked at in months, is worse than a dashboard with 15 that
actually move when something's wrong — the useful ones get lost in
the noise. The same applies to log verbosity: a service logging at
`DEBUG` in production, on every request, buries the one `ERROR` line
that mattered inside a flood of lines nobody will read. High-cardinality
labels are a specific, common trap worth naming directly — attaching
a raw `user_id` or a full request path as a metric *label* (instead
of as a log field) can silently explode a single metric into millions
of unique time series, because every distinct label value creates a
new series. That's a frequent, expensive mistake even experienced
teams make once before they stop:

```text
# DON'T: user_id as a metric label — millions of series, one per user
http_requests_total{user_id="48213", route="/checkout"}

# DO: user_id stays in logs/traces where high cardinality is fine;
# metrics stay low-cardinality
http_requests_total{route="/checkout", status_code="200"}
```

## Signal over noise, as an ongoing practice

Treat instrumentation like any other code you maintain: review it
periodically, delete metrics nobody queries, prune log statements
that never get searched, and retire spans around code paths that
were removed. The right amount of telemetry isn't a number you hit
once — it's a standard you keep enforcing as the system and the
traffic patterns underneath it change.

## Key terms

| Term | Meaning |
|---|---|
| Over-instrumentation | Emitting more telemetry than anyone acts on, which raises cost and buries the signals that actually matter |
| Business-critical path | A flow (checkout, auth, payment) whose failure has direct revenue or trust impact, and therefore earns the deepest instrumentation |
| Known failure point | A component with a documented history of breaking, instrumented specifically around how it failed before |
| Alert fatigue | The erosion of trust in alerts/dashboards caused by too many low-value signals competing with the few that matter |
| High-cardinality label | A metric label (like a raw user ID) with huge numbers of distinct values, which can explode storage cost if used carelessly |

## Check yourself

You're ready for Chapter 2 when you can explain, without looking: why
is attaching a raw `user_id` as a metric label a different kind of
mistake than attaching it as a log field, and what are the three
questions this lesson uses to decide whether a given piece of
telemetry earns its storage cost?
