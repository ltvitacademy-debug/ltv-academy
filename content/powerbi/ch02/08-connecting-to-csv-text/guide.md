# Lesson 8 — Connecting to CSV/Text Files

**Chapter 2 · Connecting to Data · Lesson 3 of 6**

## What you'll learn

- How the Text/CSV connector decides whether a file is "structured" or not
- The three settings Power BI shows you when a file has a detectable delimiter
- Why a plain text file loads completely differently from a CSV
- One quirk to know about adding columns later and refreshing

## One connector, two very different outcomes

Select **Text/CSV** from Get Data and browse to a file, the same way as any
other connector:

![Screenshot of the Windows file picker with a text file selected.](/courses/power-bi/ch02/08-connecting-to-csv-text/text-csv-browse.png)
*Same browse-and-open pattern as every connector so far.*

What happens next depends entirely on what's *inside* the file. Power BI
looks for a delimiter — a comma, tab, semicolon, or similar character
separating values — and reacts one of two ways.

## When Power BI finds a delimiter: structured data

Here's a CSV file (our Financial Sample data, saved as `.csv` instead of
`.xlsx`) loading with a full preview:

![Screenshot of the CSV preview dialog showing File Origin, Delimiter, and Data Type Detection dropdowns above a data grid.](/courses/power-bi/ch02/08-connecting-to-csv-text/text-csv-navigator.png)
*Three settings appear whenever Power BI detects structure: File Origin, Delimiter, and Data Type Detection.*

Three choices worth understanding:

- **File Origin** — which character encoding the file uses. Leave the
  default unless you see garbled characters in the preview.
- **Delimiter** — usually detected correctly (comma, in this case), but you
  can override it if Power BI guesses wrong:

  ![Screenshot of the Delimiter dropdown open, showing options including Colon, Comma, Semicolon, Tab, and Fixed width.](/courses/power-bi/ch02/08-connecting-to-csv-text/csv-delimiter-dropdown.png)
  *Comma, tab, semicolon, or a custom character you specify — even fixed-width columns with no delimiter at all.*

- **Data Type Detection** — how hard Power BI works to guess column types:

  ![Screenshot of the Data Type Detection dropdown open, showing "Based on first 200 rows," "Based on entire data set," and "Do not detect data types."](/courses/power-bi/ch02/08-connecting-to-csv-text/csv-datatype-dropdown.png)
  *The default samples the first 200 rows — fast, but occasionally wrong if your data changes type further down. "Based on entire data set" is safer but slower to preview.*

## When Power BI finds no delimiter: unstructured text

Now compare that to a plain text file with no consistent delimiter at all —
just lines of prose:

![Screenshot of a plain text file preview showing two lines of text, each in its own row under a single "Column1" heading, with no Delimiter option available.](/courses/power-bi/ch02/08-connecting-to-csv-text/text-raw-navigator.png)
*No delimiter detected, so no delimiter/data-type options appear. Every line becomes one row in a single text column.*

That's the entire distinction: **CSV is really just "text file with a
detected delimiter."** The same connector handles both — Power BI decides
which experience to show you based on what it finds inside the file.

## Two things worth remembering

- **Double-check auto-detected types before loading.** Data Type Detection
  is a guess based on a sample. If a column looks wrong in the preview,
  don't just load it — adjust the delimiter or detection setting first, or
  fix the type afterward in Power Query Editor (Chapter 3).
- **New columns don't appear automatically on refresh.** Power BI records
  the number of columns your CSV had at import time. If you later add more
  columns to the source file, a scheduled refresh won't pick them up — you
  have to reconnect or edit the query.

## Key terms

| Term | Meaning |
|---|---|
| Delimiter | The character separating values in a text file (comma, tab, etc.) |
| Structured text | A text file where Power BI detected a delimiter and can split it into columns |
| Unstructured text | A text file with no detectable delimiter — loads as one column, one row per line |
| Data Type Detection | How many rows Power BI samples to guess each column's data type |

## Lab

1. Connect to any `.csv` file via **Get data > Text/CSV** and note which
   three settings appear above the preview.
2. Open the Delimiter dropdown without changing it, just to see the full
   list of options.
3. If you have a plain `.txt` file with no consistent punctuation pattern,
   connect to it too, and compare: does it show the same three settings, or
   just File Origin?

## Check yourself

You're ready for Lesson 9 when you can explain why some text files show a
Delimiter option and Data Type Detection, while others only show File
Origin — and it isn't about the file extension.
