# Lesson 8 — Importing CSV Data with Python

**Chapter 3 · Pandas Basics · Lesson 8 of 20**

## What you'll learn

- `pd.read_csv()` — the one function that turns a file into a DataFrame
- How to sanity-check what just loaded before trusting it
- Running that same script inside Power BI's Get Data dialog
- Loading the result into your Power BI model, from the Navigator

## `pd.read_csv()`: a file becomes a DataFrame

Everything from Lesson 6 built a DataFrame by hand, from a dictionary.
Real work almost never starts that way — it starts with a file. One
function handles it:

```python
import pandas as pd

df = pd.read_csv("sales_sample.csv")
print(df)
```

```output
    Product  Units Sold  Revenue
0  Widget A         120   2400.0
1  Widget B          85   1700.0
2  Widget C         200   5000.0
```

Pandas reads the file's header row as column names automatically, and
infers each column's type from its actual values — exactly the `.dtypes`
check Lesson 7 introduced:

```python
print(df.dtypes)
```

```output
Product        object
Units Sold      int64
Revenue       float64
dtype: object
```

## Sanity-checking before you trust it

Before doing anything else with a freshly loaded file, check its shape
and peek at the first few rows — `.head()` shows the first five by
default, or however many you ask for:

```python
print(df.shape)
# (3, 3)

print(df.head(2))
```

```output
    Product  Units Sold  Revenue
0  Widget A         120   2400.0
1  Widget B          85   1700.0
```

If the row count looks wrong, or a column that should be numbers shows up
as `object` in `.dtypes`, that's your signal to stop and investigate
*before* building anything on top of it — not after.

## Running this inside Power BI

The exact same script runs inside Power BI Desktop. From the **Home**
ribbon, select **Get Data**, then **Other → Python script**:

![Screenshot of the Get Data dialog with Python script highlighted under Other.](/courses/python-for-power-bi/ch03/08-importing-csv/python-scripts-1.png)
*Same "Other" category as R script — Python sits right next to it.*

Paste your script — including the `import pandas as pd` line — into the
**Script** field:

![Screenshot of the Python script dialog with a sample script pasted in.](/courses/python-for-power-bi/ch03/08-importing-csv/python-scripts-6.png)
*Exactly the code you already tested on your own machine — nothing rewritten for Power BI.*

## Loading the result

If the script runs without error, the **Navigator** window shows every
DataFrame your script created, ready to load:

![Screenshot of the Navigator window showing a df table available to load.](/courses/python-for-power-bi/ch03/08-importing-csv/python-scripts-5.png)
*Select the table (usually named after your variable — "df" here) and Load.*

Power BI imports it exactly like any other data source at that point —
it becomes a real table in your model, ready for relationships and DAX,
same as data from Excel or SQL Server.

## Key terms

| Term | Meaning |
|---|---|
| `pd.read_csv()` | Loads a CSV file directly into a DataFrame |
| `.head()` | Shows the first several rows — 5 by default |
| Get Data → Python script | The Power BI dialog that runs a Python script as a data source |
| Navigator | Where Power BI lists DataFrames a script produced, ready to load |

## Lab

1. Save a small CSV file with at least three columns and five rows.
2. In a Python terminal, load it with `pd.read_csv()` and check its
   `.shape`, `.dtypes`, and `.head()`.
3. Run the same script inside Power BI Desktop via **Get Data → Python
   script**, and load the resulting table into your model.

## Check yourself

You're ready for Lesson 9 when you can load a real CSV with Pandas, check
it three different ways before trusting it, and bring that same script
into Power BI without changing a single line.
