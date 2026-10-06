# Rapid Implementation Spreadsheets

Everything this course has covered so far has been done screen by screen, inside Setup and Maintenance. For companies with reasonably straightforward requirements, Oracle Fusion offers a genuinely faster path: **Rapid Implementation (RI) spreadsheets**, which can stand up a basic chart of accounts, calendar, legal entities, and ledger from a handful of filled-in spreadsheet templates.

## What you'll learn

- What rapid implementation spreadsheets actually generate
- The tools behind the scenes: ADFdi, FBDI, and the upload process
- When RI spreadsheets are genuinely appropriate, and when they are not
- What still needs manual review even after a successful upload

## What RI spreadsheets generate

Rapid implementation spreadsheet templates let a consultant define, in spreadsheet form rather than screen by screen, the inputs for several enterprise structure pieces at once: chart of accounts values and value sets, account hierarchies, the accounting calendar, legal entities and their jurisdictions, a primary ledger, and business units. Once the spreadsheets are filled in and uploaded, Oracle Fusion creates the chart of accounts structure and instance, segment value hierarchies, standard accounts like retained earnings, the calendar, the primary ledger (one per country represented), the legal entities and their locations, and the business units — essentially everything Chapters 2 through 5 covered, generated in one coordinated pass instead of dozens of individual setup tasks.

## The tools behind the scenes

```
Rapid Implementation Toolkit:
  RI Spreadsheets / Templates — the filled-in Excel-based input
  ADFdi (ADF Desktop Integrator) — the Excel add-in that connects to Oracle Fusion
  FBDI (File-Based Data Import) — bulk data import files, used for larger data volumes
  Upload process — a scheduled process that reads the file and creates the structures
```

Practically, this means a consultant works largely inside familiar Excel spreadsheets, downloaded with the correct format already built in, fills them out, and then runs an upload/import scheduled process (reached from Setup and Maintenance, specifying the file as a parameter) that reads the spreadsheet and creates everything it describes.

## When RI spreadsheets are appropriate — and when they are not

Rapid implementation is built for companies with relatively simple, single-chart-of-accounts, limited-entity requirements — exactly the kind of "start simple" design Lesson 5 recommended. It is not well suited to a complex multinational with many legal entities, multiple charts of accounts, or extensive segment hierarchies that need careful, iterative review; those situations usually call for the screen-by-screen configuration this course spent five chapters covering, precisely because the detail and judgment calls involved don't compress well into a spreadsheet template.

## What still needs manual review

Even a successful RI spreadsheet upload is a starting point, not a finished implementation. A consultant should still manually verify the generated chart of accounts segment labels, confirm the balancing-segment-value-to-legal-entity mapping, and review cross-validation rules — none of which the templates fully substitute for the judgment covered in Chapter 5. Treat RI output the way you'd treat a fast first draft: a genuine head start, reviewed line by line before go-live.

## Recap

Rapid implementation spreadsheets, uploaded through ADFdi/FBDI-backed processes, can generate a basic enterprise structure in one coordinated pass for simple requirements, but they are a head start, not a substitute for the review this course has taught. Next up, lesson 28: testing and reviewing your enterprise structure, whether it was built by hand or through RI spreadsheets.
