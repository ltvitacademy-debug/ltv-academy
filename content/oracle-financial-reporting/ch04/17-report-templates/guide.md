# Report Templates

With a data model producing XML (lesson 16), the template is where that data turns into something a human actually reads: a formatted page, a table, a form. This lesson covers how RTF templates are built, how they reference the underlying XML, and the other layout options BI Publisher supports.

## What you'll learn

- Why RTF, built in Microsoft Word, is the most common BI Publisher template format
- The Template Builder add-in and the basic workflow for building a template
- How a template references fields and loops over repeating data
- Other template and output format options

## RTF templates: designing in a familiar tool

Most BI Publisher templates for financial reports are built as **RTF templates** — ordinary Word documents, enhanced with the **BI Publisher Template Builder**, a Microsoft Word add-in. This is a deliberate design choice: it lets a report's visual design be built by someone comfortable in Word, using Word's own formatting (fonts, tables, borders, page headers), rather than requiring a programmer to hand-code a layout.

## The basic template-building workflow

1. **Get sample XML.** Open an existing report (or the data model directly) and export or download a sample XML data file — the output you learned about in lesson 16.
2. **Build the Word document.** Lay out the report visually in Word: titles, a header area, a table for repeating detail rows, footer totals, logos if needed.
3. **Insert fields and loops using the Template Builder.** Using the add-in, map specific areas of the Word document to fields in the sample XML — a text placeholder becomes "insert the Invoice Number field here," and a table row becomes a loop that repeats once for every row in a detail data set (every invoice line, for instance).
4. **Preview against the sample XML.** The Template Builder can render the template against the sample data immediately, so you catch layout problems before uploading anything to the live report.
5. **Upload the finished RTF as the report's layout.** Once it looks right, it's uploaded into the report definition in Fusion, replacing or supplementing any existing layout.

## Fields and loops: the two core mechanics

- A **field** is a single placeholder tied to one XML element — "Supplier Name" in the data becomes "Supplier Name" wherever that placeholder is dropped in the Word layout.
- A **loop** (sometimes implemented as a "for-each" construct around a table row) repeats a chunk of the layout once per row in a repeating data set — this is how a single-row table definition in the template produces a multi-page invoice listing with one row per actual invoice at run time.

Getting the loop boundaries right — making sure the repeating row genuinely wraps only the detail fields, not the header fields above it — is the single most common source of a malformed-looking output the first time a new template author builds one.

## Other layout and output options

While RTF built in Word is the most common starting point, BI Publisher also supports other template types (such as Excel-based templates for spreadsheet-style output) and a range of final output formats once a template is built — PDF, Excel, PowerPoint, RTF/Word, and HTML among them, selectable depending on how the report will ultimately be consumed.

## Recap

A BI Publisher template, most commonly an RTF file built in Word with the Template Builder add-in, maps fields and loops onto a visual layout, previewed against sample XML before being uploaded as the report's layout — turning a data model's XML output into something a reader can actually open and read. Next up, lesson 18: running and scheduling the finished report.
