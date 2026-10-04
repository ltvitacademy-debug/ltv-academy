# Lesson 13 — Python for Data Engineering

**Chapter 2 · Python for Data Engineers · Lesson 13 of 62**

## What you'll learn

- Why Python specifically, out of every programming language, became
  data engineering's default
- The four places Python actually shows up in a real data engineering
  job
- What this 15-lesson chapter will and won't try to teach you
- The tools you'll use: Python itself, a code editor, and `pip`

## Why Python, specifically

Data engineering could theoretically be done in almost any language —
but Python won for a few concrete reasons that compound on each other:
it's readable enough that a data engineer, a data scientist, and an
analyst can all read the same script; it has a genuinely enormous
library ecosystem for exactly this kind of work (Lesson 21's Pandas,
Chapter 4's PySpark); and — this is the big one — **Spark itself exposes
a first-class Python API**. You're not learning Python *and then
separately* learning a Spark-specific language; PySpark, which this
course spends 24 lessons on, **is** Python.

## Four places Python actually shows up

1. **ETL scripts** — reading a file, cleaning it, writing it somewhere
   else (Lessons 22–27 build toward exactly this)
2. **Talking to APIs** — pulling data out of a REST API that has no
   other export option (Lesson 23)
3. **Orchestration glue code** — the custom logic inside a Data Factory
   activity, a Databricks notebook cell, or an Airflow task
4. **PySpark itself** — every DataFrame operation in Chapter 4 is
   Python code calling into Spark's engine

## What this chapter will and won't teach

This is **not** a general-purpose "learn to program" course — it's
deliberately scoped to exactly the Python a data engineer actually uses.
Fourteen more lessons cover: variables and types, lists and
dictionaries, control flow (conditions, loops), functions, error
handling, working with files, Pandas DataFrames, reading CSV/JSON,
talking to REST APIs, processing JSON, connecting to SQL, cleaning
data — ending in Lesson 27, where you build one real, small ETL script
combining everything. Software-engineering topics like classes, testing
frameworks, and packaging are deliberately out of scope; this chapter
gets you to *fluent enough* for the Spark and PySpark chapters that
follow, not to professional software development.

## Your tools

- **Python itself** — version 3.10 or later is fine for everything in
  this course
- **A code editor** — Visual Studio Code is the industry-standard
  choice, free, and what every code screenshot in this chapter uses
- **`pip`** — Python's package installer, how you'll get `pandas` and
  `requests` (Lessons 21 and 23) onto your machine

## Where you actually run this stuff

Every code block from here through Lesson 27 goes in the same place:
a **`.py` file**, opened in VS Code, run from inside VS Code. That's
it — there's no separate "Python console" app, no website. Here's the
exact loop you'll repeat for every lesson in this chapter:

1. **Open a folder in VS Code.** File → Open Folder, and pick (or
   create) a folder for this course's exercises — something like
   `de-foundations-python`.
2. **Create a new file ending in `.py`** — VS Code recognizes the
   extension and switches into Python mode automatically (the blue
   Python logo appears next to the filename).

   ![VS Code Explorer panel showing a file named hello.py just created inside a folder called HELLO, with the file open and empty in the editor to the right.](/courses/de-foundations/ch02/13-python-for-data-engineering/hello-py-created.png)
   *A new `.py` file in VS Code — this is the file every code example in this chapter goes into.*

3. **Type the code.** For example:
   ```python
   msg = "Roll a dice!"
   print(msg)
   ```
4. **Run it.** The ▷ **Run** button in the top-right corner of the
   editor runs the whole file. (Right-click anywhere in the file and
   choose **Run Python File in Terminal** does the exact same thing —
   use whichever you find faster.)

   ![VS Code editor with hello.py open, the Run (play) button highlighted in the top-right toolbar, and two lines of code: msg = "Roll a dice!" and print(msg).](/courses/de-foundations/ch02/13-python-for-data-engineering/run-button.png)
   *Click Run (or right-click → Run Python File in Terminal) — there's no separate "execute" step beyond this.*

5. **Read the output in the Terminal panel** that opens along the
   bottom of VS Code. That panel is just running `python hello.py` for
   you and showing you exactly what it printed:

   ![VS Code's integrated Terminal panel showing the command "python.exe c:/hello/hello.py" and its output, "Roll a dice!"](/courses/de-foundations/ch02/13-python-for-data-engineering/output-in-terminal.png)
   *The Terminal panel — this is where every `print()` statement in this chapter actually shows up.*

That five-step loop — open the folder once, then create a `.py` file,
type code, click Run, read the Terminal — is the entire workflow for
this chapter and for Lesson 27's full ETL script. Nothing about it
changes as the code gets longer; a 40-line script runs exactly the
same way a 2-line one does.

**One more option worth knowing about, not required for this course:**
Jupyter notebooks (`.ipynb` files) let you run code one small block at
a time instead of the whole file at once, which many data scientists
prefer for exploration. VS Code supports them with the Jupyter
extension. This course sticks to plain `.py` files and the Run button
because that's what production ETL scripts and Spark jobs actually are
— but if a future lesson mentions a notebook, this is what it means.

## A preview of where this is going

```python
# This is roughly what Lesson 27's mini ETL script looks like —
# don't worry about understanding all of it yet
import pandas as pd

df = pd.read_csv("yellow_tripdata_2024-01.csv")
df = df[df["fare_amount"] > 0]          # Lesson 16: conditions
df.to_parquet("cleansed/yellow_tripdata_2024-01.parquet")
```

Every piece of that — the import, the function call, the filter, the
write — gets its own lesson before you see this exact pattern again in
Lesson 27.

## Key terms

| Term | Meaning |
|---|---|
| ETL script | Code that reads, transforms, and writes data |
| pip | Python's package installer |
| PySpark | Spark's Python API — Python code that runs on Spark's engine |

## Lab

1. Install Python 3.10+ and Visual Studio Code if you haven't already,
   then open a terminal (VS Code's own Terminal panel works fine —
   View → Terminal) and run:
   ```bash
   python --version
   pip --version
   ```
   Confirm both commands return a version number.
2. Create a folder for this course, open it in VS Code, and create a
   file named `first_script.py` inside it.
3. Type this into the file and save it:
   ```python
   fare_amount = 14.50
   passenger_count = 1
   print("Fare:", fare_amount, "| Passengers:", passenger_count)
   ```
4. Click **Run** (or right-click → **Run Python File in Terminal**) and
   confirm you see `Fare: 14.5 | Passengers: 1` printed in the Terminal
   panel at the bottom of VS Code.

Every lesson from here on gives you code the same way — type it into
this same kind of `.py` file, run it the same way, and check the
Terminal for the output.

## Check yourself

You're ready for Lesson 14 when you can name, without looking, the four
places Python shows up in real data engineering work, and explain why
PySpark isn't "a separate language to learn."
