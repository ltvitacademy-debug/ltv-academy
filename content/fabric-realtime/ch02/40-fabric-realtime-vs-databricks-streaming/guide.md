# Lesson 40 — Comparing Fabric Real-Time to Databricks Structured Streaming

**Chapter 2 · Real-Time Data Engineering · Lesson 40 of 70**

## What you'll learn

- A side-by-side map: every Fabric real-time concept vs. its Databricks equivalent
- No-code vs. code-first — the real difference, not "better vs. worse"
- Where the two genuinely converge, and where they genuinely diverge
- How to actually choose between them for a real project

## The concept map

| Concept | Fabric Real-Time Intelligence | Databricks Structured Streaming |
|---|---|---|
| Source | Eventstream (Lesson 19) reading Event Hub/IoT Hub | `readStream` against a source like Kafka or Autoloader |
| Storage | KQL Database / Eventhouse (Lesson 21) | Delta tables, written via `writeStream` |
| Windowing | Window transformation node or `bin()` (Lessons 30-32) | `.groupBy(window(...))` in PySpark (Databricks Lesson 33) |
| Late data | Watermark setting on the Window node (Lesson 33) | `.withWatermark()` (Databricks Lesson 35) |
| Dashboards | Real-Time Dashboard, tiles auto-refresh (Lesson 28) | Power BI Direct Lake over the resulting Delta table |
| Alerting | Activator, rules on objects/properties (Lesson 37) | Custom code — no built-in equivalent |

## The real difference: no-code vs. code-first

Every concept in that table solves the identical underlying
problem. The actual difference is *how* you build it: Fabric's
Eventstream canvas, Window node, and Activator are visual,
configured through a UI. Databricks Structured Streaming is
PySpark code — `.groupBy()`, `.withWatermark()`, `.writeStream` —
written and version-controlled like any other program. Neither
approach is more "correct"; they're different tradeoffs between
speed-to-build and code-level control.

## Where they genuinely converge

The vocabulary and the underlying computer science are identical —
tumbling/hopping/session windows, watermarks, event vs. processing
time. This isn't a coincidence dressed up as one; it's because
every streaming engine has to solve the exact same set of hard
problems, and there are only so many reasonable solutions to each.
Learning one gives you almost all of the other, just under a
different label.

## Where they genuinely diverge

Fabric's Activator has no direct Databricks equivalent — Spark
alerting means writing your own code against `foreachBatch` or a
similar hook. Databricks's Structured Streaming, in turn, gives you
full Python/Scala control over arbitrarily complex logic that a
no-code canvas would struggle to express — a custom machine
learning model scoring every event as it streams by, for instance.

## Choosing between them for a real project

A team already comfortable with Fabric's other no-code tools
(Dataflows, pipelines) and wanting something running quickly should
reach for Eventstream + KQL + Activator. A team with existing
PySpark skills, complex custom logic, or a codebase that needs to
live in source control alongside everything else should reach for
Structured Streaming. Many real organizations end up using both —
Fabric for operational dashboards and alerting, Databricks for
the heavier custom transformation logic feeding the same underlying
data.

## Key terms

| Term | Meaning |
|---|---|
| No-code vs. code-first | The real axis these two platforms differ on, not "better vs. worse" |
| Converging vocabulary | Same underlying streaming problems, same solutions, different engines |
| Activator | Fabric's alerting layer with no direct Databricks equivalent |

## Check yourself

You're ready for Lesson 41 when you can explain, without looking: why
do Fabric Real-Time Intelligence and Databricks Structured Streaming
end up using almost identical windowing vocabulary despite being
built by different teams on different engines?
