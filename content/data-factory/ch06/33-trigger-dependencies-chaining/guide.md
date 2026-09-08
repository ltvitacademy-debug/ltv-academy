# Lesson 33 — Trigger Dependencies & Chaining

**Chapter 6 · Triggers & Scheduling · Lesson 4 of 4**

## What you'll learn

- How to make one tumbling window trigger wait on another's success
- What `offset` and `size` actually control
- Self-dependency, for a trigger that shouldn't outrun itself
- How to monitor a dependency chain visually

## Chaining triggers, not just activities

Chapter 4's dependency conditions chained **activities** inside one
pipeline. **Trigger dependencies** do the same job one level up,
between **tumbling window triggers** (Lesson 31) — Trigger A only
fires once Trigger B's dependency window actually succeeds:

![Screenshot of the dependency creation window, choosing a trigger to depend on with offset and size settings.](/courses/data-factory/ch06/33-trigger-dependencies-chaining/dependency-01.png)
*Trigger → Advanced → New. Publish for the dependency to actually take effect.*

A tumbling window trigger can depend on up to **five** other
triggers.

## `offset`: when the dependency window sits, relative to yours

Trigger A's 10-11 window can depend on Trigger B's window
**concurrently** (offset `0`) or **earlier** (a negative offset):

![Diagram showing two examples: Trigger A's 10-11 window depending on Trigger B's concurrent 10-11 window with offset 0, and depending on B's earlier 9-10 window with offset -1 hour.](/courses/data-factory/ch06/33-trigger-dependencies-chaining/dependency-02.png)

A negative offset is the far more common real pattern: "don't start
today's aggregation until yesterday's ingestion actually finished."

## `size`: the dependency window doesn't have to match yours

The dependency window's `size` can genuinely differ from the size of
the trigger depending on it — a daily trigger can depend on a **seven-
day** rolling window from a weekly aggregation trigger, for instance,
with `offset: -6 days` and `size: 7 days`.

## Self-dependency: don't outrun yourself

A trigger can depend on **its own** earlier runs — useful when a
window genuinely shouldn't start until the *previous* window finished
successfully, keeping strictly sequential processing even though the
trigger type itself supports parallelism. Self-dependency always
needs a **negative** `offset`; it's the one case where `offset` is
required rather than optional.

## Monitoring the chain

Go to **Monitoring → Trigger Runs**. A trigger with dependencies
shows a hyperlink into a dependency view, and the **Gantt** view
visualizes the whole chain at a glance:

![Screenshot of the Gantt chart view for monitoring trigger dependencies, showing transparent dependency-window boxes and solid individual-run boxes in blue, green, and red.](/courses/data-factory/ch06/33-trigger-dependencies-chaining/dependency-09-gantt.png)
*Blue: pending or running. Green: every dependent window succeeded. Red: a dependent window failed — select the solid red box to rerun it.*

A tumbling window trigger waits on its dependencies for up to
**seven days** before timing out. If a dependency fails, you have to
successfully **rerun** it before the dependent trigger can proceed —
there's no automatic skip.

## Key terms

| Term | Meaning |
|---|---|
| Trigger dependency | A tumbling window trigger waiting on another trigger's window to succeed first |
| offset | How far the dependency window sits from the dependent trigger's own window |
| Self-dependency | A trigger depending on its own earlier runs, always with a negative offset |

## Lab

1. Build two tumbling window triggers, A and B, and configure A to
   depend on B with a negative offset.
2. Add a self-dependency to a third trigger, forcing strictly
   sequential runs.
3. Open the Gantt view under Monitoring → Trigger Runs and identify
   the dependency windows versus the individual run boxes.

## Check yourself

Chapter 6 is complete when you can explain, in one sentence, why a
tumbling window trigger's dependency feature — backfill, retries,
gap-free reliability, and now chaining — makes it the right choice
for genuinely production-grade, order-sensitive pipelines, where a
Schedule trigger's simplicity isn't quite enough.
