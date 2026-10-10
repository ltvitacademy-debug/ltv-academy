# Lesson 5 — Migration Tooling Options

**Chapter 1 · Planning · Lesson 5 of 18**

## What you'll learn

- The real difference between the Data Import Wizard and Data Loader, and when each one fits
- What Bulk API 2.0 actually is, and its real, documented limits
- Where third-party ETL/iPaaS tools fit in, relative to Salesforce's own tools
- How to choose a tool based on volume, object support, complexity, and recurrence rather than habit

## The decision this lesson exists to support

Chapter 1 has now covered what's being migrated (source analysis), how good it is (profiling), and exactly what's in scope (scope and strategy). The last planning decision is **how** the data will actually move — which tool to use. Getting this choice right matters because the wrong tool for the volume or complexity at hand doesn't just slow things down; it can make validation and reconciliation in Chapter 3 much harder, or quietly fail in ways that only show up as missing data weeks later.

## Data Import Wizard

The **Data Import Wizard** is built directly into Salesforce Setup — no install, works in the browser. It fits small, simple, one-off loads: generally under 50,000 records, only for the standard and custom objects it actually supports (it does not support every object — Opportunities, Cases, Tasks, and Events, for example, are not supported), with straightforward field mapping and no need for deletes. It even has built-in duplicate matching logic for some objects based on name/email fields. Its real limitation for migration work is that it can't delete records and only runs one import job at a time — fine for a small supplemental load, not a serious option for a full migration of any real size or complexity.

## Data Loader

**Data Loader** is a separate desktop client (Windows and Mac, with a Windows-only command-line mode for scripted/scheduled jobs) that supports Insert, Update, Upsert, Delete, Hard Delete, and Export against essentially any object, including ones the Wizard doesn't support. Upsert — update on a match, insert otherwise — matches against an External ID field (or Salesforce's own Id if no External ID exists), which is central to safe, re-runnable migration loads (covered in depth in Lesson 9). Standard batch size for insert/update/upsert/delete is capped at 200 records per batch (recommended 50-100 for reliability), but checking the "Use Bulk API" option raises that ceiling to up to 10,000 records per batch — which is really Data Loader handing the job to Bulk API under the hood rather than a separate mechanism. Hard Delete bypasses the Recycle Bin entirely and requires the "Bulk API Hard Delete" system permission in addition to ordinary Delete access. Each operation also requires the matching object permission: Insert needs Create, Update needs Edit, Upsert needs both, Delete and Hard Delete need Delete.

## Bulk API 2.0

**Bulk API 2.0** is the API-level mechanism built for genuinely large volumes — Data Loader's "Use Bulk API" checkbox, and most serious ETL tools, are really just different front ends submitting jobs to it. Its documented limits matter directly for planning: a maximum of 150 MB per ingest job's file size, with Salesforce automatically chunking the job into internal batches of up to 10,000 records each (this chunking isn't something you configure — Salesforce does it); a batch that can't finish processing within 10 minutes fails and is automatically retried up to 10 times; and a ceiling of 150,000,000 records loaded per rolling 24-hour period. A migration with tens of millions of records, or one that needs to run as an unattended, scheduled job rather than a person clicking through Data Loader, is squarely Bulk API 2.0 territory.

## Third-party ETL and iPaaS tools

For migrations with heavy transformation needs, multiple source systems, or a requirement to keep systems in sync during a phased cutover, dedicated ETL/integration platforms (commonly used examples in the Salesforce ecosystem include MuleSoft, Jitterbit, and Informatica) add a staging layer, visual transformation design, and orchestration on top of the same underlying Salesforce APIs that Data Loader and Bulk API 2.0 use directly. They cost more in licensing and setup time, and that cost is usually only worth it when transformation complexity or ongoing integration needs — not just one-time migration volume — justify it.

## Choosing

In practice, the choice comes down to four questions asked in order: How many records (does it comfortably fit Data Import Wizard's sub-50,000 zone, or does it need Data Loader/Bulk API 2.0)? Is the object supported by the simpler tool? How complex is the required transformation (simple mapping vs. something that wants a staging layer)? And is this a one-time load or does it need to run repeatedly/on a schedule (which pushes toward Data Loader's command-line mode, Bulk API 2.0 directly, or an ETL tool)? A tool decision made by habit ("we always use Data Loader") instead of by answering these four questions is how projects end up fighting their tooling instead of their actual data problems.

## Key terms

| Term | Meaning |
|---|---|
| Data Import Wizard | Browser-based Setup tool for small, simple loads into a limited set of supported objects |
| Data Loader | Desktop client supporting Insert/Update/Upsert/Delete/Hard Delete/Export against most objects, with an optional Bulk API mode |
| Bulk API 2.0 | The underlying API mechanism for large-volume, asynchronous data jobs, with documented file-size, batch, and daily record limits |
| ETL/iPaaS tool | A third-party platform (e.g., MuleSoft, Jitterbit, Informatica) adding staging, transformation, and orchestration on top of Salesforce's APIs |

## Lab

A company needs to migrate 2.3 million historical Case records (an object the Data Import Wizard doesn't support) from a legacy system, as a one-time load that also needs heavy date-format and picklist-value transformation before it can land in Salesforce. Using the four-question decision process above, walk through which tool category you'd recommend and why, and name the one specific Bulk API 2.0 limit from this lesson that's most relevant to planning a load of this size.

## Check yourself

Can you state the real reason the Data Import Wizard isn't a serious option for most full migrations, even though it's the easiest tool to open? Can you name Bulk API 2.0's file-size limit, its internal batch-chunking size, and its 24-hour record ceiling?
