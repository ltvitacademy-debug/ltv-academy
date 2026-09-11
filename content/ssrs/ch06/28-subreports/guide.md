# Lesson 28 — Subreports

**Chapter 6 · Drilldowns & Navigation · Lesson 28 of 40**

## What you'll learn

- What a subreport is, and how it differs from both a drilldown and a
  drillthrough
- The exact steps to insert one and configure it in the Subreport
  Properties dialog
- How to pass parameters from the main report into the subreport
- Why a subreport in a dynamic row or column deserves a second look

## One report, embedded inside another

A **subreport** is a reference to another report, embedded inside a
main report so the main report acts as a container for multiple related
reports. Any existing report can be used as a subreport — you just have
to design it first. This is different from both drilldown (an in-place
toggle) and drillthrough (a separate report opened by a click): a
subreport is physically part of the main report's layout, and its data
gets retrieved **at the same time** as the main report's — whether or
not anyone ever looks closely at it.

## Adding a subreport

1. On the **Insert** tab, select **Subreport**.
2. On the design surface, drag a box for the subreport (or click once
   for a default-sized box).
3. Right-click the subreport and select **Subreport Properties**.
4. In the **Name** field, accept the default (`Subreport1`,
   `Subreport2`, …) or enter something more descriptive. The name must
   be unique within the report.

![Subreport Properties dialog, General tab, with the Name field highlighted in a red box, showing "Subreport1".](/courses/ssrs/ch06/28-subreports/subreport-properties-name.png)
*The General tab — Name, plus "Use this report as a subreport."*

5. In **Use this report as a subreport**, select **Browse** (preferred
   — it fills in the correct path automatically) or type the report's
   name.
6. Optionally set **Omit border on page break** to **Yes**, so a border
   doesn't render mid-page if the subreport spans more than one page.
7. Select **OK**.

## Passing parameters to a subreport

If the subreport report accepts parameters, pass them from the
**Parameters** tab of the same Subreport Properties dialog:

1. Select the **Parameters** tab, then **Add** — a new row appears in
   the parameter grid.
2. In **Name**, choose (or type) a parameter defined in the subreport —
   this must match a **report parameter**, not a query parameter.
3. In **Value**, enter a static value or an expression referencing a
   field from the main report.

![Subreport Properties dialog, Parameters tab, with one row: Name JanuarySales, Value 400.43.](/courses/ssrs/ch06/28-subreports/subreport-properties-parameter.png)
*The Parameters tab — one row per subreport parameter.*

Repeat for each parameter the subreport expects. There's an important
difference between the two design tools here: in **Report Builder**, a
missing parameter is fine as long as the subreport has a default value
defined for it. In **Report Designer** (SSDT), *every* required
parameter must be listed, or the subreport won't display correctly.

## Subreports in dynamic rows or columns

You can drop a subreport into a dynamic row or column of a table or
matrix — the subreport then runs once per row. Before doing that,
though, consider whether a **nested data region** could achieve the same
result without processing a separate report execution per row, which
gets expensive fast on a table with many rows.

## Key terms

| Term | Meaning |
|---|---|
| Subreport | A reference to another report, embedded inside a main report |
| Subreport Properties | The dialog where you set the target report, name, border, and parameters |
| Report parameter | The kind of parameter a subreport parameter Value must match (not a query parameter) |
| Nested data region | An alternative to a per-row subreport that avoids a separate report execution for every row |

## Lab

1. Design a small standalone report — for example, order line details
   filtered by an `OrderID` parameter — and publish it.
2. In a different summary report, insert a **Subreport**, open its
   Subreport Properties, and Browse to the report you just published.
3. On the **Parameters** tab, add a row passing the summary report's
   `OrderID` field as the value for the subreport's parameter.
4. Run the summary report and confirm the subreport's detail renders
   inline, with data matching the current order.

## Check yourself

You're ready for Lesson 29 when you can explain, without looking: how is
a subreport's data-loading behavior different from a drillthrough
report's, and what's the difference between a report parameter and a
query parameter in the context of passing values to a subreport?
