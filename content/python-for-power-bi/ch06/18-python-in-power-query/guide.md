# Lesson 18 — Python Scripts in Power Query

**Chapter 6 · Python Inside Power BI · Lesson 18 of 20**

## What you'll learn

- How this differs from Lesson 8's Get Data → Python script
- Where **Run Python Script** actually lives, inside Power Query Editor
- The automatic `dataset` variable — and why you didn't create it yourself
- The privacy-level warning this specific feature always triggers

## A second, different way Python plugs in

Lesson 1 said Python plugs into Power BI at exactly two points. This is
the second one — and it's easy to confuse with the first. Lesson 8's
**Get Data → Python script** makes Python *the entire data source*. This
lesson's **Run Python Script** is different: it's a single transform
step applied to data Power BI already loaded from somewhere else,
sitting inside the same step-by-step Power Query pipeline as any other
transform.

## Where it lives

With data already loaded and **Power Query Editor** open (**Home →
Transform data**), the **Transform** tab has a **Run Python Script**
button:

![Screenshot of the Transform tab in Power Query Editor.](/courses/python-for-power-bi/ch06/18-python-in-power-query/python-in-query-editor-5.png)
*Sitting in the Transform tab — a step, not a separate data source.*

## The automatic `dataset` variable

Selecting it opens a script editor — and here's the part that surprises
people the first time: your Power Query table is already sitting there,
automatically, as a variable named `dataset`. You never wrote a line to
create it:

```python
# 'dataset' holds the input data for this script

import pandas as pd
completedData = dataset.fillna(method='backfill', inplace=False)
dataset["completedValues"] = completedData["SMI missing values"]
```

![Screenshot of the Run Python Script dialog with this script pasted in.](/courses/python-for-power-bi/ch06/18-python-in-power-query/python-in-query-editor-5b.png)
*`dataset` arrives pre-loaded — the whole point of running Python from inside the pipeline instead of as its own source.*

This three-line script fills missing values using a real predictive
method (`fillna` with `backfill`, filling a gap from the next valid value
rather than a flat default) and adds the result as a new column —
genuinely more than a Power Query UI step alone would do easily.

## The privacy warning — expect this every time

After selecting **OK**, Power Query Editor shows a data-privacy warning:

![Screenshot of the Power Query Editor privacy warning.](/courses/python-for-power-bi/ch06/18-python-in-power-query/python-in-query-editor-6.png)
*Not an error — a required step, because a Python script step counts as an external transformation for privacy purposes.*

This isn't optional or something you configure around. Every data source
touched by a query with a Python step needs its privacy level set to
**Public** for the script to run in the Power BI service later — worth
knowing about now, not discovering the first time you publish.

## Seeing the result

Once resolved, the new column appears in the **Fields** pane like any
other, ready to build visuals on top of:

![Screenshot of a chart showing original and Python-completed values side by side.](/courses/python-for-power-bi/ch06/18-python-in-power-query/python-in-query-editor-8.png)
*The three-line script's actual output — gaps filled with a real predictive method, not guessed.*

## Key terms

| Term | Meaning |
|---|---|
| Run Python Script | A Power Query transform step running Python mid-pipeline |
| `dataset` | The automatic variable holding the query's current table |
| Privacy level | Must be set to Public on all sources for a Python step to work in the service |

## Lab

1. Load any small dataset into Power BI Desktop and open **Power Query
   Editor** (**Home → Transform data**).
2. On the **Transform** tab, select **Run Python Script** and write a
   short script referencing `dataset` directly — no import of your own
   data needed.
3. After running it, go to **File → Options and settings → Data source
   settings** and confirm the privacy level is set to Public.

## Check yourself

You're ready for Lesson 19 when you can explain the difference between
Lesson 8's Get Data → Python script and this lesson's Run Python Script
— specifically, what `dataset` is and where it comes from.
