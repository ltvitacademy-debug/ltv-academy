# Ticket: ADFdi Upload Errors

**Chapter 6 · Data and Integration Tickets · Lesson 2 of 4**

## What you'll learn

- What ADFdi is, and how it differs from FBDI
- Version mismatch as a specific, common ADFdi failure
- Validation rules that stop bad data before it reaches the server
- A resolution note for a desktop-side integration problem

## ADFdi vs. FBDI

Lesson 26 covered FBDI — a template-driven bulk load through interface tables, suited to large volumes. **ADFdi (ADF Desktop Integration)** is different: it's an Excel add-in that connects a spreadsheet directly to an Oracle Fusion page, letting a user enter or edit data in familiar spreadsheet rows and upload it directly, without staging through an interface table. It's suited to smaller, more interactive data entry — like the "Create Journals in Spreadsheet" option used by GL accountants — not massive bulk loads.

## The ticket

> **Ticket #40798 — Cascade Outdoor Supply.** GL accountant reports: "Trying to upload my journal spreadsheet and I'm getting a workbook integrity error I've never seen before. It worked fine last week." Severity: Medium.

## Investigating

1. **Read the exact error.** It references the integration's integrity check failing — a signal something about the add-in or workbook itself, not the data, is the problem.
2. **Check what changed since "last week."** IT pushed an update to the Oracle Fusion environment over the weekend as part of a scheduled patch.
3. **Check the ADFdi add-in version on the accountant's machine** against what the environment now expects. They're out of sync — the accountant's installed ADFdi client is the older version, and the environment-side update changed what it expects.

## Root cause

A scheduled environment patch updated the server-side ADFdi version, and the accountant's desktop ADFdi add-in was never updated to match, creating a version mismatch that the client correctly detects and blocks rather than uploading with a potentially incompatible integration.

## Resolving it

Reinstall (or update) the ADFdi desktop add-in to match the current environment version, and have the accountant **download a fresh copy of the spreadsheet template** rather than reusing last week's file — an old workbook can carry integration metadata tied to the previous version. Re-enter or copy the data into the fresh template and upload again.

## A second common ADFdi cause, worth knowing

Separately from version mismatches, ADFdi enforces its own **validation rules** at the worksheet and table level, catching invalid data (like a bad account combination or a required field left blank) before it ever reaches the server — similar in spirit to FBDI's interface-table validation, but checked locally in the spreadsheet first. If this ticket's error had instead been a specific field-level rejection rather than an integrity/version error, the fix would be correcting that data in the spreadsheet, not reinstalling anything.

## Documenting it

> **Ticket #40798 — Cascade Outdoor Supply.** ADFdi spreadsheet upload failed with a workbook integrity error after working the previous week.
> **Root cause:** A scheduled environment patch updated the server-side ADFdi version over the weekend; the accountant's desktop ADFdi add-in was not updated to match, causing a version mismatch.
> **Fix:** Updated the desktop ADFdi add-in to the current version; downloaded a fresh spreadsheet template and re-entered the journal data.
> **Verified:** Upload completed successfully with no integrity errors.
> **Note:** Recommend IT include an ADFdi client version check/reminder in the notification sent before scheduled environment patches.

## Key terms

| Term | Meaning |
|---|---|
| ADFdi | Excel add-in connecting a spreadsheet directly to an Oracle Fusion page for interactive data entry/upload |
| Version mismatch | Client and server ADFdi versions out of sync, blocking the integration |
| Validation rule | A worksheet/table-level check that catches invalid data before upload, distinct from a version/integrity error |

## Check yourself

How did you tell this was a version mismatch rather than a data validation problem, just from the type of error reported?
