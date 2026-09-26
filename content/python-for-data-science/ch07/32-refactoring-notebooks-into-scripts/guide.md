# Refactoring Notebooks Into Scripts

Notebooks are ideal for exploring. But once your cleaning logic works, leaving it buried in cell 47 has real costs: you can't test it, you can't run it on a schedule, and two people can't easily edit it at once. Refactoring means moving the reusable parts into plain Python files while keeping the notebook for what it does best: exploring and presenting.

This lesson takes the tiny orders cleaning logic from the last lesson and turns it into a small, runnable project.

## What you'll learn

- When to move code out of a notebook, and what to leave behind
- How to organize functions into a module you can import
- How to write a script with a `main()` function and command-line arguments
- How to import your module back into a notebook
- A simple project layout you can reuse

## What moves out, what stays

A useful rule of thumb: **anything you would want to run twice, or test, moves out.** That usually means loading, cleaning, and feature-building steps. **What stays in the notebook** is the exploration, the charts, and the narrative explaining what you found.

The refactoring path has four steps:

1. Get the notebook working top to bottom (Restart & Run All).
2. Turn repeated or important cells into functions.
3. Move those functions into a `.py` module.
4. Add a script that wires the functions together.

## The project layout

```
orders_project/
    data/
        orders_raw.csv
    orders_pipeline/
        __init__.py
        cleaning.py
    run_pipeline.py
    analysis.ipynb
```

The folder `orders_pipeline` is a package (the empty `__init__.py` marks it as one). Inside it, `cleaning.py` holds the functions.

## Step 1: the module

```python
# orders_pipeline/cleaning.py
import pandas as pd


def standardize_region(df):
    """Trim whitespace and title-case the region column."""
    out = df.copy()
    out["region"] = out["region"].str.strip().str.title()
    return out


def add_revenue(df):
    """Add revenue = quantity * unit_price."""
    out = df.copy()
    out["revenue"] = out["quantity"] * out["unit_price"]
    return out


def clean_orders(raw):
    """Full cleaning pipeline: dedupe, standardize, add revenue."""
    return (
        raw.drop_duplicates(subset="order_id")
        .pipe(standardize_region)
        .pipe(add_revenue)
    )
```

Each small function does one job and returns a new DataFrame. `clean_orders` chains them with `.pipe()`, which passes the DataFrame into each function in turn.

## Step 2: the script

```python
# run_pipeline.py
import argparse
from pathlib import Path

import pandas as pd

from orders_pipeline.cleaning import clean_orders


def main():
    parser = argparse.ArgumentParser(description="Clean the orders file.")
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()

    raw = pd.read_csv(args.input)
    clean = clean_orders(raw)
    clean.to_csv(args.output, index=False)
    print(f"Read {len(raw)} rows, wrote {len(clean)} rows to {args.output.name}")


if __name__ == "__main__":
    main()
```

Two ideas here deserve a name. `argparse` turns command-line flags into a tidy `args` object, so file paths are not hard-coded. And `if __name__ == "__main__":` means "only run `main()` when this file is executed directly," so importing the file elsewhere does not trigger it. Using `pathlib.Path` for paths keeps the code working on Windows, macOS, and Linux.

Run it from the project folder:

```
python run_pipeline.py --input data/orders_raw.csv --output data/orders_clean.csv
```

With our five-row sample (one duplicate order), it prints `Read 5 rows, wrote 4 rows to orders_clean.csv`. The output file has cleaned regions (North, South, East) and a revenue column.

## Step 3: use it from the notebook

Back in `analysis.ipynb`, one cell replaces dozens:

```python
from orders_pipeline.cleaning import clean_orders
import pandas as pd

clean = clean_orders(pd.read_csv("data/orders_raw.csv"))
```

This works when the notebook runs from the project folder. If you keep editing the module while the notebook is open, the IPython magics `%load_ext autoreload` and `%autoreload 2` reload changes automatically.

## Recap

- Move anything you'd rerun or test into functions, then into a module.
- Keep exploration, charts, and commentary in the notebook.
- A script with `main()`, `argparse`, and the `__main__` guard is repeatable and schedulable.
- Use `pathlib` and arguments instead of hard-coded paths.

Next, we protect this code with automated tests.
