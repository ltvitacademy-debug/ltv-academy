# Script — What Is SSRS & Paginated Reporting?

## Segment 1 (title)

Welcome to SSRS Development — SQL Server Reporting Services, and the world of paginated reporting. Before we build anything, let's get clear on what "paginated" actually means, and why this is a genuinely different tool from Power BI, not an older version of it.

## Segment 2 (screenshot: webportal-new-report)

A paginated report has a fixed, page-by-page layout — designed to look exactly right whether it's on screen, printed on paper, or exported to PDF or Word. Think invoices, account statements, regulatory filings — documents where the exact layout matters as much as the numbers inside it. That's a genuinely different design goal from Power BI's interactive, on-screen exploration, which is why both tools are still very much alive in the Microsoft BI stack today.

Once a report's built, it gets published to a Report Server, and from there it lives in a browser-based web portal. This is that web portal's New menu — Paginated Report is one specific item type it knows how to create and manage, right alongside Folder, KPI, Mobile Report, Dataset, and Data Source.

## Segment 3 (steps: RDL)

Every one of those paginated reports is really just an RDL file underneath — Report Definition Language, an XML document describing the datasets, the layout, and the parameters. You'll build those RDL files with one of two tools: Report Builder, a lighter standalone app, or SSDT, the Visual Studio-based, project-oriented option. Lesson 3 covers exactly when to reach for each.

## Segment 4 (outro)

Next lesson, we go deeper into Report Server architecture — what's actually running on that server, and how the pieces fit together.
