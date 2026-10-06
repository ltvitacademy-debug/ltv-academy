# Data Models

The data model is the "where does the data come from" half of every BI Publisher report. This lesson goes one level deeper than lesson 15's overview: what a data model actually contains, how data sets and parameters work, and the XML output every template eventually consumes.

## What you'll learn

- Data sets: the queries that make up a data model
- Parameters: letting a report prompt for input before it runs
- How multiple data sets combine into one data model
- The XML structure that gets handed off to a template

## Data sets: the queries inside a data model

A BI Publisher data model is built from one or more **data sets** — each one essentially a query against a data source, returning the rows and columns needed for the report. In an Oracle Fusion Financials context, a data set is commonly built against predefined Oracle view objects or an existing subject area (including, in some cases, OTBI subject areas) rather than hand-written raw SQL against physical tables, though SQL-based data sets are also supported for more complex or customized reporting needs.

A report can have just one data set (a simple list) or several, combined — for example, a header data set for company information and a separate detail data set for invoice line items, combined into one coherent XML output that a template can then lay out as a header section followed by a repeating detail table.

## Parameters: letting the report ask before it runs

Just as an OTBI analysis can use a prompt (lesson 12), a BI Publisher data model can define **parameters** — values a user supplies before the report runs, such as a date range, a specific business unit, or a minimum dollar amount. Parameters flow into the data set's query as filter conditions, so the same report definition can be run for different slices of data without anyone editing the underlying query. A well-designed financial report almost always has at least a period or date-range parameter and often a ledger or business unit parameter, mirroring the point-of-view concept you saw in Financial Reporting Studio.

## Combining data sets

When a data model has more than one data set, they're typically linked — for example, a detail data set filtered by the same invoice ID referenced in a header data set — so the combined XML nests detail rows correctly beneath their corresponding header. Getting this structure right matters enormously, because a template can only lay out the XML shape it's actually given; a flattened, incorrectly structured data model forces awkward workarounds in the template layer that a well-structured data model would have avoided entirely.

## The XML output

Whatever the data model's sources and structure, the end result handed to the template is always **XML** — a self-describing hierarchy of tags representing the retrieved data. A report author can typically preview or download this XML directly from the data model, before any template is involved, which is also how a template gets built in the first place: lesson 17 covers using that sample XML inside Microsoft Word to build an RTF template.

## Recap

A data model defines where a BI Publisher report's data comes from, through one or more data sets (queries), optionally filtered by parameters a user supplies at run time, with the combined result always expressed as XML. Getting the data set structure right is what makes the next step — building a template against that XML — straightforward rather than painful. Next up, lesson 17: report templates.
