# Handling Dates & Times

Almost every business table has a date: when an order was placed, when a customer signed up, when a ticket was closed. Dates are also where data goes wrong most often, because they arrive as text in a dozen formats. pandas has first-class support for dates and times. This lesson covers the four skills you need: parsing, extracting parts, doing date math, and summarizing by period.

We continue with the illustrative `orders` table, whose `order_date` column was loaded as plain text (dtype `object`).

## What you'll learn

- Converting text to real dates with `pd.to_datetime`
- Handling ambiguous formats and bad values
- Extracting the year, month and weekday with the `.dt` accessor
- Filtering by date and calculating differences
- Summarizing by month with `resample`

## Parse text into dates

```python
orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["order_date"].dtype   # datetime64[ns]
```

Now the column holds true timestamps rather than strings. That unlocks everything below.

Ambiguity is the classic trap. Is `03/04/2024` March 4 or April 3? By default pandas reads it month first. Tell it otherwise with `dayfirst=True`, or better, state the exact format with `format=`:

```python
pd.to_datetime("03/04/2024")                 # 2024-03-04
pd.to_datetime("03/04/2024", dayfirst=True)  # 2024-04-03
pd.to_datetime("04-03-24", format="%d-%m-%y")  # 2024-03-04
```

Specifying `format` is the safest choice for production code, because it removes guessing. In a format string `%d` is the day, `%m` the month, `%y` a two-digit year and `%Y` a four-digit year.

When a column contains junk, use `errors="coerce"` to turn unparseable values into `NaT` ("not a time", the date version of `NaN`) instead of crashing:

```python
s = pd.Series(["2024-01-05", "not a date"])
pd.to_datetime(s, errors="coerce")
```

```
0   2024-01-05
1          NaT
dtype: datetime64[ns]
```

Afterward, count the `NaT` values so you know how much data failed to parse.

## Extract parts with .dt

Once a column is a datetime, the `.dt` accessor exposes its components:

```python
d = orders["order_date"]
d.dt.year          # 2024 for all eight rows
d.dt.month         # 1, 1, 1, 2, 2, 2, 3, 3
d.dt.day_name()    # Friday, Sunday, Monday, ...
d.dt.dayofweek     # 4, 6, 0, 4, 6, 2, 4, 5  (Monday = 0)
```

Use these to build features such as "is weekend" or "month of purchase". Note that `dayofweek` numbers Monday as 0.

## Filter by date

You can compare a datetime column with a date string, and pandas converts it for you:

```python
orders[orders["order_date"] >= "2024-02-01"]
orders[orders["order_date"].between("2024-01-10", "2024-02-15")]
```

The first returns orders 4 through 8; the second returns orders 3 through 6. As in SQL, `between` includes both end points.

## Date math

Subtracting two dates gives a `Timedelta`, and `.dt.days` turns it into a plain number. Suppose today, for the analysis, is March 31, 2024:

```python
snapshot = pd.Timestamp("2024-03-31")
orders["days_ago"] = (snapshot - orders["order_date"]).dt.days
```

```
   order_id  order_date  days_ago
0         1  2024-01-05        86
1         2  2024-01-07        84
...
7         8  2024-03-09        22
```

That "days since" column is the basis of recency measures used in customer analysis. You can also add time: `orders["order_date"] + pd.Timedelta(days=30)` gives a due date 30 days later.

## Summarize by period

Set the date as the index, then `resample` groups by calendar period, much like `GROUP BY` on a truncated date:

```python
orders.set_index("order_date")["amount"].resample("M").sum()
```

```
order_date
2024-01-31    255.49
2024-02-29    385.25
2024-03-31    259.99
Freq: M, Name: amount, dtype: float64
```

Each row is labeled with the last day of its month. `"M"` means month end; other common codes are `"W"` for week and `"D"` for day. Missing amounts are skipped by `sum`, so February's total counts only the two orders that have amounts.

A simpler route, when you only need counts, is `to_period`:

```python
orders["order_date"].dt.to_period("M").value_counts().sort_index()
```

which returns 3 orders for 2024-01, 3 for 2024-02 and 2 for 2024-03.

## Recap

Convert text with `pd.to_datetime`, and prefer an explicit `format`. Use `errors="coerce"` to survive bad values, then count the `NaT`s. The `.dt` accessor extracts parts, subtraction creates timedeltas, and `resample` or `to_period` summarize by period. Next chapter: powerful grouped aggregation with `groupby`.
