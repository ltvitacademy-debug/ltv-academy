# Generating CSV and ZIP Files

Data entered into Excel doesn't move through the FBDI pipeline as an Excel file. It moves as CSV — comma-separated plain text — packaged inside a ZIP archive. This lesson covers the mechanical step that turns a completed template into the exact file the UCM upload step expects.

## What you'll learn

- Why FBDI uses CSV instead of uploading the Excel file directly
- How the template's built-in macro generates CSV files from your data tabs
- Why multiple data tabs produce multiple CSV files, and how they're bundled
- The macro-security setting that trips up most first-time users

## Why CSV, not Excel

Excel workbooks carry formatting, formulas, macros, and other structure that has nothing to do with the raw data inside them. The interface tables on the other end only care about values in columns. CSV format strips away everything except that: one line per row, fields separated by commas, no formatting, no formulas — just the data. It's also a format essentially every enterprise system, including Oracle Fusion's import tooling, can read without ambiguity. Converting to CSV is how a human-friendly spreadsheet becomes a machine-friendly data file.

## Using the template's macro

Every FBDI template's Instructions tab includes a macro-driven control, usually a labeled button such as "Generate CSV File," that does the conversion for you. Clicking it reads every populated data tab in the workbook and writes out one CSV file per tab, using the exact column order already built into the template. You do not hand-build these CSV files yourself, and you should never try to — the macro guarantees the column order and formatting the interface table expects, which manual export from Excel's own "Save As CSV" option cannot reliably guarantee for multi-tab templates.

## One CSV per data tab, bundled into one ZIP

If a template has two data tabs — say, invoice headers and invoice lines — generating the CSV produces two separate CSV files, one per tab, because they map to two separate interface tables. These generated files then need to be gathered into a single ZIP archive before upload; the "Load Interface File for Import" process expects one ZIP file containing all the CSVs that belong together for that load, not a collection of loose files.

## The macro-security setting that trips people up

Because this conversion runs as a macro, Excel's security settings have to allow it. A workbook downloaded from the internet is often opened by Excel in "Protected View," and macros are disabled by default in many organizations' security policies. The practical fix — enabling macros for that specific trusted file, and exiting Protected View — is usually the single most common blocker first-time FBDI users hit, and it has nothing to do with the data itself. If the "Generate CSV File" button does nothing when clicked, this is the first thing to check, well before assuming the data or the template is broken.

## Recap

FBDI data travels as CSV, not Excel, because interface tables only care about raw values and CSV is unambiguous across systems. The template's own macro — not a manual Excel export — generates one CSV per data tab in the correct column order, and those files are zipped together before upload. Macro security settings, not data problems, are the most common reason this step appears to fail. Next up, lesson 8: the common template mistakes that cause rows to be rejected even after a clean-looking file uploads successfully.
