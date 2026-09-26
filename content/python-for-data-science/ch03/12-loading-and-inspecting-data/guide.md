# Loading & Inspecting Data

Typing a five-row DataFrame by hand was fine for learning. Real work starts with a file: a CSV export from a system, a download from a colleague, a dump from a database. This lesson covers how to load a CSV into pandas and, just as important, the short inspection routine you should run on every dataset before you trust it.

## What you'll learn

- How to load a CSV with `pd.read_csv`
- The most useful `read_csv` options: `usecols`, `parse_dates`, `nrows`
- The five-step inspection routine: `head`, `tail`, `info`, `describe`, `isna`
- How to read the output of `info()` and spot problems at a glance
- Why an inspection habit saves hours later

## Loading a CSV

To keep every example in this lesson runnable on its own, we will read from a string using `io.StringIO`, which behaves like a file. With a real file you would pass a path instead, for example `pd.read_csv("orders.csv")`. Everything else stays identical.

```python
import io
import pandas as pd

csv = """order_id,customer_id,order_date,amount,status
1,101,2024-01-05,120.50,shipped
2,102,2024-01-07,89.99,shipped
3,101,2024-01-15,45.00,returned
4,103,2024-02-02,310.00,shipped
5,104,2024-02-11,,pending
6,105,2024-02-14,75.25,shipped
7,103,2024-03-01,199.99,shipped
8,102,2024-03-09,60.00,cancelled
"""
orders = pd.read_csv(io.StringIO(csv))
```

This is the illustrative orders table we will reuse. Note that order 5 has an empty amount, on purpose: real data is never perfectly complete.

## Step 1: look at the edges

```python
orders.head(3)
```

```
   order_id  customer_id  order_date  amount   status
0         1          101  2024-01-05  120.50  shipped
1         2          102  2024-01-07   89.99  shipped
2         3          101  2024-01-15   45.00  returned
```

`head(n)` shows the first `n` rows and `tail(n)` shows the last `n`. The default is 5. Checking both ends catches files where the header is wrong or where a total row was appended at the bottom.

## Step 2: info() for structure

```python
orders.info()
```

```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 8 entries, 0 to 7
Data columns (total 5 columns):
 #   Column       Non-Null Count  Dtype
---  ------       --------------  -----
 0   order_id     8 non-null      int64
 1   customer_id  8 non-null      int64
 2   order_date   8 non-null      object
 3   amount       7 non-null      float64
 4   status       8 non-null      object
```

Read this like a checklist. Eight entries, but `amount` shows only 7 non-null, so one value is missing. And `order_date` is `object`, which means pandas read the dates as plain text. That is the most common surprise in freshly loaded data.

## Step 3: describe() for numbers

```python
orders.describe()
```

For each numeric column you get the count, mean, standard deviation, minimum, quartiles and maximum. In our data the `amount` column has a count of 7, a minimum of 45.0 and a maximum of 310.0. Scan for values that make no business sense, such as negative amounts. Notice also that `describe()` happily summarizes `order_id` and `customer_id`, even though averaging an ID means nothing. pandas cannot know which numbers are really labels, so that judgment is yours.

Pass `include="object"` to summarize text columns instead: you get the count, the number of unique values, the most common value and how often it appears.

## Step 4: count the missing values

```python
orders.isna().sum()
```

```
order_id       0
customer_id    0
order_date     0
amount         1
status         0
dtype: int64
```

`isna()` returns a table of True/False flags and `sum()` counts the Trues per column. This is the quickest way to see how much is missing and where.

## Fix problems while loading

Often you can fix issues at load time instead of afterwards. `parse_dates` converts columns to real dates, `usecols` keeps only the columns you need, and `nrows` reads just the first few rows of a huge file so you can explore quickly.

```python
o2 = pd.read_csv(io.StringIO(csv),
                 parse_dates=["order_date"],
                 usecols=["order_id", "order_date", "amount"])
o2.dtypes
```

```
order_id               int64
order_date    datetime64[ns]
amount               float64
dtype: object
```

The date column is now `datetime64[ns]`. We will use it properly in the dates lesson.

## Recap

Load with `read_csv`, then always run the routine: `head` and `tail` for the edges, `info` for types and non-null counts, `describe` for numeric ranges, and `isna().sum()` for missing values. Two minutes of inspection tells you what cleaning is ahead. Next we learn to select exactly the rows and columns we want.
