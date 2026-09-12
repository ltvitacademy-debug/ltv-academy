# Lesson 48 — Relationships vs. Joins

**Chapter 8 · Data Modeling · Lesson 48 of 95**

## What you'll learn

- What a relationship actually does differently from a join, in terms
  you already know from SQL
- Why relationships don't require you to pick a join type up front
- When Tableau still needs you to reach for a real join
- How to read the relationship canvas vs. the join canvas

## You already know joins — here's what's different in Tableau

From T-SQL Development you already know exactly what a join is: you
pick a join type (`INNER`, `LEFT`, `RIGHT`, `FULL OUTER`), you specify
the columns that match on each side, and the database engine combines
rows from both tables into one result set — at the row level, before
anything else happens to the data. Tableau's **join** (inside the
physical layer, from Lesson 47) is that exact same operation. Nothing
new to learn there conceptually — just a different dialog box instead
of an `ON` clause.

A **relationship** is Tableau's own invention, and it behaves
differently from a join in three concrete ways:

| | SQL JOIN / Tableau join | Tableau relationship |
|---|---|---|
| **When is the combine decided?** | Up front — you pick the join type before you build anything | Never fixed — Tableau decides per worksheet, based on what fields that worksheet actually uses |
| **Does it duplicate rows before you ask?** | Yes, immediately, at the row level | No — rows aren't combined until a worksheet references fields from both tables, and even then only at the level of detail that worksheet needs |
| **Do you pick a join type?** | Yes: inner, left, right, full outer | No join type — Tableau automatically uses the equivalent of a left join per table, adjusted per worksheet |

## The relationship canvas

This is what you're looking at when you drag a second table onto the
logical layer and Tableau links it to the first with a relationship
("noodle") line — the exact canvas Lesson 47 introduced:

![The Edit Relationship dialog in Tableau's data source page, showing a relationship line connecting the Book and Author logical tables, with the Edit Relationship panel open below showing the matching field (Book ID) on each side.](/courses/tableau/ch08/48-relationships-vs-joins/relationship-canvas-edit-dialog.png)
*Click the relationship line (or right-click it) to open Edit Relationship and see, or change, which fields define the match.*
Source: [Tableau Help — Relate Your Data](https://help.tableau.com/current/pro/desktop/en-us/relate_tables.htm)

Notice there's no join-type picker here — no inner/left/right/full
outer choice. Tableau just needs to know which field(s) match between
the two logical tables; everything about *how* they combine at query
time is handled automatically, per worksheet.

## The join canvas — what's actually different

Double-click a logical table (from Lesson 47) and you land in the
physical layer — the join canvas. This is where Tableau's behavior
matches SQL exactly:

![The physical/join canvas inside a logical table, showing Book joined to Award via a Venn-diagram join icon, with a third table (Info) being dragged in to add to the same logical table.](/courses/tableau/ch08/48-relationships-vs-joins/join-canvas-physical-layer.png)
*Inside the physical layer: pick a join type, pick matching fields, and the combine happens immediately — just like a SQL join.*
Source: [Tableau Help — Join Your Data](https://help.tableau.com/current/pro/desktop/en-us/joining_tables.htm)

## When do you still need a real join?

Relationships cover most day-to-day analysis, but reach for an actual
join (inside the physical layer) when you need something a
relationship can't express — the same list of "SQL things a JOIN can
do that Tableau's relationship can't" translates directly:

- A join condition using `<`, `>`, `<=`, or `>=` instead of equality
- Row-level security setups that intentionally rely on row
  duplication
- Combining tables that must be treated as one single logical table
  for performance reasons (relationships query each logical table
  somewhat independently; a join always produces one flat result)

## Key terms

| Term | Meaning |
|---|---|
| Relationship | A flexible, context-aware link between two logical tables — no fixed join type, no automatic row duplication |
| Join | A fixed combine of physical tables inside one logical table's physical layer — behaves exactly like a SQL JOIN |
| Noodle | The line drawn between two logical tables on the relationship canvas, representing their relationship |
| Level of detail | The granularity of a table's rows — the reason relationships avoid duplicating rows a join would |

## Lab

1. In the Sample Superstore workbook (Lesson 3), connect Orders and
   Returns as two logical tables related by Order ID. Notice there's
   no join-type dropdown.
2. Build a worksheet that uses only Orders fields. Then add a field
   from Returns. Watch the row count — it doesn't blow up the way an
   eager join would, because Tableau only combines what the worksheet
   actually asks for.
3. Now double-click the Orders logical table and look at its physical
   layer — even with just one physical table inside, confirm this is
   a separate canvas from the relationship canvas you started on.

## Check yourself

You're ready for Lesson 49 when you can explain, without looking back,
why a relationship doesn't ask you to pick a join type — and name one
concrete situation where you'd still need a real join instead.
