# Lesson 11 — Data Types, Metadata & Field Properties

**Chapter 2 · Connecting & Preparing Data · Lesson 11 of 95**

## What you'll learn

- The data type icons Tableau shows next to every field, and what each
  one means
- How to change a field's data type when Tableau guesses wrong
- What "field properties" are, and how to set sensible defaults (like
  a default aggregation) once instead of every time you use a field
- Why getting this right early saves repeated cleanup later in every
  worksheet that uses the field

## Reading the data type icons

Every field in the Data pane carries a small icon showing its data
type — this is metadata Tableau infers from the source, not something
you set from scratch:

![Real screenshot of two Tableau Data panes, showing Dimensions and Measures each with a small type icon: Abc for text, a calendar for date, a globe/pin for geographic role, and # for numbers.](/courses/tableau/ch02/11-data-types-metadata-field-properties/data-pane-types.png)
*Every field's icon tells you its data type at a glance.*
Source: [Tableau Help — Work with Data Fields in the Data Pane](https://help.tableau.com/current/pro/desktop/en-us/datafields_understanddatawindow.htm)

| Icon | Data type |
|---|---|
| Abc | String / text |
| # | Number (integer or decimal) |
| Calendar | Date, or Date & Time |
| Globe/pin | Geographic role (Country, State, City, etc.) |
| T/F | Boolean |

These icons matter because they drive what Tableau lets you do with a
field — you can't put a text field on a numeric axis, and you can't map
a field with no geographic role until you assign one.

## Fixing a wrong data type

Source systems (especially CSVs, per Lesson 7) sometimes get this
wrong — a ZIP code stored as a number, or a date stored as plain text.
Right-click the field in the Data pane and choose **Change Data Type**
to correct it. This is metadata correction, not a change to your
underlying source file — it only affects how Tableau interprets the
field.

## Field properties: setting sensible defaults

Beyond data type, every field carries **default properties** you can
set once so you don't have to fix them every time you use the field:

![Real screenshot of the right-click context menu on the Profit field, showing Convert to Discrete, Convert to Dimension, Change Data Type, Geographic Role, and Default Properties > Aggregation, with 'Average' highlighted in the submenu.](/courses/tableau/ch02/11-data-types-metadata-field-properties/default-properties-menu.png)
*Setting a field's default aggregation once, from this same right-click menu.*
Source: [Tableau Help — Edit Default Settings for Fields](https://help.tableau.com/current/pro/desktop/en-us/datafields_fieldproperties.htm)

Common default properties worth setting:

- **Default Aggregation** — Tableau assumes SUM for most numeric
  Measures, but a field like a satisfaction score or a percentage
  usually makes more sense defaulting to AVG.
- **Default Number Format** — set currency formatting once on Sales,
  and every future worksheet that uses it inherits it automatically.
- **Comment** — a short description attached to the field, visible on
  hover, useful for documenting what a less-obvious field actually
  means for anyone else opening the workbook.
- **Default Color** — assign a fixed color to a Dimension's values once
  (e.g., "Furniture" is always the same shade of brown) so every chart
  using that field is automatically consistent.

## Why set these early

Every one of these defaults is set once on the field itself, in the
Data pane — not per-worksheet. Set Sales' number format to currency
once, and every worksheet across every chapter that uses Sales
inherits it, instead of you reformatting it by hand every single time
you drag it onto a shelf.

## Key terms

| Term | Meaning |
|---|---|
| Data type | What kind of value a field holds — string, number, date, boolean, geographic |
| Metadata | Information about a field itself (type, name, role) as opposed to its values |
| Default Aggregation | The aggregation (SUM, AVG, etc.) Tableau applies automatically when a Measure is used |
| Field property | Any default setting (aggregation, format, comment, color) attached to a field itself |

## Lab

1. In Sample Superstore's Data pane, find one field of each data type icon (string, number, date, geographic).
2. Right-click Profit Ratio (or any percentage-like field) and check whether its default aggregation makes sense — change it to Average if it's currently SUM.
3. Set a default number format (currency) on Sales, then drag it into a new worksheet and confirm the format carried over automatically.

## Check yourself

You're ready for Lesson 12 when you can identify a field's data type
from its icon alone, and explain why setting a default aggregation or
number format once on the field saves work later.
