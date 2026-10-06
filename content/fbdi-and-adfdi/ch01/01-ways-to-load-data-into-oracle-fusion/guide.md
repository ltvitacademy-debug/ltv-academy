# Ways to Load Data into Oracle Fusion

Welcome to FBDI & ADFdi, the course that opens the Data Loading & Integrations stage of the Oracle Fusion Financials Consultant path. You've already used SQL to investigate financial data sitting inside Oracle Fusion. Now we turn to the other side of that problem: how data gets *into* Oracle Fusion in the first place — one supplier at a time, or fifty thousand journal lines at a time. Every consultant eventually has to move data in bulk, and every consultant eventually has to explain why an import failed. This course is about both halves of that job.

## What you'll learn

- The four main ways data gets into Oracle Fusion Cloud Applications
- Why volume and frequency, not personal preference, decide which method to use
- Where FBDI and ADFdi sit relative to manual entry and REST APIs
- The vocabulary you'll hear for the rest of this course: interface tables, templates, imports

## Four doors into the same application

Oracle Fusion Cloud Applications is, underneath its screens, a set of database tables protected by validation rules. There are four common ways to get data past those rules and into the tables:

- **Manual entry.** A user opens a page — Manage Suppliers, Create Journal, Create Invoice — and types in one record at a time. This is the slowest method but the most tightly validated in real time, field by field.
- **File-Based Data Import (FBDI).** A spreadsheet template is filled in, turned into CSV files, zipped, uploaded, and run through a two-stage import process that can handle tens of thousands of rows in a single submission. This is the subject of most of this course.
- **ADF Desktop Integration (ADFdi).** A Microsoft Excel add-in connects a live spreadsheet directly to a Fusion page, so a user can type or paste many rows into Excel and upload them with the same validation the page would normally apply, without leaving Excel.
- **REST APIs.** External systems (a bank, a payroll provider, a custom integration) call Oracle Fusion's web service endpoints directly, usually on a schedule, with no human spreadsheet step at all. You'll study this in the next course.

## Why the method is chosen by the job, not by taste

A consultant doesn't pick FBDI because they like it better than ADFdi. The decision follows from three questions:

1. **How many rows?** A handful of records favors manual entry or ADFdi. Thousands of records favor FBDI.
2. **How often?** A one-time legacy-system conversion at go-live favors FBDI's bulk templates. A recurring, unattended nightly feed from another system favors a REST API integration. An occasional ad-hoc batch a finance user maintains themselves favors ADFdi.
3. **Who is doing the work?** A functional consultant or power user comfortable with Excel can run ADFdi or FBDI without any coding. A scheduled, system-to-system feed needs a technical integration built with REST APIs — usually by a developer, not a finance user.

## Where this leaves FBDI and ADFdi

FBDI and ADFdi solve the same underlying problem — getting many rows of data into Oracle Fusion without typing each one by hand — but they solve it differently. FBDI moves data through a staging area (interface tables) in two distinct steps, which makes it suited to very large volumes and initial data conversions. ADFdi skips most of that staging and talks to the live application page through Excel, which makes it suited to smaller, more interactive batches where a user wants to see and fix problems as they go, inside the spreadsheet itself.

Both tools exist because Oracle Fusion's web pages were never designed to have a thousand rows pasted into them one field at a time. FBDI and ADFdi are the sanctioned, supported ways around that limitation.

## Recap

Oracle Fusion data gets loaded four ways: manual entry, FBDI, ADFdi, and REST APIs. The right choice depends on volume, frequency, and who is doing the work, not personal preference. FBDI handles the largest, most one-time or scheduled bulk loads through a two-stage interface-table process; ADFdi handles smaller, more interactive spreadsheet-based entry. Next up, lesson 2: a closer look at what File-Based Data Import actually is and when it's the right tool.
