# Lesson 47 — Understanding Tableau's Data Model

**Chapter 8 · Data Modeling · Lesson 47 of 95**

## What you'll learn

- The two layers every Tableau data source is built from: the logical
  layer and the physical layer
- Why Tableau split these into two layers starting in 2020.2, instead
  of one flat join canvas
- What a "logical table" is, and how it can quietly contain several
  physical tables joined together
- How this two-layer split sets up the next six lessons on
  relationships, joins, unions, and blending

## The data source page has two layers, not one

When you open the Data Source page and drag your first table onto the
canvas, you're looking at the **logical layer** — a row of boxes, each
one a **logical table**, connected to each other (if you add more than
one) by **relationships**. This is the canvas you see by default, and
it's the one Chapters 8's next lesson (Relationships vs. Joins) lives
in.

But each of those boxes can hide more structure. Double-click any
logical table and Tableau opens the **physical layer** underneath it —
the traditional join canvas, where you combine physical tables (actual
database tables, Excel sheets, extracts) using inner/left/right/full
outer joins or unions, the way every earlier version of Tableau worked
before this two-layer model existed.

![Diagram of Tableau's data model showing the Logical Layer on top — Logical Table A connected to Logical Table B by a Relationship — with each logical table's Physical Layer shown below it, where Logical Table A is made of 4 physical tables joined together and Logical Table B is made of 1 physical table.](/courses/tableau/ch08/47-tableaus-data-model/data-model-layers.png)
*Tableau's two-layer data model, straight from Tableau's own documentation.*
Source: [Tableau Help — How Relationships Differ from Joins](https://help.tableau.com/current/pro/desktop/en-us/datasource_relationships_learnmorepage.htm)

## Why two layers?

Before this model (pre-2020.2), Tableau had one flat canvas: every
table you dragged in got joined to every other table immediately, at
query time, whether your current worksheet needed it or not. That
caused two real problems this course will come back to by name:

- **Row duplication** — joining tables at different levels of detail
  multiplied rows before you'd even built a chart (Lesson 50 is
  entirely about this).
- **Wasted queries** — Tableau generated one giant join across every
  table in the data source for every single worksheet, even ones that
  only used two of the ten tables.

The logical layer fixes both: relationships are **context-aware** —
Tableau only joins what a given worksheet actually needs, at the level
of detail that worksheet needs it, and it doesn't multiply rows until
you tell it to (via an actual join, inside the physical layer).

## Logical table vs. physical table — the distinction that matters

| Term | What it is | Where you see it |
|---|---|---|
| **Physical table** | An actual table: a database table, an Excel sheet, a text file, an extract | Inside the physical layer (the join canvas) |
| **Logical table** | A named box on the main canvas — may be exactly one physical table, or several physical tables already joined/unioned together | The logical layer (the default canvas) |
| **Relationship** | A flexible link *between* logical tables — no join type, no row duplication until a worksheet asks for it | The noodle line between boxes on the logical layer |
| **Join** | A traditional, fixed combination *within* one logical table's physical layer | Inside a logical table, after you double-click to open it |

That's the one sentence to hold onto for the rest of this chapter:
**relationships connect logical tables to each other; joins combine
physical tables inside one logical table.** Lesson 48 builds directly
on this distinction.

## Key terms

| Term | Meaning |
|---|---|
| Logical layer | The default data source canvas — logical tables connected by relationships |
| Physical layer | What's inside a logical table — physical tables combined by joins or unions |
| Logical table | A box on the logical layer; may bundle multiple physical tables |
| Level of detail (in this context) | The granularity a logical table's rows represent — mismatches here are why Lesson 50 exists |

## Lab

1. Open Tableau Desktop, connect to any multi-sheet Excel workbook or
   database you have available (the Sample Superstore workbook from
   Lesson 3 works fine — it has Orders, People, and Returns sheets).
2. Drag one table onto the canvas. You're now looking at the logical
   layer with a single logical table on it.
3. Double-click that table. Notice Tableau opens the physical layer —
   even with only one physical table inside, you can see the join
   canvas is a separate space from the logical canvas you started on.

## Check yourself

You're ready for Lesson 48 when you can state, from memory, which
layer relationships live in and which layer joins live in — and
explain in one sentence why Tableau split the old one-layer canvas
into two.
