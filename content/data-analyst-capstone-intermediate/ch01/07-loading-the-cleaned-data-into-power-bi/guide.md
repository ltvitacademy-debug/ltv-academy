# Lesson 7 — Loading the Cleaned Data into Power BI

**Chapter 1 · Intermediate Capstone: Customer Segment & Territory Report · Lesson 7 of 16**

## What you'll learn

- Using Power Query's "Run Python script" data source
- Why the cleaned pandas DataFrame, not the raw extracts, is what Power BI connects to
- What Power Query actually sees when a Python script step runs
- Why this load step looks different from the Beginner project's plain SQL connector

## A different kind of data source

The Beginner project connected Power BI straight to SQL Server with the standard connector —
Power BI ran the T-SQL, got rows back, done. This project's load step is different, because the
real combined dataset doesn't exist as a table anywhere yet — it only exists as the `combined_df`
DataFrame produced by the Python script from Lessons 5 and 6.

## Get Data → Python script

In Power BI Desktop: **Get Data → More... → Other → Python script**. This opens an editor where
Power Query runs an actual Python script and treats any pandas DataFrame left in memory afterward
as a navigable table.

```python
import pandas as pd

customer_df = pd.read_csv("customer_segment_extract.csv")
territory_df = pd.read_csv("territory_extract.csv")

customer_df = customer_df.drop_duplicates()
customer_df["CustomerSegment"] = customer_df["CustomerSegment"].fillna("Individual")

territory_df["TerritoryName"] = territory_df["TerritoryName"].str.strip().str.title()
territory_df = territory_df.dropna(subset=["LineTotal"])

combined_df = pd.merge(
    customer_df,
    territory_df[["SalesOrderID", "TerritoryName", "TerritoryGroup"]],
    on="SalesOrderID",
    how="left"
)
combined_df["TerritoryName"] = combined_df["TerritoryName"].fillna("Unknown")
combined_df["TerritoryGroup"] = combined_df["TerritoryGroup"].fillna("Unknown")
```

This is the same script from Lessons 5–6, pasted into the Python script step as-is — nothing
about the cleaning logic changes just because it's now running inside Power Query.

## What Power Query sees afterward

Once the script finishes, Power Query's Navigator shows every DataFrame left in that script's
memory as a selectable table — `customer_df`, `territory_df`, and `combined_df` all appear as
options. Only `combined_df` gets selected and loaded; the two intermediate DataFrames did their
job inside the script and don't need to exist as separate tables in the model.

## Why this is a meaningfully different load step

In the Beginner project, Power BI's refresh re-ran a SQL query. Here, Power BI's refresh re-runs an
entire Python script, start to finish, every time — including the `pd.read_csv()` calls at the
top. That detail matters enormously for Lesson 12: it's the exact reason a Python-script source
behaves differently from a plain SQL connector when it comes to scheduling a refresh in the Power
BI Service.

## Key terms

| Term | Meaning |
|---|---|
| Python script data source | A Power Query connector that runs a Python script and exposes resulting DataFrames as tables |
| Navigator | The Power Query pane listing selectable tables/DataFrames after a data source runs |

## Lab

In Power BI Desktop, add the Python script step above (pointing at your own cleaned CSV paths),
confirm all three DataFrames appear in the Navigator, and load only `combined_df` into the model.

## Check yourself

You're ready for Lesson 8 when you can answer, without looking: why do `customer_df` and
`territory_df` appear in the Navigator even though only `combined_df` gets loaded, and what does
Power BI actually re-run on every refresh with this kind of data source?
