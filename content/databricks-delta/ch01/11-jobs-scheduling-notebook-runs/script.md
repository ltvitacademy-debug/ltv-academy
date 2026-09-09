# Lesson 11 — Jobs — Scheduling Notebook Runs · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Every run so far has needed a person clicking Run — let's fix
that. Jobs, for scheduling notebook runs.

## S2 · STEPS CARD (creating a job)

Creating a job is four steps: create the job, add a task — a
notebook plus a cluster, usually a fresh job cluster — set a
schedule, and save. From there it runs itself, on schedule, with
nobody watching.

## S3 · CODE CARD (tasks)

And a job isn't limited to one notebook. Multiple tasks can chain
in sequence, each depending on the one before succeeding — that's
the real mechanism behind a bronze, silver, gold pipeline, exactly
what this course's Chapter 3 builds.

## S4 · CODE CARD (parameters)

Remember Lesson 9's widgets — a job's task can supply a value for
that exact widget at run time. The same notebook, unattended,
processes a different month every time, with the job filling in
what a human would otherwise type.

## S5 · OUTRO CARD

And every run shows up in the job's run history — succeeded,
failed, or still running, with the real output and any error.
That's the first place to check after a scheduled run. Next lesson:
the CLI and REST API, controlling all of this without touching the
UI at all.
