# Lesson 9 — Widgets and Parameters

**Chapter 1 · Databricks Fundamentals · Lesson 9 of 57**

## What you'll learn

- `dbutils.widgets` — turning a hardcoded value into an input
- Reading a widget's current value back into your code
- Why this matters most for job clusters, not interactive exploration
- The four widget types, briefly

## The problem: hardcoded values everywhere

```python
trips = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-01.parquet")
```

This works fine once. Running the same logic for February means
editing the string by hand, in the code, every time — exactly the
kind of one-off thinking Foundations' Lesson 27 ETL capstone
deliberately avoided by parameterizing a script's inputs.

## Creating a widget

```python
dbutils.widgets.text("month", "2024-01", "Trip month (YYYY-MM)")

month = dbutils.widgets.get("month")
trips = spark.read.parquet(f"/data/nyc_taxi/yellow_tripdata_{month}.parquet")
```

`dbutils.widgets.text(name, default, label)` adds an input box at
the top of the notebook. `dbutils.widgets.get(name)` reads whatever
value is currently in it — always as a string, regardless of the
widget type — back into your code. Change the box, rerun the
notebook, and the same logic runs against a different month, with
no code edits at all.

## Why this matters most for jobs

A human running a notebook interactively can just edit the code
directly — a widget is a convenience there, not a necessity. But a
**job cluster** (Lesson 5) has no human present to edit anything.
Databricks jobs can pass widget values as parameters at run time —
this is exactly how one parameterized notebook becomes a reusable
building block that a schedule (Lesson 11) can run against a
different month, and different data, every single day.

## The four widget types, briefly

| Type | Use for |
|---|---|
| `text` | Free-form input, like the month string above |
| `dropdown` | A fixed list of valid choices |
| `combobox` | A dropdown that also accepts free-form typed input |
| `multiselect` | Choosing more than one value at once |

All of them are read back the same way, with `dbutils.widgets.get()`.

## Key terms

| Term | Meaning |
|---|---|
| `dbutils.widgets.text()` | Creates an input box, with a default value and a label |
| `dbutils.widgets.get()` | Reads the widget's current value, always as a string |
| Job parameter | A widget value a scheduled job supplies automatically, with no human present |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why
does a widget matter far more for a job cluster than for a human
running a notebook interactively?
