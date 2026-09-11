# Lesson 8 — Tables & Lists

**Chapter 2 · Building Reports · Lesson 8 of 40**

## What you'll learn

- What a **data region** is, and where Table and List fit among the
  options (Table, Matrix, List, Chart, and more)
- How the **Table or Matrix Wizard** turns dragged fields into row
  groups, column groups, and detail rows
- Why a **Table** repeats rows down the page, while a **List** repeats
  a whole freeform block — and when you'd reach for each
- How to read the row-and-column structure a wizard-built table leaves
  behind on the design surface

## Data regions: the family Table and List belong to

A **data region** is any report item bound to a dataset that repeats
its layout once per row (or group) of data. Tables, matrices, lists,
and charts are all data regions — they just repeat and arrange that
data differently. This lesson covers the two simplest: **Table**, which
lays data out in a fixed grid of rows and columns, and **List**, which
repeats an entire freeform layout — think a rectangle full of text
boxes and images, repeated once per record, like a directory of
employee cards rather than a spreadsheet grid.

## Building a table with the wizard

The fastest path to a first table is the **Table or Matrix Wizard**
(Insert tab → Table or Matrix). After you connect to a dataset, the
wizard's **Arrange fields** page is where the real design decisions
happen — you drag fields into three boxes:

![The Arrange fields page of the New Table or Matrix wizard: Available fields on the left, with Subcategory being dragged into the Row groups box, and Product plus Sum(Quantity) and Sum(Sales) already sitting in Values.](/courses/ssrs/ch02/08-tables-and-lists/ssrs-tutorial-arrange-fields.png)
*Row groups define hierarchy; Values define what actually gets aggregated in each cell.*

- **Row groups** — fields that create a new row grouping each time the
  value changes (here, `SalesDate` then `Subcategory`, nested).
- **Column groups** — leave this empty for a Table; a Matrix uses it to
  add a second, horizontal dimension (next lesson).
- **Values** — the fields that actually populate the data cells, each
  with a default aggregate (`Sum`, `Avg`, `Count`, and so on) applied
  automatically to numeric fields.

## What the wizard leaves on the design surface

Finish the wizard, and Report Builder drops a fully-wired table onto
the design surface — headers, detail row, and subtotal/total rows
already wired to your grouped fields:

![A finished table on the design surface: header row with Sales Date, Subcategory, Product, Quantity, and Sales columns, a detail row of bracketed field placeholders, a Subcategory total row, and a grand Total row at the bottom, with the Row Groups pane below showing SalesDate, Subcategory, and (Details) nested.](/courses/ssrs/ch02/08-tables-and-lists/ssrs-tutorial-design-surface-new-table.png)
*Placeholders like `[SalesDate]` and `[Sum(Sales)]` show field bindings — actual data only appears when you Run the report.*

Notice the **Row Groups** pane at the bottom now shows three nested
groups — `SalesDate`, `Subcategory`, and `(Details)` — matching exactly
what you dragged into the wizard. Everything you did in the wizard is
just a fast way to produce ordinary tablix structure; you can (and
will) hand-edit all of this directly on the design surface once you're
past the wizard stage.

## Table vs. List — when to use which

| | Table | List |
|---|---|---|
| Layout | Fixed grid — rows and columns | Freeform — any arrangement of items, repeated as a block |
| Best for | Tabular data: sales rows, transaction logs, line items | Card- or form-style repeats: one block per customer, per invoice, per record |
| Grouping | Row Groups / Column Groups panel, same as a Matrix | Still supports groups, but there's no natural "column" concept |

Rule of thumb: if what you're picturing looks like a spreadsheet,
reach for **Table**. If it looks like a repeated form or card layout,
reach for **List**.

## Key terms

| Term | Meaning |
|---|---|
| Data region | Any report item bound to a dataset, repeating its layout per row/group |
| Table | A data region laying data out as a fixed grid of rows and columns |
| List | A data region repeating a freeform block layout once per record |
| Detail row | The row that repeats once per underlying data row, with no grouping applied |
| Placeholder | Bracketed text like `[Sum(Sales)]` shown in design view; real values appear only when you Run the report |

## Lab

1. Using the dataset you built in Lesson 6, run the **Table or Matrix
   Wizard** and drag at least one field into **Row groups** and one
   into **Values**.
2. Finish the wizard and confirm the **Row Groups** pane matches what
   you dragged.
3. Select **Run** to preview — confirm the placeholder text like
   `[Sum(...)]` resolves to real aggregated numbers.

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: what's
the structural difference between a Table and a List, and what do the
Row groups, Column groups, and Values boxes in the wizard each actually
control?
