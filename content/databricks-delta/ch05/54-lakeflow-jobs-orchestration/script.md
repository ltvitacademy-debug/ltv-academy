# Lesson 54 — Lakeflow Jobs — Orchestration · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

The pipeline handles its own internal order — but what schedules
the whole thing? Lakeflow Jobs, orchestration.

## S2 · CODE CARD (pipeline as a task)

This is Lesson 11's job and task structure again, with a
genuinely new task type — a pipeline task runs the entire
declarative pipeline, every table, in its inferred order, as a
single step.

## S3 · CODE CARD (mixing task types)

And a Lakeflow Job isn't limited to pipeline tasks alone. Send
notification here is an ordinary notebook task, depending on the
pipeline finishing — maybe a Slack message, or a dashboard
refresh. Orchestration still coordinates whatever isn't itself a
table in the pipeline.

## S4 · CODE CARD (why it still matters)

The declarative pipeline solves ordering within itself — it
doesn't solve when the whole thing runs, or what happens after.
That's still Lakeflow Jobs' job — the same scheduling and
task-chain vocabulary from Lesson 11, one level up.

## S5 · OUTRO CARD

Scheduling and run history are the same system, renamed. The
genuinely new part is the pipeline task type itself. Next lesson:
monitoring pipeline runs, where all of this actually shows up.
