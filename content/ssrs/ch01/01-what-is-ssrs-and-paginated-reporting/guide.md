# Lesson 1 — What Is SSRS & Paginated Reporting?

**Chapter 1 · SSRS Fundamentals · Lesson 1 of 40**

## What you'll learn

- What SQL Server Reporting Services (SSRS) is, and what "paginated"
  actually means
- Why paginated reports and Power BI reports solve genuinely different
  problems, not competing versions of the same one
- Where a finished paginated report actually lives once it's published
- What "report definition" and RDL mean

## Paginated: designed to be printed, not just viewed on screen

**SQL Server Reporting Services (SSRS)** is Microsoft's on-premises
platform for creating, deploying, and managing **paginated reports** —
report definitions with a genuinely fixed, page-by-page layout. That
word "paginated" is the whole point: a paginated report is designed to
look exactly right whether it's on screen, printed on paper, or exported
to a PDF or Word document, page breaks and all. Think invoices, account
statements, and regulatory filings — documents where the exact layout
matters, not just the numbers inside it.

## Why this isn't "the old Power BI"

If you've already worked through the Power BI course, you might assume
SSRS is just an older way to do the same thing. It isn't. Power BI is
built for **interactive, on-screen analytical exploration** — clicking,
filtering, drilling into a dashboard that adapts to your screen. SSRS is
built for **fixed, precise, printable output**. Both tools are still
very much alive in the Microsoft BI stack because they answer different
questions: "let me explore this data" versus "give me this exact
document, formatted exactly right, every time."

## Where a report actually lives once it's published

A finished paginated report gets published to a **Report Server**,
which exposes a browser-based **web portal** where anyone with
permission can browse folders, run reports, and manage their settings.

![The web portal's New menu, with Paginated Report highlighted alongside Folder, KPI, Mobile Report, Dataset, and Data Source.](/courses/ssrs/ch01/01-what-is-ssrs-and-paginated-reporting/webportal-new-report.png)
*Paginated Report is one specific item type the web portal knows how to create, run, and manage — distinct from a Mobile Report or a KPI.*

Notice what else lives in that same menu: **Folder** (organizing content),
**KPI** and **Mobile Report** (other report-server item types, not what
this course covers), **Dataset** and **Data Source** (shared, reusable
pieces you'll build starting in Chapter 2). A paginated report is one
citizen among several in this same web portal.

## Report definitions and RDL

Every paginated report is defined by an **RDL file** (Report Definition
Language) — an XML document describing the report's datasets, layout,
parameters, and everything else about it. You'll build RDL files using
either **Report Builder** (a lighter, standalone tool) or **SSDT**
(Visual Studio-based, project-oriented) — Lesson 3 covers exactly when
to reach for each one.

## Key terms

| Term | Meaning |
|---|---|
| SSRS | SQL Server Reporting Services — Microsoft's on-premises paginated reporting platform |
| Paginated report | A report with a fixed, page-by-page layout, designed to print/export exactly as designed |
| Report Server | The server component that hosts, runs, and secures published reports |
| Web portal | The browser-based interface for browsing, running, and managing report server content |
| RDL (Report Definition Language) | The XML format every paginated report is actually saved as |

## Lab

1. If your organization or lab environment has a Report Server web
   portal available, browse to it and locate the **New** menu. Confirm
   you can see the same item types from the screenshot above — Folder,
   KPI, Mobile Report, Paginated Report, Dataset, Data Source.
2. If you don't have access to one yet, that's fine for now — Lesson 4
   and 5 walk through setting up a report project and deploying to a
   Report Server from scratch.

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: what
does "paginated" mean in the context of an SSRS report, and why is that
a genuinely different design goal from an interactive Power BI report —
not just an older version of the same thing?
