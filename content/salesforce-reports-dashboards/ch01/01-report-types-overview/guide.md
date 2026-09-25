# Report Types, Overview

You have already learned how Salesforce stores data (objects, fields, relationships) and how to pull it out with SOQL. This course covers the other way to answer questions from that data: **native Lightning reports and dashboards**. They need no code, business users can run them, and they respect the sharing rules you studied earlier. We will also be honest about their limits, because knowing when a report is enough (and when it is not) is a core analyst skill.

## What you'll learn

- What a report is, and how it differs from a dashboard
- What a report type is, and why it controls everything a report can show
- The four report formats, and how format differs from type
- How the Report Builder is laid out

## Report, dashboard, report type

A **report** is a saved list of records that meet criteria you define. It can filter, group, summarize, and chart. A **dashboard** is a visual layer built from one or more reports (Chapter 5). A **report type** is the template that defines which objects and fields a report can see.

## The report type is a pre-built join

Think back to T-SQL. Before you write a query, you decide which tables to join. A report type makes that decision for you. A standard type such as "Opportunities" exposes the Opportunity object plus the fields you can reach through its lookups, for example Account fields. A type such as "Opportunities with Products" adds the child line items, so each row is an opportunity-product pair.

Custom report types (which an admin builds) go further. You define a primary object and related objects, and for each relationship you choose either "A **with** B" (like an inner join: only records that have related B) or "A **with or without** B" (like a left join). Standard types have this baked in, which is why the choice of type matters so much.

The practical rule: **pick the report type first, because you generally cannot swap it later without rebuilding the report**. If a field you need is missing from the Fields pane, the type is usually the reason.

## Report format is a separate choice

Once you have a type, you choose how to lay out the results:

| Format | What it does |
|---|---|
| Tabular | A flat list of records, like a spreadsheet |
| Summary | Groups rows by one or more fields, with subtotals |
| Matrix | Groups by rows and by columns at the same time |
| Joined | Puts several report blocks side by side |

The same report type can produce any of the first three formats, and you can switch among them while building. Lessons 2 to 5 cover each in depth.

## A tour of the Report Builder

In Lightning Experience, the Report Builder is split into panels:

- **Outline tab:** where you set groups and columns.
- **Filters tab:** where you narrow the records (Chapter 2).
- **Fields pane:** a collapsible list of every field the report type exposes. You drag or click fields into the report.
- **Preview:** a live table showing a limited number of records so the builder stays fast. Use **Run** or **Save & Run** to see the full result.

Menu names shift slightly between releases, so if a button is not exactly where a screenshot shows it, look nearby before assuming something is missing.

## Recap

- A report type defines the objects and fields available; a format defines the layout.
- Pick the type first; the Fields pane can only show what the type exposes.
- The four formats are Tabular, Summary, Matrix, and Joined.
- The Builder's preview is limited; running the report shows everything.

## Check yourself

A colleague wants a report of accounts with no opportunities at all. Which piece of the report do you think decides whether that is possible, the type or the format?
