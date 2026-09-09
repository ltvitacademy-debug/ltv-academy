# Lesson 11 — Jobs — Scheduling Notebook Runs

**Chapter 1 · Databricks Fundamentals · Lesson 11 of 57**

## What you'll learn

- A Databricks **Job**: a notebook run on a schedule, unattended
- Tasks — a job can chain more than one step, in order
- Passing widget values as job parameters, tying back to Lesson 9
- Where to check whether last night's run actually succeeded

## A job: the same notebook, running itself

Every notebook run so far in this chapter has been triggered by a
person clicking "Run." A **Job** is a Databricks object that runs a
notebook (or a script, or a whole pipeline — Chapter 5) on its own,
according to a schedule, with no one watching. This is the concrete
mechanism behind Lesson 5's "job cluster" — the job is what actually
creates that cluster, runs the work, and tears it down.

## Creating a job

1. In **Jobs & Pipelines** (Lesson 3's sidebar tour), click **Create Job**.
2. Add a **task**: pick a notebook, and a cluster to run it on — usually a **job cluster** (Lesson 5), created fresh for this run.
3. Set a **schedule** — a cron expression, or a simpler "every day at 2 AM" style picker.
4. Save. The job now runs itself, on schedule, with nobody present.

## Tasks — chaining more than one step

A job isn't limited to one notebook. Multiple **tasks** can run in
sequence, each depending on the one before it — task 2 doesn't
start until task 1 finishes successfully. This is the real mechanism
behind a bronze-to-silver-to-gold pipeline (this course's Chapter 3):
one task per layer, chained together, running unattended overnight.

## Passing parameters into a scheduled run

```
Task parameters:
  month: 2024-02
```

Remember Lesson 9's widgets — a job's task can supply a value for
exactly that widget at run time. The same notebook, unattended,
processes a different month every time it runs, with the job
supplying the value a human would otherwise type into the widget's
input box.

## Checking whether it actually worked

Every run appears in the job's **Run history**, with a real status:
Succeeded, Failed, or still Running — plus the actual output and any
error, exactly as if you'd run it interactively yourself. This is
the first place to look after "did last night's pipeline actually
run?" — not a guess, a real recorded status per run.

## Key terms

| Term | Meaning |
|---|---|
| Job | A notebook/pipeline run on a schedule, without a person present |
| Task | One step in a job — jobs can chain several, each depending on the last |
| Run history | The real, per-run record of whether a scheduled job succeeded or failed |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: how
does a job supply a value into a notebook that expects a widget
input, when no person is present to type it in?
