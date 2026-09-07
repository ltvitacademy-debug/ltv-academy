# Lesson 34 — Calculated Columns

**Chapter 5 · DAX Fundamentals · Lesson 3 of 15**

## What you'll learn

- What a calculated column is, and how it differs from a Power Query custom column
- How to create one, with a real worked example
- When a calculated column recalculates — and when it doesn't
- Why calculated columns take up storage space, and what that means for performance

## Adding a column with DAX instead of Power Query

A **calculated column** adds new data to a table already in your model —
but instead of querying and loading its values from a data source, you
write a DAX formula that defines them. It's created in **Report**,
**Table**, or **Model** view, using **New Column**.

This is different from the custom columns you built with **Add Custom
Column** back in Chapter 3. Those are added *during* the Power Query
step, before data ever loads into the model. A calculated column works
*after* loading — built from data that's already there.

## A worked example

Here's a **Geography** table with separate **City** and **State**
columns:

![Screenshot of the Power BI Fields list showing a Geography table with separate City and State fields, no combined field yet.](/courses/power-bi/ch05/34-calculated-columns/calccolinpbid_cityandstatefields.png)
*Two separate fields. The report needs them combined as one value — "Seattle, WA" — for a map visual.*

Right-click **Geography**, select **New Column**, and enter:

CityState = [City] & "," & [State]

For every row in the **Geography** table, this takes the value in
**City**, adds a comma and a space, and appends the value in **State**.
The result appears immediately as a new field, ready to use anywhere a
normal column would go — including a map visual that now knows exactly
how to plot each shipment:

![Screenshot of a Power BI map visual titled "Shipments by CityState," showing bubble markers across a map of North America.](/courses/power-bi/ch05/34-calculated-columns/calccolinpbid_citystatemap.png)
*With CityState combining city and state into one recognizable location, the map visual can plot it directly.*

## When values recalculate

A calculated column's values are computed **once**, at the moment the
formula is entered, and stored in the model — not recalculated every time
a report is viewed. They only update again when:

- The table (or a related table) is refreshed, or
- The Power BI file is closed and reopened.

This is the opposite of how a measure behaves, which you'll meet next
lesson — measures recalculate dynamically, every time the filter context
changes.

## Storage cost: why this matters

Because a calculated column's values are stored for every row (in most
storage modes), a calculated column adds to your model's size the same
way an imported column would. A complex formula run over millions of
rows can meaningfully slow down data refresh, since Power BI has to
recompute and re-store every row's value each time.

Keep this trade-off in mind as you decide between a calculated column and
a measure: calculated columns cost storage and refresh time; measures
cost query time instead, calculated fresh on every view. Lesson 36 covers
this decision directly.

## Key terms

| Term | Meaning |
|---|---|
| Calculated column | A column added to an existing table, defined by a DAX formula, computed row by row |
| New Column | The Power BI Desktop feature used to create a calculated column |
| Recalculation | Updating a calculated column's stored values — happens on refresh, not on every view |

## Lab

1. Import **AdventureWorks2012**'s `Person.Person` table, which has
   separate `FirstName` and `LastName` columns.
2. Create a calculated column named `FullName` that concatenates them:
   `FullName = [FirstName] & " " & [LastName]`.
3. Add your new column to a table visual and confirm it displays
   correctly for every row.

## Check yourself

You're ready for Lesson 35 when you can explain, without looking it up,
when a calculated column's values get recalculated — and why that's
different from how a measure works.
