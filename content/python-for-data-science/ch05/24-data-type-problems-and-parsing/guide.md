# Data Type Problems & Parsing

In T-SQL you declared a type for every column, so a `MONEY` column could never contain the text `n/a`. Files and APIs make no such promise. When pandas reads a CSV with one stray `n/a` or one `$` sign in a numeric column, it plays safe and stores the whole column as text (dtype `object`). Sums, averages, sorting, and date arithmetic then quietly misbehave. This lesson shows how to catch wrong types and convert them safely.

## What you'll learn

- How to check types with `dtypes` and `info()`
- How to convert messy text to numbers with `pd.to_numeric` and `errors="coerce"`
- How to parse dates with `pd.to_datetime`, and why to specify the `format`
- How to convert yes/no text to booleans and repeated labels to categories

## The practice data

An illustrative raw orders table where everything arrived as text:

```python
import pandas as pd

raw = pd.DataFrame({
    "order_id": ["5001", "5002", "5003", "5004"],
    "amount": ["$1,200.50", "$75.00", "n/a", "$310.25"],
    "order_date": ["2024-03-05", "2024-03-07",
                   "2024-03-09", "not recorded"],
    "shipped": ["Yes", "No", "yes", "N"],
    "tier": ["gold", "silver", "gold", "bronze"],
})

raw.dtypes    # every column: object
```

`object` is pandas' catch-all for text (and mixed) data. `raw.info()` gives the same information plus non-null counts and memory use. Make it the first thing you run on a new dataset.

## Text to numbers

The direct approach fails loudly:

```python
df = raw.copy()
df["amount"].astype(float)
# ValueError: could not convert string to float: '$1,200.50'
```

Remove the symbols, then convert with `to_numeric`. Setting `errors="coerce"` turns anything unparseable into `NaN` instead of raising an error:

```python
df["amount"] = pd.to_numeric(
    df["amount"].str.replace(r"[$,]", "", regex=True),
    errors="coerce",
)
# 1200.50, 75.00, NaN, 310.25
```

The `NaN` for `n/a` is now an ordinary missing value that you can diagnose and handle with the previous lesson's tools. Count how many values coerced to `NaN` so you know how much was unparseable.

## Text to dates

```python
df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")
# 2024-03-05, 2024-03-07, 2024-03-09, NaT
```

`NaT` ("not a time") is the date equivalent of `NaN`. Once the column is a real `datetime64`, you can filter by range, use `.dt.month`, and subtract dates.

### The ambiguous-date trap

Is `03/05/2024` March 5th or May 3rd? It depends on the country, and pandas will not warn you. We ran the same text with two formats:

```python
s = pd.Series(["03/05/2024"])
pd.to_datetime(s, format="%m/%d/%Y")   # 2024-03-05
pd.to_datetime(s, format="%d/%m/%Y")   # 2024-05-03
```

Both succeed, and only one is right. Whenever you know the source's convention, pass `format=` explicitly. Note also that parsing `"12/25/2024"` with the day-first format produced `NaT` when we used `errors="coerce"`, a useful clue that the format is wrong.

## The small conversions

```python
df["order_id"] = df["order_id"].astype(int)
df["shipped"] = (df["shipped"].str.lower().str[0]
                 .map({"y": True, "n": False}))
df["tier"] = df["tier"].astype("category")
```

- **Booleans**: normalize the text first (`"Yes"`, `"yes"`, `"Y"` all start with `y`), then map to `True`/`False`.
- **Integers**: `astype(int)` is fine for ids once you know there are no gaps; a column with `NaN` cannot be a plain `int`.
- **Categories**: a column with a few repeated labels (like a tier) can be stored as `category`, which is more compact and signals that the values come from a fixed set.

Finish with `df.dtypes` to confirm each column now has the type you intended.

## Recap

- Check `dtypes` first; `object` on a numeric-looking column is a red flag.
- Strip symbols, then `pd.to_numeric(..., errors="coerce")`.
- `pd.to_datetime(..., errors="coerce")` gives real dates and `NaT` for junk; state the `format` for ambiguous strings.
- Convert flags to booleans and repeated labels to categories, and re-check types after every change.
