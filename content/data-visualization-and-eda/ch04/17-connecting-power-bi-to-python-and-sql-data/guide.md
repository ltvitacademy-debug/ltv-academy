# Connecting Power BI to Python & SQL Data

Up to now you have explored data in Python. Power BI is the other tool many analysts and stakeholders live in, and as a data scientist you will often need to hand findings to people who would rather click a report than read a notebook. This lesson covers the plumbing: how to bring your data into Power BI Desktop from SQL Server and from Python, and where the two approaches have limits. You already know SQL and pandas, so the focus is on how Power BI works with them. Menu names below follow Microsoft's documentation as of this writing and can change between releases, so check the current docs if something looks different.

## What you'll learn

- How to connect Power BI Desktop to a SQL Server database, and how Import differs from DirectQuery
- How to enable Python scripting and use a Python script as a data source
- How to run a Python step inside Power Query
- The main limits to know before you rely on Python in a report

## Connecting to SQL Server

In Power BI Desktop, choose **Get data** and then **SQL Server database**. The dialog asks for the **Server**, an optional **Database**, and a **Data Connectivity mode**: **Import** or **DirectQuery**. After you click OK you choose an authentication type (Windows, Database, or organizational account, depending on your server) and then pick tables in the **Navigator** window. **Load** brings them straight in, while **Transform Data** opens Power Query first.

- **Import** copies the data into the Power BI file. It is fast and supports every feature, but the data is a snapshot until you refresh.
- **DirectQuery** leaves the data in the source and queries it at report time, so it stays current, but it is generally slower and has restrictions on Power Query transformations.

For exploratory work on data of modest size, Import is usually the simpler choice.

Under **Advanced options** there is a **SQL statement** box. Pasting a query there sends your SQL to the server, so the heavy filtering and aggregation happen in the database. For example (illustrative table and column names, assuming your customer data lives in a table called `dbo.customers`):

```sql
SELECT region,
       COUNT(*) AS customers,
       AVG(CAST(churned AS float)) AS churn_rate
FROM dbo.customers
GROUP BY region;
```

Because you already write SQL, this is often the cleanest route: shape the data in the database, load a small result.

## Enabling Python scripting

Power BI runs your script with a Python installation on your own machine, so install Python first, plus the `pandas` and `matplotlib` packages the integration needs. Then go to **File > Options and settings > Options > Python scripting** and pick the Python home directory. Microsoft's guidance is to use the official distribution from python.org, because environments that need an extra activation step, such as Conda, might fail to run.

## Python as a data source

Choose **Get data > Other > Python script**, paste a script into the box, and click OK. Power BI runs it, and the data frames the script creates appear as tables in the Navigator. Only pandas data frames are imported. A minimal script using this chapter's illustrative customer file (use a full path, as Microsoft recommends for anything path-related):

```python
import pandas as pd

customers = pd.read_csv(r"C:\data\customers.csv")
by_region = (customers.groupby("region", as_index=False)
             .agg(customers=("churned", "size"),
                  churn_rate=("churned", "mean")))
```

I ran this outside Power BI, and it creates two data frames, `customers` and `by_region`. The region table came out as East 144 customers at 0.153, North 150 at 0.193, South 99 at 0.293, and West 107 at 0.215, matching the earlier lessons. Refreshing the report re-runs the script.

## A Python step inside Power Query

You can also transform data you already loaded. In the Power Query Editor, open the **Transform** tab and select **Run Python script**. The current table arrives in your script as a pandas data frame named `dataset`, and the data frames you leave behind become the step's output. Here is the outlier flag from the previous lesson:

```python
q1, q3 = dataset["total_spend"].quantile([0.25, 0.75])
upper = q3 + 1.5 * (q3 - q1)
dataset["spend_flag"] = dataset["total_spend"] > upper
```

Run against the practice file, this flags 19 rows and produces a boolean column. After adding a step like this, check the resulting column types in Power Query.

## Limits to know

Per Microsoft's documentation as of this writing:

- A Python script that runs longer than 30 minutes times out, and scripts cannot wait for interactive input.
- Nested tables are not supported.
- Data sources involved in a query with a Python script need their privacy level set to **Public**, which is a real consideration if your data is sensitive.
- To refresh a Python-based dataset in the Power BI service you need scheduled refresh plus a Personal Gateway on the machine where the file and Python live.
- The service supports only a fixed list of Python packages, published on PyPI, for visuals, and private packages are not supported.

In short, Python in Power BI is great for prototyping and one-off shaping, but for anything a team depends on every day, prefer doing the heavy work upstream in SQL or a pipeline and loading the result.

## Recap

- SQL Server: Get data, choose Import or DirectQuery, optionally paste a SQL statement.
- Python: enable scripting, then use Get data > Other > Python script, or Transform > Run Python script (input named `dataset`).
- Mind the privacy-level, gateway, and package restrictions before you depend on Python in a shared report.

Next: building exploratory reports.
