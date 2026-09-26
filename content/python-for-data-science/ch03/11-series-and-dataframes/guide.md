# Series & DataFrames

You already know what a table looks like from SQL: named columns, one row per record. In Python, the library that gives you that table is pandas. Everything in this chapter and the next one is built on two objects, the Series and the DataFrame. Learn these two well and the rest of pandas reads like a natural extension of what you already know.

## What you'll learn

- What a pandas Series is and how its index labels the values
- What a DataFrame is and how it relates to a SQL table
- How to build a DataFrame from a dictionary of columns
- Why every DataFrame column is itself a Series
- The first inspection attributes: `shape`, `columns`, `index`, `dtypes`

## Start with the Series

A Series is a one-dimensional column of values with a label attached to each value. If you followed the NumPy chapter, think of it as a NumPy array that carries an index and an optional name.

```python
import pandas as pd

prices = pd.Series([19.99, 45.0, 12.5],
                   index=["A1", "B2", "C3"],
                   name="price")
print(prices)
```

```
A1    19.99
B2    45.00
C3    12.50
Name: price, dtype: float64
```

The left column is the index, the right column holds the values, and the footer tells you the name and the data type. You can pull a value out by its label, and math applies to every value at once, exactly like the vectorized operations you saw in NumPy:

```python
prices["B2"]     # 45.0
prices.mean()    # 25.83
prices * 2       # A1 39.98, B2 90.00, C3 25.00
```

The index is what makes a Series more than an array. Labels travel with the values, so when you combine two Series later, pandas lines them up by label rather than by position.

## The DataFrame: a table in memory

A DataFrame is a two-dimensional table: several Series that share the same index. The most readable way to create one by hand is a dictionary where each key is a column name and each value is a list for that column. Here is the small customers table we will reuse throughout the course. All of the figures in these lessons are illustrative.

```python
customers = pd.DataFrame({
    "customer_id": [101, 102, 103, 104, 105],
    "name": ["Ava Chen", "Ben Ortiz", "Cara Singh",
             "Dan Wu", "Eli Novak"],
    "city": ["Austin", "Boston", "Austin",
             "Denver", "Boston"],
    "segment": ["Retail", "Retail", "Business",
                "Business", "Retail"],
})
print(customers)
```

```
   customer_id        name    city   segment
0          101    Ava Chen  Austin    Retail
1          102   Ben Ortiz  Boston    Retail
2          103  Cara Singh  Austin  Business
3          104      Dan Wu  Denver  Business
4          105   Eli Novak  Boston    Retail
```

Compare this to a `SELECT * FROM customers` result in SQL. The columns are the same idea. The row labels on the far left are new: that is the index, and because we did not supply one, pandas created a default `RangeIndex` counting from 0.

## Every column is a Series

Select one column with square brackets and you get a Series back:

```python
type(customers["city"])   # pandas.core.series.Series
customers["city"]
```

```
0    Austin
1    Boston
2    Austin
3    Denver
4    Boston
Name: city, dtype: object
```

This is the key mental model: a DataFrame is a dictionary-like collection of Series that share an index. Anything you can do to a Series, you can do to a column.

## Inspecting what you built

Four attributes answer the first questions you should ask about any table:

```python
customers.shape      # (5, 4)   rows, columns
customers.columns    # Index(['customer_id', 'name', 'city', 'segment'], dtype='object')
customers.index      # RangeIndex(start=0, stop=5, step=1)
customers.dtypes     # customer_id int64; the others object
```

Notice that text columns show up as `object`. In pandas 1.x that is how plain strings are stored, and it is one of the first things you check when a column does not behave the way you expect. Also notice that these are attributes, not method calls: no parentheses after `shape`, `columns`, `index` or `dtypes`.

## Recap

A Series is one labeled column of values. A DataFrame is a table of Series sharing an index. Build one from a dictionary of lists, pull out a column with brackets to get a Series, and use `shape`, `columns`, `index` and `dtypes` to describe what you have. Next lesson we stop typing data by hand and load a real file.
