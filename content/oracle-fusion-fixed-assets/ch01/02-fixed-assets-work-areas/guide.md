# Lesson 2 — Fixed Assets Work Areas

**Chapter 1 · Fixed Assets Fundamentals · Lesson 2 of 33**

## What you'll learn

- How Oracle Fusion Assets organizes its tasks into work areas instead of one giant menu
- The difference between the Fixed Assets work area and the Setup and Maintenance work area
- Where mass additions, depreciation, and reporting tasks each live
- How your role determines which tasks you can even see

## Work areas, not one big menu

Oracle Fusion applications are organized around **work areas**: role-based landing pages that group the tasks one job actually needs, instead of a single flat menu of everything the system can do. An Assets accountant lands on a different screen, with a different task list, than an Assets implementation consultant — even though both are "in" Oracle Fusion Assets.

The two work areas you'll live in throughout this course:

- **Fixed Assets** — the day-to-day transactional work area: adding assets, running depreciation, transferring and retiring assets, generating reports.
- **Setup and Maintenance** — the configuration work area shared across all of Fusion Financials, where asset books, categories, locations, and calendars get defined (Chapters 1–2 of this course touch this area heavily).

## Inside the Fixed Assets work area

The Fixed Assets work area groups tasks into panels that roughly mirror the asset lifecycle from Lesson 1:

- **Mass additions tasks** — Prepare Mass Additions, Post Mass Additions, and the exception/review queues that sit between a Payables invoice and a posted asset (Chapter 3).
- **Asset transaction tasks** — Add Asset, adjust cost, transfer, reclassify, revalue, and retire (Chapters 3–5).
- **Periodic processing tasks** — Calculate Depreciation (often called Run Depreciation), Create Accounting, and the Period Close process (Chapters 4 and 6).
- **Reporting tasks** — asset registers, reserve ledgers, reconciliation reports, and depreciation projections (Chapter 6).

Most of these tasks also have a corresponding **scheduled process** — the same job run in the background on a recurring schedule rather than kicked off by a person clicking a button. Depreciation, for instance, is frequently scheduled to run automatically at period end rather than triggered manually every time.

## Roles decide what you see

Oracle Fusion Assets ships predefined job roles — Asset Accountant, Asset Accounting Manager, and others — each with a different set of task and data access privileges. An Asset Accountant can typically add and adjust assets and run reports, but period close and certain mass-change processes are often reserved for an Asset Accounting Manager. This isn't just a UI convenience: it's how the application enforces segregation of duties, so the person adding an asset isn't necessarily the same person who can close the period that locks it in.

## Key terms

| Term | Meaning |
|---|---|
| Work area | A role-based landing page grouping the tasks relevant to a job, not a single flat menu |
| Scheduled process | A background job (like Calculate Depreciation) that can run on a recurring schedule instead of manually |
| Job role | A predefined bundle of task and data privileges assigned to a user, controlling what they can see and do |

## Lab

For fictional company **Meridian Fabrication Co.**, list which of these four tasks you'd expect an **Asset Accountant** to have access to, and which you'd expect to be reserved for an **Asset Accounting Manager**: (1) Add Asset manually, (2) Close the current period, (3) Run the standard Asset Cost Detail report, (4) Define a new asset category. Justify each answer in one sentence.

## Check yourself

Can you name the two work areas most relevant to this course, and explain why Oracle Fusion ties specific tasks to specific job roles rather than giving every user access to everything?
