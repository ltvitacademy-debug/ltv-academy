# Lesson 45 — Using Copilot to Generate a Notebook

**Chapter 3 · AI for Data Engineers (Bonus) · Lesson 45 of 81**

## What you'll learn

- A worked example of describing a transformation to Copilot's chat pane
- Why the first draft Copilot generates is a draft, not a finished answer
- A concrete case where generated code silently drops a business rule
- A repeatable review checklist before you trust generated PySpark
- Why this ties directly into Lesson 58's "evaluating AI output" theme

## The prompt

Say you need a notebook cell that reads a sales file and totals revenue by
region, for orders that haven't been cancelled. In Copilot's chat pane
(Lesson 44), you might describe it exactly like that:

```
Read sales.csv into a dataframe, then compute total
revenue by region, excluding cancelled orders.
```

## The first draft

Copilot is schema-aware — it can see the attached lakehouse's files — so it
drafts something that runs without error:

```python
df = spark.read.csv("Files/sales.csv", header=True)
result = df.groupBy("region").agg(sum("revenue"))
```

This is a plausible-looking answer. It also runs. Both of those facts are
exactly why it's dangerous to accept without reading it: **the code never
filters out cancelled orders.** The prompt said "excluding cancelled
orders"; the generated code silently dropped that part of the request. It
still executes cleanly, produces a real number, and that number is wrong.

## The review

This is the moment Lesson 43 warned about — a data engineer who already
knows the shape of a correct transformation catches this by reading the
generated code against the actual ask, not by trusting that it ran:

```
Review checklist, before you accept a generated cell:
1. Does every clause in your prompt show up in the code?
   (the filter for cancelled orders is missing — reject)
2. Do column names match the real schema, not an assumption?
3. Are nulls handled the way your business rule expects?
4. Run it on a small sample first, and check the actual numbers
```

## The corrected version

Once the missing filter is caught, the fix is small — and it's worth
asking Copilot to fix it directly with `/fix`, or writing it yourself now
that you know what's missing, exactly the way Databricks & Delta Lake's
PySpark lessons (transformations vs. actions) taught it:

```python
from pyspark.sql.functions import col, sum as _sum

df = spark.read.csv("Files/sales.csv", header=True)
result = (
    df.filter(col("order_status") != "CANCELLED")
      .groupBy("region")
      .agg(_sum("revenue").alias("total_revenue"))
)
```

## Why this matters beyond one notebook

This isn't a one-off gotcha. It's the general shape of the risk with any
generated code: it optimizes for looking plausible and running
successfully, not for matching every clause of your actual intent. Lesson
58, "Evaluating AI Output for Correctness," turns this same review habit
into a repeatable practice across the rest of the pipeline — tests,
documentation, and anomaly checks included.

## Key terms

| Term | Meaning |
|---|---|
| First draft | Copilot-generated code that runs, but hasn't been checked against your actual intent |
| Silent omission | A generated result that looks right and runs cleanly while quietly missing part of the request |
| Review checklist | Compare every clause of your prompt against the generated code before accepting it |

## Check yourself

You're ready for Lesson 46 when you can explain, without looking: why did
the first-draft code in this lesson run successfully and still produce a
wrong answer — and what one-line check would have caught it before you
trusted it?
