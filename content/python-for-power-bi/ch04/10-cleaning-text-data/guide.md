# Lesson 10 — Cleaning Text Data

**Chapter 4 · Cleaning & Preparing Data · Lesson 10 of 20**

## What you'll learn

- `.str.strip()` — removing stray spaces that break matches and filters
- `.str.lower()`, `.str.upper()`, `.str.title()` — fixing inconsistent case
- `.str.replace()` — fixing a specific bad value across a whole column
- `.rename()` — cleaning up column names themselves

## Why this is worth a whole lesson

Real data is never as clean as this course's examples have been so far.
Names arrive with extra spaces from copy-pasting, region names show up in
three different capitalizations from three different systems, and a
filter that should catch `"West"` silently misses `" West"` — the space
makes them different strings entirely, even though a human reads them as
identical.

## `.str.strip()`: removing stray spaces

Every string method in Pandas lives behind `.str`, applied to a whole
column at once:

```python
import pandas as pd

df = pd.DataFrame({
    "customer name": ["  Alex Rivera", "JORDAN LEE ", "sam patel"],
    "region": ["west", "EAST", " South "]
})

df["customer name"] = df["customer name"].str.strip()
```

`.strip()` removes leading and trailing whitespace — not spaces in the
*middle* of a value, just the invisible padding at the start and end that
breaks exact-match comparisons.

## Fixing inconsistent case

`.str.lower()`, `.str.upper()`, and `.str.title()` (capitalizes the first
letter of each word) standardize case across a whole column in one line:

```python
df["customer name"] = df["customer name"].str.strip().str.title()
df["region"] = df["region"].str.strip().str.title()
print(df)
```

```output
  customer name region
0   Alex Rivera   West
1    Jordan Lee   East
2     Sam Patel  South
```

Chaining `.str.strip().str.title()` on one line — strip first, then
fix case — is a genuinely common pattern; order matters here since
`.title()` on `"  alex rivera"` would capitalize the space-padded first
letter incorrectly.

## Renaming columns

The column names themselves — `"customer name"`, lowercase with a space —
are exactly the kind of thing worth cleaning too, with `.rename()`:

```python
df = df.rename(columns={"customer name": "Customer Name", "region": "Region"})
```

`.rename()` takes a dictionary: old name as the key, new name as the
value — same dictionary shape Lesson 5 introduced.

## `.str.replace()`: fixing a specific bad value

If one particular value is wrong throughout a column — a misspelled
category, an old product name — `.str.replace()` fixes every occurrence
at once:

```python
df["Region"] = df["Region"].str.replace("Sotuh", "South")
```

## Key terms

| Term | Meaning |
|---|---|
| `.str` | The prefix for every Pandas string-cleaning method |
| `.str.strip()` | Removes leading/trailing whitespace |
| `.str.title()` | Capitalizes the first letter of each word |
| `.rename(columns={...})` | Renames one or more columns using a dictionary |

## Lab

1. Build a small DataFrame with a text column that has inconsistent
   capitalization and stray spaces, similar to this lesson's example.
2. Clean it with `.str.strip()` and `.str.title()`, chained together.
3. Rename at least one column using `.rename()`.

## Check yourself

You're ready for Lesson 11 when you can explain, in one sentence, why
`" West"` and `"West"` are treated as two completely different values
by a filter — and which method fixes that.
