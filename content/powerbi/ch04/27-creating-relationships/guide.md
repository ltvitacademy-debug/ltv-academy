# Lesson 27 — Creating Relationships

**Chapter 4 · Data Modeling · Lesson 4 of 8**

## What you'll learn

- What actually breaks when two tables have no relationship
- How autodetect creates relationships for you on load
- How to create a relationship manually, step by step
- Where to go to edit or delete a relationship later

## The problem, made visible

Here's a table visual built from two unrelated tables: a **Priority**
column from one table, and a summed **Hours** column from another.

![Screenshot of a Power BI table visual showing Priority (A, B, C) and Hours, all rows displaying the same total of 256.](/courses/power-bi/ch04/27-creating-relationships/candmrel_reportfiltersnorel.png)
*Every row shows 256 — the grand total, repeated. Power BI has no relationship to tell it which hours belong to which priority.*

That's the cost of a missing relationship: not an error message, just
silently wrong numbers. Once the two tables are connected correctly, the
same visual tells the real story:

![Screenshot of the same table visual, now showing Priority A at 31 hours, B at 77, and C at 148 — correctly split totals.](/courses/power-bi/ch04/27-creating-relationships/candmrel_reportfilterswithrel.png)
*Same visual, same two tables — now split correctly, because a relationship exists to carry the filter.*

## Autodetect: often, you don't have to do anything

When you load two or more tables at once, Power BI Desktop looks at your
column names and tries to detect matching relationships automatically. If
it finds a strong match — same or very similar column names, compatible
data — it creates the relationship without being asked. You can also
trigger this manually any time: **Modeling** ribbon → **Manage
relationships** → **Autodetect**.

Autodetect is right more often than not, but it's worth checking its work
in Model view after a big import, especially when column names don't
match exactly.

## Creating a relationship manually

When autodetect doesn't find a match — usually because the columns are
named differently even though they hold the same values — build the
relationship yourself:

![Screenshot of the Create relationship dialog, with the ProjectHours table's Project column selected on one side and the CompanyProject table's ProjName column selected on the other, and Cardinality and Cross filter direction options at the bottom.](/courses/power-bi/ch04/27-creating-relationships/candmrel_create_compproj.png)
*Modeling ribbon → Manage relationships → New. Pick a table and column on each side — the values don't need matching names, just matching values.*

1. On the **Modeling** ribbon, select **Manage relationships** → **New**.
2. Pick the first table and the column you want to relate.
3. Pick the second table and its matching column.
4. Review the automatically-suggested **Cardinality** and **Cross filter
   direction** (Lessons 28 and 29 cover exactly what these mean), then
   select **OK**.

If Power BI shows *"One of the columns must have unique values,"* at least
one side of your relationship needs a column with no duplicates — that's a
requirement of every relationship, not just this one. Fix it by removing
duplicates, or by routing through an intermediary table of distinct keys.

## Editing a relationship later

Relationships aren't fixed once created. Open the **Edit relationship**
dialog any time you need to change cardinality, cross filter direction, or
which relationship is active:

![Screenshot of the Edit relationship dialog, showing two tables with a column selected on each side plus Cardinality and Cross filter direction controls.](/courses/power-bi/ch04/27-creating-relationships/relationships-options-04.png)
*Reach this from Manage relationships → select a relationship → Edit, or by double-clicking the relationship line in Model view.*

You'll find the same options reachable several ways — from **Manage
relationships**, from the **Properties** pane in Model view, or by
double-clicking the line between two tables. Use whichever feels most
natural; they all edit the same relationship.

## Key terms

| Term | Meaning |
|---|---|
| Autodetect | Power BI's automatic relationship creation based on matching column names |
| Manage relationships | The dialog for creating, editing, and deleting relationships |
| Create relationship dialog | Where you manually pick two tables and columns to relate |

## Lab

1. Open the file from Lesson 24's lab — `Person.Person` and
   `Sales.SalesOrderHeader` from **AdventureWorks2012**, still
   unrelated.
2. Use **Manage relationships** → **New** to connect them manually.
   `Person.Person`'s `BusinessEntityID` matches
   `Sales.SalesOrderHeader`'s `CustomerID` only indirectly (through the
   `Sales.Customer` table) — so for practice, instead import
   **Northwind**'s `Customers` and `Orders` tables, which relate
   directly on `CustomerID`, and connect those manually.
3. Rebuild a simple visual (like order count by customer) and confirm
   the numbers now split correctly instead of repeating the grand total.

## Check yourself

You're ready for Lesson 28 when you can describe, from memory, the four
steps to manually create a relationship between two tables.
