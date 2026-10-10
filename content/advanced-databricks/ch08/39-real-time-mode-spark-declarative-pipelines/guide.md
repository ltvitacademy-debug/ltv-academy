# Lesson 39 — Real-Time Mode for Spark Declarative Pipelines

**Chapter 8 · Agentic Data Engineering & What's New · Lesson 39 of 42**

## What you'll learn

- The exact problem Real-Time Mode solves, and why it eliminates the
  need for a separate engine like Apache Flink
- The two primitives of the programming model — `dp.create_sink` and
  `@dp.update_flow` — and what's deliberately absent from them
- A real stateless flow and a real stateful flow (`transformWithState`),
  both from Databricks' own aircraft-tracking demo
- How this connects directly to the declarative pipelines you already
  built in Chapter 3

## The problem: a second engine for sub-second latency

You learned in Chapter 3 that Lakeflow Declarative Pipelines (built on
open-source Apache Spark Declarative Pipelines, or SDP) let you
declare transformations and let the framework handle orchestration,
checkpoints, retries, and state. That default execution mode is
excellent for high-throughput ETL tolerating latencies from a few
seconds to minutes.

What it was never built for: in-the-loop decisions that need to land
in tens of milliseconds — fraud scoring, live personalization,
real-time alerting. Until now, meeting that bar meant bolting on a
specialized streaming engine, typically Apache Flink, alongside your
existing batch/micro-batch engine — a second stack to deploy, monitor,
and operate.

**Real-Time Mode (RTM)**, announced in Public Preview in June 2026,
removes that second engine. It targets **p99 latency in the tens to
low hundreds of milliseconds**, with end-to-end latencies as low as
**5 milliseconds**, inside the exact same declarative authoring model
you already know — sinks and flows, on serverless. You keep "declare
what, not how," and gain real-time speed in the same engine.

## The programming model: two primitives, and what's missing

RTM pipelines are authored with the `pyspark.pipelines` API (imported
as `dp` — the same module from Chapter 3). Two primitives do the
work, and it's worth noticing what's **absent**: no `writeStream`, no
`awaitTermination`, no checkpoint paths to manage by hand.

**1. Declare an external sink.** RTM is built for operational
delivery — writing straight to the operational system your
application reads from, rather than landing results in an analytical
table:

```python
from pyspark import pipelines as dp

# Native Lakebase sink (Private Preview); exact options may change before GA
dp.create_sink(
    name="lakebase_sink",
    format=...,     # native Lakebase sink
    options={...},  # connection + target table
)
```

**2. Define an update flow that targets the sink.** An
`@dp.update_flow` returns a streaming DataFrame, and its rows route to
the named sink. The flow is where RTM actually gets switched on,
through a flow-level Spark config:

```python
@dp.update_flow(
    name="positions_flow",
    target="lakebase_sink",
    spark_conf={
        "pipelines.trigger": "RealTime",          # the switch
        "pipelines.trigger.interval": "5 minutes", # checkpoint cadence, not batch size
    },
)
def positions_flow():
    ...
```

Three things worth internalizing precisely: `pipelines.trigger:
"RealTime"` combined with the pipeline-level
`spark.databricks.streaming.realTimeMode.enabled` is what moves a flow
onto the continuous engine. `pipelines.trigger.interval` is **not** a
micro-batch size — in RTM the "batch" is long-running and data
processes as it arrives; the interval only governs how often state and
source offsets get checkpointed. And the pipeline itself runs
serverless and continuous, on the Preview channel.

## The stateless flow: enrich each event

Databricks' own demo tracks live aircraft positions streaming from
Kafka. The first flow is ordinary, stateless DataFrame work — parse
JSON, drop incomplete rows, add a flight-phase label, an emergency
alert flag, a zone label — and **nothing about writing it is
RTM-specific**. The exact same DataFrame code you'd write for a
micro-batch flow runs unchanged. The only thing that makes it
real-time is the `pipelines.trigger: "RealTime"` line in the
decorator.

## The stateful flow: `transformWithState`

The second flow answers a question no single record can answer alone:
how many aircraft are inside each monitored zone right now, and when
does a zone become too crowded? That needs **state** — RTM supports
the Arbitrary Stateful Processing API, `transformWithState`, through a
`StatefulProcessor` class.

Databricks built this as a single keyed stateful operator — one
shuffle, one operator, one hop on the real-time path — keyed by zone,
holding a `MapState` of aircraft-id to last-seen-time:

```python
class ZoneCounter(StatefulProcessor):
    def init(self, handle):
        self._aircraft = handle.getMapState("aircraft", KEY_SCHEMA, VAL_SCHEMA)
        self._timer = handle.getValueState("sweepTimer", TIMER_SCHEMA)

    def handleInputRows(self, key, rows, timerValues):
        now_ms = timerValues.getCurrentProcessingTimeInMs()
        for r in rows:
            self._aircraft.updateValue(Row(icao24=r.icao24), Row(last_ms=now_ms))
        active = self._sweep(now_ms)       # drop aircraft not seen within the TTL
        self._ensure_timer(now_ms)         # keep exactly one pending sweep timer
        yield self._alert_row(key[0], active, now_ms / 1000.0)

    def handleExpiredTimer(self, key, timerValues, expiredTimerInfo):
        now_ms = timerValues.getCurrentProcessingTimeInMs()
        active = self._sweep(now_ms)
        if active:
            self._ensure_timer(now_ms)
        yield self._alert_row(key[0], active, now_ms / 1000.0)
```

Wired into a flow with a `groupBy("zone")` and `.transformWithState(...)`
call — one shuffle, one stateful operator, writing to a second Lakebase
sink via a second `@dp.update_flow`.

Two patterns worth lifting directly into your own stateful RTM code:

- **Staleness-based eviction** — an aircraft leaving a zone generates
  no "leave" event; there's nothing to react to. The fix is a
  recurring sweep that evicts anything not seen within a short TTL and
  re-emits the refreshed count, so a zone that empties out clears
  itself on its own.
- **Idempotent timers** — since `handleInputRows` fires once per row
  in RTM, naively registering a timer on every row would pile up
  thousands of redundant timers. `_ensure_timer` only registers a
  sweep timer if one isn't already pending, keeping exactly one timer
  alive in a `ValueState` at a time.

## Measuring it honestly

RTM reports per-record latency at p50, p90, p95, and p99 — and the
guidance is to watch the percentiles, not the average, since that's
specifically where RTM delivers. The reported `e2eLatencyMs` metric
covers the full engine path, from the message bus to the query's
downstream write.

## Key terms

| Term | Meaning |
|---|---|
| Real-Time Mode (RTM) | A continuous execution mode for Spark Declarative Pipelines targeting p99 latency in the tens-to-low-hundreds of ms |
| dp.create_sink | Declares an external operational sink (e.g. Lakebase) as the target for an update flow |
| @dp.update_flow | Defines a streaming flow targeting a named sink; RTM is switched on via its spark_conf |
| transformWithState | The Arbitrary Stateful Processing API RTM supports for keyed, stateful streaming logic |

## Check yourself

Without looking back: what single config line switches a flow into
Real-Time Mode, and what does `pipelines.trigger.interval` actually
control once RTM is on — if it's not the micro-batch size?
