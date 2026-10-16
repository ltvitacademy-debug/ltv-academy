# Lesson 10 — Modules & Packages

**Chapter 2 · Python for Data Engineers · Lesson 10 of 48**

## What you'll learn

- What a module is, and why Python's standard library is organized
  into them
- `import`, `from ... import ...`, and `import ... as ...`
- A few standard-library modules you'll actually use: `math`,
  `statistics`, `random`, `os`
- What a package is, and how `pip install` fits in — the piece that
  makes `pandas`, `requests`, and every other library in this course
  available

## What is a module

A module is just a `.py` file full of reusable functions (and other
code) that you can pull into your own script. You've technically
already written one — every `.py` file you've saved so far *is* a
module, even if you've never imported it into anything else. Python
also ships with dozens of modules built in, ready to use without
installing anything — that collection is called the **standard
library**.

```python
import math

print(math.sqrt(256))      # 16.0
print(math.ceil(129.01))   # 130 — rounds up to the nearest int
```

`import math` makes everything inside the `math` module available
under the name `math.` — so `math.sqrt()` is "the `sqrt` function that
lives inside the `math` module," not some function you wrote yourself.

## from ... import ... — pulling in specific names

If you only need one or two things from a module, you can import them
directly, skipping the `math.` prefix:

```python
from math import sqrt, ceil

print(sqrt(256))     # 16.0 — no "math." needed now
print(ceil(129.01))  # 130
```

This is a style choice. Keeping the `math.` prefix (plain `import
math`) makes it obvious where a function came from when you're reading
code later; importing names directly makes the call site shorter.
Either is fine — this course generally favors `import module_name` for
clarity, since a long pipeline script benefits from knowing at a glance
where every function lives.

## statistics — summarizing a batch of numbers

```python
import statistics

line_totals = [259.98, 249.50, 79.00, 22.00, 129.99]

print("Average order value:", statistics.mean(line_totals))
print("Median order value:", statistics.median(line_totals))
```

`statistics.mean()` and `statistics.median()` are exactly the kind of
summary numbers you'll compute constantly once you're working with
real batches of records — this is a small preview of what
`pandas.DataFrame.describe()` does automatically, at a much larger
scale, starting in Chapter 4.

## random — useful for sampling and test data

```python
import random

sample_customer_ids = [501, 502, 503, 504, 505]
picked = random.choice(sample_customer_ids)
print("Randomly selected customer:", picked)

random.shuffle(sample_customer_ids)
print("Shuffled order:", sample_customer_ids)
```

`random.choice()` picks one item; `random.shuffle()` reorders a list
in place. You'll reach for these later when generating realistic test
data for a pipeline, without needing a real production data source.

## os — a first look, before Chapter 3's file work

```python
import os

print(os.getcwd())                         # current working directory
print(os.path.exists("orders.csv"))        # True/False — does this file exist here?
```

`os.getcwd()` tells you where your script is running from, and
`os.path.exists()` checks whether a given path is actually there
before you try to open it — a check you'll use constantly starting in
Lesson 13, to avoid crashing on a missing file.

## Packages, and where pip fits in

A **package** is a folder of related modules, bundled and distributed
together — usually downloaded from the Python Package Index (PyPI)
with `pip`, Python's package installer:

```bash
pip install pandas
pip install requests
```

Once installed, a package is imported exactly like a standard-library
module:

```python
import pandas as pd   # "as pd" — a common alias, so you don't retype "pandas" everywhere
```

`import pandas as pd` is the exact line you'll write at the top of
nearly every script from Chapter 4 onward — `as pd` creates an alias,
so every later reference is just `pd.read_csv(...)` instead of the
longer `pandas.read_csv(...)`. The standard-library modules in this
lesson (`math`, `statistics`, `random`, `os`) need no `pip install` at
all — they ship with Python itself. Third-party packages like `pandas`
and `requests` do, which is the only real difference between the two.

## Key terms

| Term | Meaning |
|---|---|
| Module | A `.py` file of reusable code you can `import` |
| Standard library | Modules that ship with Python — no installation needed |
| Package | A distributed, installable bundle of modules, usually via `pip` |
| `pip` | Python's package installer, used to get third-party packages like `pandas` |
| Alias (`as`) | A shorter name given to an imported module, e.g. `import pandas as pd` |

## Lab

Use three standard-library modules together on a batch of order
totals:

```python
import statistics
import random

line_totals = [259.98, 249.50, 79.00, 22.00, 129.99, 45.25]

print("Count:", len(line_totals))
print("Average:", round(statistics.mean(line_totals), 2))
print("Median:", statistics.median(line_totals))
print("Highest:", max(line_totals))
print("Lowest:", min(line_totals))

sample_order = random.choice(line_totals)
print("Randomly sampled order total for a spot-check:", sample_order)
```

Run it a few times and confirm the "randomly sampled" line changes
between runs, while every other line stays the same.

## Check yourself

Without looking back: what's the actual difference between a module
and a package? And why don't `math`, `statistics`, `random`, and `os`
need `pip install`, while `pandas` and `requests` do?
