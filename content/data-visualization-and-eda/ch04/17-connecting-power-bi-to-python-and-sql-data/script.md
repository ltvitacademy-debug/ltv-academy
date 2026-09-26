# Script — Connecting Power BI to Python & SQL Data

## Segment 1 (title)

Power BI is the other tool many stakeholders live in. This lesson covers the plumbing: getting your data into Power BI Desktop from SQL Server and from Python. Menu names follow Microsoft's documentation as of this writing, so check current docs if something looks different.

## Segment 2 (screenshot)

For SQL Server, choose Get data, then SQL Server database. Enter the server, an optional database, and a connectivity mode. Import copies the data into the file: it is fast and full featured, but it is a snapshot until you refresh. DirectQuery leaves the data in the source and queries it at report time, so it stays current but is generally slower and more restricted.

## Segment 3 (code)

Under advanced options, you can paste a SQL statement. Because you already write SQL, this is often the cleanest route: aggregate in the database and load a small result. This example uses an illustrative table name.

## Segment 4 (screenshot)

Python takes one setup step. Install Python, plus pandas and matplotlib, then open Options and choose your Python home directory. Microsoft recommends the official python dot org distribution, because environments such as Conda might fail to run.

## Segment 5 (screenshot)

Then choose Get data, Other, Python script. Paste a script, and Power BI runs it and imports the resulting data frames. Refreshing the report runs the script again.

## Segment 6 (code)

Only pandas data frames import. This script creates two, the customer table and a churn summary by region, and I ran it outside Power BI to confirm it works. Use full file paths, because relative paths are not reliable here.

## Segment 7 (code)

You can also transform data you already loaded. In Power Query, open Transform, then Run Python script. The current table arrives as a data frame named dataset. Here is the outlier flag from last lesson, which flags nineteen rows on the practice file. After adding a step like this, check the column types.

## Segment 8 (outro)

Know the limits. Scripts time out after thirty minutes, data sources need a Public privacy level, and refreshing in the service needs a personal gateway. So do heavy work upstream in SQL when a team depends on it. Up next, building exploratory reports.
