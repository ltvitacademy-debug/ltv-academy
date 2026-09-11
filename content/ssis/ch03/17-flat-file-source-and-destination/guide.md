# Lesson 17 — Flat File Source & Destination

**Chapter 3 · Data Flow Fundamentals · Lesson 17 of 49**

## What you'll learn

- The three flat file formats SSIS understands, and how they differ
- Why the Flat File connection manager, not the source component
  itself, holds most of the configuration
- The Flat File Destination's header and overwrite options
- One real gotcha: default 50-character string columns, and why they
  cause silent truncation

## No dialog screenshot for this one

Just like the last lesson, the current Microsoft docs for the Flat
File Source, Flat File Destination, and Flat File Connection Manager
are entirely text-based — no dialog-box screenshots remain, even in
the official step-by-step tutorial that walks through building one.
This lesson uses two diagram slides built from the real, documented
options instead of a fabricated screenshot.

## Three text file formats

Every flat file SSIS reads or writes is one of three formats,
configured on the Flat File connection manager:

- **Delimited** — columns are separated by a delimiter character
  (comma, tab, pipe, and so on); rows by a row delimiter.
- **Fixed width** — every column has a fixed character width, with
  padding characters filling unused space.
- **Ragged right** — every column except the last has a fixed width;
  the last column is delimited by the row delimiter instead, so it can
  vary in length.

## The connection manager does the real work

Unlike OLE DB, where the source/destination component itself holds
most of the configuration, a **Flat File Source** or **Flat File
Destination** is a fairly thin wrapper around a **Flat File connection
manager**. The connection manager is where you actually specify:

- The file path, locale, and code page (or Unicode).
- The format (delimited / fixed width / ragged right) and its
  delimiters.
- Whether the first row contains column names, and how many header
  rows to skip.
- Each column's name, data type, and length — either by hand, or by
  letting **Suggest Column Types** sample the file's actual data and
  propose types for you.

Because multiple flat file components can share one connection
manager, configuring the format once there means every Flat File
Source and Destination that references it inherits the same column
metadata.

## Configuring the Flat File Source

The **Flat File Source Editor** itself just picks which connection
manager to use, whether to keep the file's null values as true nulls
in the data flow (default: false — it substitutes empty strings or
zeros instead), and maps external columns to output columns on its
Columns page — plus the same Error Output page pattern you saw with
OLE DB Source.

## Configuring the Flat File Destination

The **Flat File Destination Editor** adds two options the source
doesn't need:

- **Overwrite data in the file** — overwrite the existing file, or
  append to it.
- **Header** — a block of text (like column headings) written into
  the file before any data rows.

Its **Mappings** page works exactly like the OLE DB Destination's:
drag input columns onto destination columns. One difference worth
remembering — the Flat File destination has **no error output at
all**, unlike almost every other destination in this chapter.

## The 50-character gotcha

By default, the Flat File connection manager sets every string
column's length to **50 characters**. If your real data is wider — or
narrower — and you never adjust it, two problems follow: truncation
warnings (or runtime errors) if a value is longer than 50 characters,
and wasted buffer space if your data is much shorter. Always run
**Suggest Column Types**, or manually resize columns, before trusting
a Flat File connection manager's defaults in a real package.

## Key terms

| Term | Meaning |
|---|---|
| Delimited / Fixed width / Ragged right | The three flat file formats a Flat File connection manager can parse |
| Flat File connection manager | Holds the file path, format, delimiters, and per-column metadata shared by every component that uses it |
| Suggest Column Types | A dialog that samples file data and proposes a data type and length for each column |
| Header (Flat File Destination) | A block of text written into the output file before any data rows |
| Overwrite data in the file | The Flat File Destination option choosing between overwriting or appending to an existing file |

## Lab

1. Create a Flat File connection manager against any text file you
   have (or export one from a table using SSMS). On the General page,
   set the format to **Delimited**, then use **Suggest Column Types**
   on the Advanced page and note what it proposes.
2. Add a Flat File Source using that connection manager, and confirm
   on its Columns page that every external column maps to an output
   column.
3. Add a Flat File Destination downstream, set **Overwrite data in the
   file** to true, and type a one-line **Header** with column names.
   Run the package and open the output file to confirm the header
   appears above the data.

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why
does most of a Flat File component's configuration actually live on
the connection manager instead of the source or destination editor,
and what's the default string column length that catches people off
guard?
