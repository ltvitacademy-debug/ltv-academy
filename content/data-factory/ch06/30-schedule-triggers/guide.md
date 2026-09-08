# Lesson 30 — Schedule Triggers

**Chapter 6 · Triggers & Scheduling · Lesson 1 of 4**

## What you'll learn

- How manual execution differs from every trigger type
- The three trigger types Data Factory supports
- How a Schedule trigger's recurrence and schedule properties combine
- Real recurrence examples worth recognizing on sight

## Two ways to run a pipeline: manual, or triggered

A **pipeline run** is one instance of a pipeline's execution, each
with its own unique run ID. You can start one **manually** — also
called on-demand execution, via the Studio, an SDK, PowerShell, or the
REST API — or let a **trigger** start it automatically:

![Screenshot showing how to add a new trigger from the pipeline editor, with Add trigger highlighted.](/courses/data-factory/ch06/30-schedule-triggers/manual-trigger.png)

## Three trigger types

Data Factory supports three:

| Trigger type | Fires when |
|---|---|
| **Schedule trigger** | A wall-clock schedule — this lesson's topic |
| **Tumbling window trigger** | A periodic interval, with state retained across runs — Lesson 31 |
| **Event-based trigger** | An event, like a file arriving in Blob Storage — Lesson 32 |

Selecting **New/Edit** on a pipeline's Trigger menu opens the
configuration flow for any of the three:

![Screenshot of the Add Triggers window, showing where to choose an existing trigger or create a new one.](/courses/data-factory/ch06/30-schedule-triggers/new-trigger.png)

![Screenshot of the New trigger configuration window, with the Type dropdown showing Schedule, Tumbling window, Storage events, and Custom events.](/courses/data-factory/ch06/30-schedule-triggers/new-trigger-configuration.png)

## Schedule trigger: recurrence plus an optional schedule

A **Schedule trigger** runs on a wall-clock schedule, and it's
flexible about the data pattern it feeds — it doesn't distinguish
time-series from non-time-series data at all. Two real pieces
configure it:

- **Recurrence** — `frequency` (minute, hour, day, week, month) and
  `interval` (how many of that unit between runs). A `frequency` of
  `"week"` with `interval: 3` fires every three weeks.
- **Schedule** (optional) — narrows or expands *when within* that
  recurrence the trigger actually fires: specific `hours`, `minutes`,
  `weekDays`, `monthDays`, or `monthlyOccurrences`.

## Recurrence examples worth recognizing

| Schedule | Meaning |
|---|---|
| `{"hours":[5]}` | Every day at 5:00 AM |
| `{"hours":[17], "weekDays":["saturday"]}` | Every Saturday at 5:00 PM |
| `{"minutes":[0], "hours":[6], "monthDays":[-1]}` | 6:00 AM on the last day of every month |
| `{"monthlyOccurrences":[{"day":"friday", "occurrence":1}]}` | The first Friday of every month |

`-1` for `monthDays` genuinely means "the last day," regardless of
whether that's the 28th, 30th, or 31st — a small detail that saves
you from writing four different triggers for four different month
lengths.

## Pipelines and triggers: a many-to-many relationship

Unlike a Tumbling window trigger (Lesson 31), a Schedule trigger can
kick off **multiple** pipelines, and a single pipeline can be started
by **multiple** different triggers. The `pipelines` array in a
trigger's JSON lists every pipeline it's actually wired to, each with
its own parameter values.

## Key terms

| Term | Meaning |
|---|---|
| Pipeline run | One instance of a pipeline's execution, with a unique run ID |
| Recurrence | A trigger's frequency and interval |
| Schedule | Optional narrowing/expansion of exactly when within a recurrence a trigger fires |

## Lab

1. On any pipeline, select **Trigger → New/Edit** and create a
   Schedule trigger set to run daily at a specific hour.
2. Add a `schedule` narrowing it to specific weekdays only, and
   confirm the recurring pattern makes sense.
3. Write one sentence explaining why `monthDays: [-1]` is more
   reliable than hard-coding `monthDays: [31]`.

## Check yourself

You're ready for Lesson 31 when you can explain, in one sentence,
the difference between a trigger's `recurrence` and its optional
`schedule`.
