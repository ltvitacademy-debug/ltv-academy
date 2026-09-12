# Lesson 7 — Connecting to Excel & CSV Files

**Chapter 2 · Connecting & Preparing Data · Lesson 7 of 95**

## What you'll learn

- How to connect Tableau Desktop to an Excel workbook and to a
  delimited text file (CSV/TSV/TXT)
- What the Data Source page shows you immediately after connecting,
  and why it matters before you ever open a worksheet
- The Live vs. Extract choice you're presented with the moment you
  connect (previewed here, covered fully in Lesson 9)
- Why CSV files sometimes need extra configuration that Excel files
  don't

## Connecting to an Excel workbook

From the start page (or **Data > New Data Source**), choose **Microsoft
Excel**, pick your file, and Tableau opens the **Data Source** page —
not a worksheet yet. This is where you confirm which sheet(s) to use
and how they're structured before building anything.

![Real screenshot of the Tableau Data Source page after connecting to a Quarterly Sales Excel workbook: Connections pane on the left listing the file, Sheets list showing 'Quarterly Sales' and 'New Union', a Live/Extract toggle top-right, and a preview grid of Category/Quarter columns below.](/courses/tableau/ch02/07-connecting-to-excel-and-csv/excel-connection.png)
*The Data Source page — this is what you see immediately after connecting, before any chart exists.*
Source: [Tableau Help — Excel](https://help.tableau.com/current/pro/desktop/en-us/examples_excel.htm)

Notice the **Sheets** list on the left — an Excel workbook can contain
multiple sheets, and each one (or a combination via a join/union) can
become a table Tableau treats as data. If your workbook uses named
ranges instead of full sheets, Tableau can connect to those too.

## Connecting to a CSV / text file

The process is nearly identical — choose **Text File** instead of
Microsoft Excel, and select your .csv, .txt, or .tsv file.

![Real screenshot of the Tableau Data Source page after connecting to iris.csv: Connections pane listing the file, Files list, a Live/Extract toggle, and a preview grid with generic column headers F1 through F5.](/courses/tableau/ch02/07-connecting-to-excel-and-csv/csv-connection.png)
*Connecting to a plain CSV — notice the generic F1, F2, F3... column headers.*
Source: [Tableau Help — Text File](https://help.tableau.com/current/pro/desktop/en-us/examples_text.htm)

One real difference from Excel: a delimited text file has no
information about column names, data types, or the delimiter character
built in the way an Excel file does. If Tableau guesses wrong, you
have two fixes available right on this page:

- Click the table's dropdown arrow and confirm whether the first row
  actually contains column headers (if not, you get F1/F2/F3-style
  generic names, as in the screenshot above).
- Click **Text file properties** to manually set the delimiter
  character (comma, tab, pipe, etc.) and the text qualifier used to
  wrap values that contain the delimiter itself (like a comma inside a
  quoted address field).

## Live or Extract — a first look

Notice the **Connection: Live / Extract** toggle at the top-right of
both screenshots. Every connection asks you this immediately — for
file-based sources like Excel and CSV, this matters less than it will
for a database in Lesson 8, because the file itself isn't a
constantly-changing live system the way a production SQL Server
usually is. Lesson 9 covers exactly what this choice means and when it
matters.

## Key terms

| Term | Meaning |
|---|---|
| Data Source page | The tab you land on right after connecting, before any worksheet |
| Sheets / Files list | The tables available inside the connected workbook or folder |
| Text file properties | The dialog for manually setting delimiter and text qualifier on a CSV |
| Live / Extract | The connection-mode toggle shown on every Data Source page |

## Lab

1. Connect Tableau Desktop to any Excel file you have on hand (or download a small sample), and identify the Sheets list and the Live/Extract toggle on the Data Source page.
2. Export or find a simple CSV file, connect to it, and check whether Tableau correctly detected your header row — if not, use the table dropdown to fix it.
3. Open **Text file properties** on your CSV connection and note what delimiter Tableau detected.

## Check yourself

You're ready for Lesson 8 when you can connect to both an Excel file
and a CSV file from memory, and explain what the Sheets/Files list and
the Live/Extract toggle each represent on the Data Source page.
