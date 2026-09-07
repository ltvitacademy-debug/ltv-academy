# Lesson 6 — Understanding Power BI Data Sources

**Chapter 2 · Connecting to Data · Lesson 1 of 6**

## What you'll learn

- The seven categories Power BI Desktop organizes its data connectors into
- Where to find them, and the difference between the quick list and the full dialog
- The connection pattern every source follows, no matter which one you pick
- What's coming in the rest of this chapter

## Hundreds of connectors, seven categories

Power BI Desktop can connect to an enormous number of data sources — Excel
files, databases, cloud services, and dozens of specific business
applications. That sounds overwhelming until you notice they're all sorted
into just seven categories:

![Screenshot of the Get Data dialog box in Power BI Desktop, listing categories: All, File, Database, Microsoft Fabric, Power Platform, Azure, Online Services, Other.](/courses/power-bi/ch02/06-data-sources/data-sources-02.png)
*Every connector Power BI ships with lives in one of these categories. Memorize the categories, not the full list — new connectors get added monthly.*

| Category | What lives here |
|---|---|
| **File** | Excel, CSV/Text, XML, JSON, PDF, folders, SharePoint folders |
| **Database** | SQL Server, Oracle, MySQL, PostgreSQL, Snowflake, and dozens more |
| **Microsoft Fabric** | Semantic models, dataflows, warehouses, lakehouses |
| **Power Platform** | Dataverse, Power BI dataflows |
| **Azure** | Azure SQL Database, Blob Storage, Data Lake, Synapse, and more |
| **Online Services** | Salesforce, Dynamics 365, Google Analytics, SharePoint Online |
| **Other** | Web, OData, ODBC, R and Python scripts, and anything that doesn't fit elsewhere |

You will never need to memorize which of the (literally) hundreds of specific
connectors lives where. What matters is knowing the categories exist, so when
you need "a database" or "something from Azure," you know where to look.

## Two ways to open Get Data

The **Home** ribbon's **Get data** button opens a short list called **Common
data sources** — the handful you'll reach for most often.

![Screenshot of the Get data button on the Home ribbon in Power BI Desktop, showing a dropdown list of common data sources including Excel workbook, SQL Server, Text/CSV, and Web.](/courses/power-bi/ch02/06-data-sources/data-sources-01.png)
*The fast path. If your source isn't on this short list, select "More" at the bottom to open the full dialog.*

That full dialog is the one with all seven categories, reachable either from
**More** on the quick list, or by clicking the **Get data** icon itself
rather than the label.

Note

Power BI Desktop also has a newer **Get Data (Power Query)** preview
experience with a different layout. This course teaches the classic dialog
shown above, since it's stable and what you'll see in most real workplaces
today — but the categories and connectors themselves are identical either
way.

## Every connector follows the same pattern

Pick **Web**, and here's the **Other** category with Web highlighted:

![Screenshot of the Get Data dialog box with the Other category selected and Web highlighted in the list of connectors.](/courses/power-bi/ch02/06-data-sources/data-sources-08.png)
*Web is one connector among dozens in Other alone. The category tells you roughly what kind of source it is; the connector itself decides what info it needs from you next.*

Select **Connect**, and you're asked for the specific detail that source
needs — a URL, in this case:

![Screenshot of the From Web dialog box with a URL entered.](/courses/power-bi/ch02/06-data-sources/datasources-fromwebbox.png)
*A URL for Web. A server name for a database. A file path for a folder. The prompt changes; the idea — "tell me where this lives" — doesn't.*

And no matter which of the hundreds of connectors you started from, you land
in the same place: the **Navigator**, where you choose what to load.

![Screenshot of the Navigator dialog box showing a table of data with Load and Transform Data buttons.](/courses/power-bi/ch02/06-data-sources/datasources-fromnavigatordialog.png)
*Every connector ends here. Select what you want, then Load — or Transform Data to clean it up first in Power Query Editor (Chapter 3).*

That's the whole mental model for this chapter: **category → connector →
connection details → Navigator → Load.** The next five lessons just walk
through that pattern for specific sources: Excel, CSV/Text files, SQL
databases, and Web/JSON/REST APIs — plus the important decision, once
connected, of *Import* versus *DirectQuery* for how your data stays linked.

## Key terms

| Term | Meaning |
|---|---|
| Get Data dialog | The full list of every connector, organized into 7 categories |
| Common data sources | The short quick-access list on the Get data button itself |
| Connector | A specific data source type (Excel, SQL Server, Web, etc.) |
| Navigator | Where you pick which tables/data to load, for any connector |
| PBIDS file | A saved connection (source + settings, no data) that others can open to quickly build a new report against the same source |

## Lab

1. In Power BI Desktop, open **Get data** and look at the **Common data
   sources** quick list, then select **More** to see the full dialog.
2. Click through all seven categories without connecting to anything. Just
   notice roughly what kind of source lives in each one.
3. Pick any one connector you don't recognize and read its one-line
   description in the dialog.

## Check yourself

You're ready for Lesson 7 when you can name all seven data source
categories from memory, and explain the four-step pattern every connector
follows: pick a source, give it connection details, land in Navigator,
Load (or Transform Data first).
