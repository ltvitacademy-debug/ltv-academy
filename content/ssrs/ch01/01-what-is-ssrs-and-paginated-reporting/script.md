# Script — What Is SSRS & Paginated Reporting?

## Segment 1 (title)

Welcome to SSRS Development — SQL Server Reporting Services, and the world of paginated reporting. Before we build anything, let's get clear on what "paginated" actually means, and why this is a genuinely different tool from Power BI, not an older version of it.

## Segment 2 (screenshot: basic-table-report)

A paginated report has a fixed, page-by-page layout — designed to look exactly right whether it's on screen, printed on paper, or exported to PDF or Word. Think invoices, account statements, regulatory filings — documents where the exact layout matters as much as the numbers inside it. This is a real one: grouped by sales date, then subcategory, then product, with a running subtotal printed at every single break. That's layout a printed page can hold still for — an interactive dashboard reflows itself depending on your screen; this never does.

## Segment 3 (screenshot: webportal-new-report)

Once a report's built, it gets published to a Report Server, and from there it lives in a browser-based web portal. This is that web portal's New menu — Paginated Report is one specific item type it knows how to create and manage, right alongside Folder, KPI, Mobile Report, Dataset, and Data Source.

## Segment 4 (screenshot: export-formats)

And "exactly right" doesn't stop at the screen. Run that same report and open the Export menu, and you get CSV, PDF, MHTML, Excel, PowerPoint, TIFF, Word — every one of them holding the identical page breaks and layout. A PDF of a paginated report isn't a lossy snapshot; it's the same fixed design, just in a different file format.

## Segment 5 (steps: RDL)

Every one of those paginated reports is really just an RDL file underneath — Report Definition Language, an XML document describing the datasets, the layout, and the parameters. You'll build those RDL files with one of two tools: Report Builder, a lighter standalone app, or SSDT, the Visual Studio-based, project-oriented option. Lesson 3 covers exactly when to reach for each.

## Segment 6 (outro)

Next lesson, we go deeper into Report Server architecture — what's actually running on that server, and how the pieces fit together.
