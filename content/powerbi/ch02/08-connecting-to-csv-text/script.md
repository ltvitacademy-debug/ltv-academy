# Lesson 8 — Connecting to CSV/Text Files · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Text and CSV files look almost identical from the outside, but Power BI
treats them very differently depending on what's actually inside. Let's
connect to one and see exactly how it decides.

## S2 · IMAGE: text-csv-browse.png (file picker)

Get data, Text CSV, browse to the file. Same pattern as every connector
we've covered.

## S3 · IMAGE: text-csv-navigator.png (CSV preview with three settings)

Here's our Financial Sample data again, this time saved as a CSV. Because
Power BI found a comma separating every value, it shows you three settings:
File Origin, Delimiter, and Data Type Detection — plus a full preview of the
actual columns.

## S4 · IMAGE: csv-delimiter-dropdown.png (delimiter options)

Delimiter is usually detected correctly, but you can override it. Comma,
tab, semicolon, a custom character you type in yourself — even fixed-width
columns, for files with no separator character at all.

## S5 · IMAGE: csv-datatype-dropdown.png (data type detection options)

Data Type Detection controls how hard Power BI works to guess each column's
type. The default samples the first 200 rows — fast, but it can guess wrong
if your data changes further down. Based on entire data set is slower, but
safer.

## S6 · IMAGE: text-raw-navigator.png (unstructured text, single column)

Now here's the same connector, pointed at a plain text file with no
delimiter at all — just two lines of prose. No Delimiter option, no Data
Type Detection. Every line just becomes its own row, in a single column.
That's the whole distinction: CSV is really just text with a delimiter Power
BI could detect.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

One connector, two experiences, and it all comes down to whether Power BI
finds a delimiter inside the file. Next lesson, we connect to something with
a lot more structure built in from the start: SQL databases. See you there.
