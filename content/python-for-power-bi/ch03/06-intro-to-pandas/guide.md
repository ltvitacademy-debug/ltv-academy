# Lesson 6 — Introduction to Pandas

**Chapter 3 · Pandas Basics · Lesson 6 of 20**

## What you'll learn

- What Pandas actually is, and why Power BI specifically requires it
- The one line that imports it into every script you'll ever write here
- Turning a dictionary of lists into a real, table-shaped structure
- Why "just enough Pandas" is a genuinely large and useful skill on its own

## What Pandas is

**Pandas** is a Python library — code someone else already wrote, that you
load into your own script instead of rewriting yourself — built
specifically for working with tabular data: rows and columns, exactly like
a spreadsheet or a database table. Lesson 1 already told you why this
matters here: **Power BI can only import a Pandas DataFrame.** Not a list,
not a dictionary, not plain Python data of any other shape. Pandas isn't
optional background knowledge for this course — it's the entire mechanism
that makes Python and Power BI able to talk to each other at all.

## The one import line

Every single script in this course that touches data starts with this
exact line:

```python
import pandas as pd
```

This loads Pandas and gives it the short nickname `pd` — a near-universal
convention, so universal that seeing `pd.anything()` in someone else's
code is instantly recognizable as Pandas, without needing a comment to
explain it.

## From dictionary to DataFrame

Recall Lesson 5: a dictionary of lists is exactly the shape Pandas expects.
Hand it to `pd.DataFrame()`, and it becomes a real, table-shaped structure:

```python
import pandas as pd

data = {
    "Product": ["Widget A", "Widget B", "Widget C"],
    "Units Sold": [120, 85, 200],
    "Revenue": [2400.00, 1700.00, 5000.00]
}

df = pd.DataFrame(data)
print(df)
```

```output
    Product  Units Sold  Revenue
0  Widget A         120   2400.0
1  Widget B          85   1700.0
2  Widget C         200   5000.0
```

Each dictionary key became a column header. Each list became that column's
values. And Pandas added something neither the dictionary nor the lists
had on their own — the numbers down the left side, `0`, `1`, `2` — which
Lesson 7 covers by name.

## Why "just enough Pandas" is still genuinely useful

Pandas is a large library — real data scientists spend careers inside it.
This course isn't trying to cover all of it. It's deliberately scoped to
the handful of operations that show up constantly in real Power BI work:
reading files, cleaning columns, filtering rows, grouping, and joining
tables — Lessons 8 through 17, in that exact order.

## Key terms

| Term | Meaning |
|---|---|
| Library | Pre-written code you load into your own script instead of rewriting |
| Pandas | The library for tabular (row-and-column) data in Python |
| `import pandas as pd` | The standard line that loads Pandas under the nickname `pd` |
| `pd.DataFrame()` | The function that turns a dictionary of lists into a table |

## Lab

1. In a Python file or terminal, write `import pandas as pd` as the very
   first line.
2. Build a dictionary describing three products you'd actually sell, with
   at least two columns of data each.
3. Pass it to `pd.DataFrame()`, assign the result to a variable, and print
   it — confirm it displays as a clean table, not a raw dictionary.

## Check yourself

You're ready for Lesson 7 when you can explain, in one sentence, why
`import pandas as pd` is the first line of nearly every script in this
course — and what specifically about a DataFrame Power BI actually needs.
