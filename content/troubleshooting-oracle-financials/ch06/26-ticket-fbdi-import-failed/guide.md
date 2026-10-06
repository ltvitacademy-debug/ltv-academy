# Ticket: FBDI Import Failed

**Chapter 6 · Data and Integration Tickets · Lesson 1 of 4**

## What you'll learn

- The FBDI pipeline: template, data file, interface table, import
- The most common reasons "Load Interface File for Import" fails on a specific row
- Why editing the template's structure is a frequent, avoidable cause
- A resolution note for a bulk-load failure

## FBDI, briefly

File-Based Data Import (FBDI) loads bulk data using a prescribed Excel template: you fill in the template, it generates a data file, you upload the zipped file, **Load Interface File for Import** loads it into the relevant interface table, and a separate import process (Journal Import, for GL data) moves it into the application. A failure can happen at the load step (the file itself is malformed) or at the import step (the data loaded fine but didn't pass application validation, like the EF04 account error from Lesson 17).

## The ticket

> **Ticket #40771 — Meridian Steel Fabricators.** GL analyst reports: "Tried to bulk-load 300 journal lines using the GL journal FBDI template. Load Interface File for Import failed immediately — nothing loaded at all." Severity: High.

## Investigating

1. **Check the load process log**, not the import log — this failed before import even started.
2. **Read the specific error.** It references an unexpected column structure — the file doesn't match the expected template layout.
3. **Compare the uploaded file to a fresh copy of the template.** The analyst had **deleted a column** they assumed was unnecessary (a reference field they weren't populating) rather than leaving it blank. Deleting or reordering columns breaks the fixed positional structure the load process expects — leaving a column blank is fine; removing it entirely is not.

## Root cause

The analyst removed a column from the FBDI template instead of leaving it blank, which broke the file's expected column structure and caused Load Interface File for Import to fail immediately for the entire file, before any of the 300 lines could be evaluated individually.

## Resolving it

Re-populate the data into a **fresh, unmodified copy** of the correct template version, leaving any genuinely unused columns blank rather than deleted, and re-generate and re-upload the data file. This is a case where the fix is almost entirely about file hygiene, not about any of the 300 lines' actual content.

## Documenting it

> **Ticket #40771 — Meridian Steel Fabricators.** Bulk GL journal FBDI load failed immediately with no rows loaded.
> **Root cause:** The analyst deleted a column from the FBDI template (rather than leaving it blank), breaking the expected column structure and causing Load Interface File for Import to reject the entire file before any row-level validation.
> **Fix:** Re-created the data file from a fresh, unmodified copy of the template, leaving unused columns blank; re-uploaded and re-ran Load Interface File for Import.
> **Verified:** All 300 lines loaded into the interface table successfully; Journal Import run next with no structural errors.
> **Note:** Recommend circulating a short reminder that FBDI template columns must never be deleted or reordered — only left blank — since this is a recurring, easily avoidable failure mode.

## Key terms

| Term | Meaning |
|---|---|
| FBDI | File-Based Data Import — Oracle's standard template-driven bulk load mechanism |
| Load Interface File for Import | The process that loads a data file into the relevant interface table |
| Column structure | The fixed positional layout FBDI templates require; deleting/reordering columns breaks it |

## Check yourself

Why did this failure happen before any of the 300 individual journal lines could even be evaluated, unlike the Lesson 17 ticket where specific rows failed for a content reason?
