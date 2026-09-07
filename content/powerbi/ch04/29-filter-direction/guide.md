# Lesson 29 — Filter Direction

**Chapter 4 · Data Modeling · Lesson 6 of 8**

## What you'll learn

- What cross filter direction actually controls
- Why "Single" direction sometimes blocks a question you'd expect to work
- When "Both" fixes it — and when "Both" causes a new problem
- Why loops in your model make filter direction ambiguous

## The setting that decides how far a filter travels

Cardinality (Lesson 28) decides how values match up. **Cross filter
direction** decides something different: once two tables are related, how
far is a filter allowed to travel between them?

Take three tables: **ProjectHours** in the middle, related to
**CompanyProject** on one side and **CompanyEmployee** on the other. Count
employees per project, with both relationships set to filter in a single
direction — toward ProjectHours:

![Screenshot of a Power BI visual attempting to count employees per project, showing a column of identical values instead of distinct counts.](/courses/power-bi/ch04/29-filter-direction/candmrel_repcrossfiltersingle.png)
*Every value in this column comes out the same — filtering from CompanyProject doesn't reach CompanyEmployee.*

## Single: the common, default direction

With **Single** direction, a filter choice in a connected table only
affects the table doing the summarizing — not the other way around:

![Diagram showing a filter flowing in one direction from CompanyProject into ProjectHours, but not continuing on to CompanyEmployee.](/courses/power-bi/ch04/29-filter-direction/candmrel_singledircrossfiltering.png)
*Filtering by CompanyProject reaches ProjectHours just fine. It just doesn't continue on to CompanyEmployee — that's what Single means.*

This works for most reports, where you're filtering a fact table by its
surrounding dimensions. It only becomes a problem when you need a filter
to reach *past* the fact table to another dimension on the far side.

## Both: letting the filter continue through

Switch the cross filter direction to **Both**, and the filter keeps
traveling:

![Diagram showing a filter flowing both directions, reaching from CompanyProject through ProjectHours and on to CompanyEmployee.](/courses/power-bi/ch04/29-filter-direction/candmrel_bidircrossfiltering.png)
*With Both set, filtering by CompanyProject now reaches all the way to CompanyEmployee.*

With that change, the same report now returns real, distinct counts:

![Screenshot of the same visual now showing correctly varying employee counts per project instead of one repeated value.](/courses/power-bi/ch04/29-filter-direction/candmrel_repcrossfilterbi.png)
*Same report, Both set on the relevant relationships — the numbers now actually differ per project.*

**Both** works well for the classic star schema pattern: one central
fact table with several dimension tables around it, none of which connect
to each other except through the fact table.

## When Both creates ambiguity instead

Set every relationship to **Both** in a model with **loops** — where two
tables can be reached from each other by more than one path — and Power BI
often won't allow it:

![Diagram of four tables forming a loop: TableX connects to two tables, which both connect onward to TableY, and an arrow shows an ambiguous path back to TableX.](/courses/power-bi/ch04/29-filter-direction/candmrel_crossfilterwithloops.png)
*If TableX and TableY are also connected some other way, a Both-direction filter has more than one route to take — Power BI can't pick for you.*

A common real-world version of this: a sales-actuals table and a
budget table, both connected to the same department lookup table. Setting
**Both** everywhere here creates exactly the kind of ambiguity Power BI
blocks. Two fixes:

- Mark one of the relationships **inactive** (Lesson 30 covers this).
- Bring the shared lookup table in twice, under two different names, so
  each fact table has its own dedicated path — turning the loop into two
  separate star shapes.

## Key terms

| Term | Meaning |
|---|---|
| Cross filter direction | How far a filter travels once a relationship connects two tables |
| Single | The default — a filter only affects the table doing the summarizing |
| Both | The filter continues through to tables on the far side of the relationship |
| Loop | A model shape where two tables can be reached from each other by more than one path |

## Lab

1. Import **AdventureWorksDW2014**'s `FactInternetSales`, `DimDate`, and
   `DimSalesTerritory` — a real star with `FactInternetSales` in the
   center.
2. Edit the `DimDate` relationship and toggle Cross filter direction
   between **Single** and **Both**. Build a visual with a `DimDate`
   column and a `DimSalesTerritory` column, both filtering
   `FactInternetSales` — watch how the result changes (or doesn't)
   between the two settings.
3. Also import `FactResellerSales`, which shares `DimSalesTerritory`
   with `FactInternetSales` — that shared dimension is a loop. You'll
   fix exactly this kind of ambiguity in Lesson 30.

## Check yourself

You're ready for Lesson 30 when you can explain why **Both** works well
in a plain star schema, but can cause Power BI to reject a relationship in
a model with loops.
