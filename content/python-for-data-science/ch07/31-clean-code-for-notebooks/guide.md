# Clean Code for Notebooks

A notebook is a wonderful place to explore and a terrible place to hide mistakes. The same notebook that took you an hour to write can take a colleague, or you next month, two hours to understand. Clean code is not about style points. It is about making your analysis something other people, including future you, can read, trust, and rerun.

In this lesson we apply a small set of habits that make the biggest difference for the least effort.

## What you'll learn

- Why names, structure, and cell order matter more than clever code
- How to replace cryptic variables and magic numbers with readable ones
- How to turn repeated cell logic into a small documented function
- How to keep a notebook honest with "Restart & Run All"
- A practical layout for a notebook that reads like a report

## Names are documentation

Compare these two versions of the same calculation. The data is a tiny illustrative orders table.

```python
import pandas as pd

d = pd.DataFrame({
    "s": ["c", "c", "r", "c"],
    "q": [2, 1, 3, 4],
    "p": [10.0, 25.0, 8.0, 5.0],
})
x = d[d.s == "c"]
x["t"] = x.q * x.p * 0.92
```

Nobody can tell what `s`, `q`, `p`, or `0.92` mean. Worse, this code triggers pandas' `SettingWithCopyWarning`, because `x` is a slice of `d` and we then assign a new column into it. Here is the cleaned-up version:

```python
orders = pd.DataFrame({
    "status": ["complete", "complete", "returned", "complete"],
    "quantity": [2, 1, 3, 4],
    "unit_price": [10.0, 25.0, 8.0, 5.0],
})

LOYALTY_DISCOUNT = 0.92  # 8% off for loyalty members

def add_order_total(df):
    """Return a copy of df with an order_total column."""
    out = df.copy()
    out["order_total"] = (
        out["quantity"] * out["unit_price"] * LOYALTY_DISCOUNT
    )
    return out

completed = orders[orders["status"] == "complete"]
completed = add_order_total(completed)
```

Running it prints three completed rows with order totals of 18.4, 23.0, and 18.4. Three things changed: descriptive column and variable names, the magic number `0.92` became a named constant with a comment explaining why, and the logic moved into a function that copies its input so it never mutates the caller's data.

## Keep functions small and honest

If you paste the same five lines into three cells, you have a function waiting to be written. A good notebook function does one job, takes its inputs as arguments, returns its result, and has a one-line docstring. Avoid functions that quietly read a global DataFrame defined in some earlier cell. That hidden dependency is exactly what breaks when cells run out of order.

## Cell order and hidden state

Notebooks let you run cells in any order, and the kernel remembers everything. That is the source of the classic "it worked yesterday" bug: a variable you deleted from the code still lives in memory. Build the habit of using **Kernel → Restart & Run All** before you share anything. If it fails or produces different numbers, your notebook depends on state that isn't written down.

## A notebook that reads like a report

A layout that works well for most analyses:

1. **Title and purpose** in a Markdown cell: the question you are answering.
2. **Imports and settings** in one cell at the top, including constants such as file paths and thresholds.
3. **Load** the raw data, and do nothing else in that section.
4. **Clean** using functions.
5. **Analyze** with one idea per section, each with a Markdown heading.
6. **Conclusions** in plain sentences, with numbers.

Two more small rules: keep comments for the why, not the what (`# 8% off for loyalty members` helps; `# multiply` does not), and clear or shorten noisy outputs, since printing a 10,000-row DataFrame helps no one.

## Recap

- Use full, descriptive names and named constants instead of magic numbers.
- Wrap repeated logic in small functions with docstrings that don't mutate their input.
- Copy before you modify, to avoid `SettingWithCopyWarning`.
- Restart and run all before sharing.
- Structure the notebook top to bottom like a report.

Next, we take the next step: moving that reusable logic out of the notebook entirely, into scripts and modules.
