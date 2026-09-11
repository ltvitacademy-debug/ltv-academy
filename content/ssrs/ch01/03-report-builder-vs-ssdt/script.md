# Script — Report Builder vs. SSDT/Visual Studio

## Segment 1 (title)

We've covered the report server side. Now let's talk about the two tools you'll actually author reports in — Report Builder and SSDT — and get one thing straight up front: they're not competing formats, they build the exact same RDL file underneath.

## Segment 2 (screenshot: report-builder-getting-started)

Report Builder is a stand-alone, Office-like application — no Visual Studio, no project required. You can launch it straight from the web portal's New menu, and it's built for business users and IT pros who want to create or tweak a report quickly. This is a sample Report Builder report — a matrix with sparklines and a summary chart, alongside a spatial map. Report Builder ships wizards for tables, matrices, charts, and maps, and it can even publish straight to the Power BI service. One limit worth knowing: you can't create a brand-new shared data source in Report Builder — only browse to one that already exists on the server.

## Segment 3 (screenshot: ssdt-report-designer)

SSDT's Report Designer is a different working style entirely — it lives inside Visual Studio, organized around a Report Server Project that holds every report, shared data source, and dataset together in Solution Explorer. That's the Design and Preview tabs you'll live in for most of this course. The project structure buys you source control integration and a Configuration Manager for switching between deployment targets — Debug pointing at a test server, Release pointing at production — plus the ability to actually create new shared data sources as project files, which Report Builder can't do.

## Segment 4 (outro)

Next lesson, we'll actually create one of these Report Server Projects in SSDT, from File > New > Project all the way to your first report file.
