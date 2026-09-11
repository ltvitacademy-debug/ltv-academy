# Lesson 27 — Drillthrough Reports

**Chapter 6 · Drilldowns & Navigation · Lesson 27 of 40**

## What you'll learn

- What a drillthrough report is, and why it's a genuinely separate
  report, not an in-place toggle
- The exact steps to wire up a "Go to report" action, including how
  parameters get passed
- Why parameter names must match the target report exactly
- Why drillthrough reports are lazier — and often cheaper — than
  subreports

## A link that opens a different report

A **drillthrough report** is the report that opens when a user selects
a link in another paginated report — commonly a text box, an image, or a
data point on a chart. The report the user started on is the **main
report**; the one that opens is the **drillthrough report**. A classic
example: a sales summary report lists order numbers and totals. Clicking
an order number opens a separate report with that order's full detail.

Crucially, the drillthrough report's data isn't retrieved until the user
actually clicks the link. That makes drillthrough reports typically
**cheaper to run** than the alternative you'll meet next lesson —
subreports, which query their data at the same time as the main report,
whether the user ever looks at them or not.

## Design the drillthrough report first

You always build the *target* report before you wire up the link. A
drillthrough report is usually parameterized — it accepts one or more
parameters (like an order number) that determine what data to show, and
those parameters get passed to it from the main report.

## Adding the drillthrough action

To add a drillthrough link to any item with an Action property — a text
box, image, or chart:

1. In Design view, right-click the item and select **Properties**.
2. In the item's Properties dialog, select the **Action** tab.
3. Select **Go to report**.
4. In **Specify a report**, either **Browse** to the target report or
   type its name — Browse fills in the correct path automatically.
5. In **Use these parameters to run the report**, select **Add** for
   each parameter the target report needs. For each row, set the
   **Name** (the target report's parameter) and the **Value** (a static
   value or an expression from the main report's fields).
6. Select **OK**, then test by running the main report and clicking the
   linked item.

## Parameter names must match — exactly

The names in the parameter grid must match the target report's expected
parameters **exactly, including case**. If a name doesn't match, or an
expected parameter is missing from the list entirely, the drillthrough
report fails when the user clicks the link. This is the single most
common way a drillthrough breaks in practice.

## Report action vs. URL action

You can wire a drillthrough as a **report action** (the target report
must live on the same report server as the main report — different
folder is fine) or a **URL action** (targeting a fully qualified URL).
If your report server is configured in SharePoint integrated mode, only
URL actions are supported.

## Key terms

| Term | Meaning |
|---|---|
| Main report | The report the user starts on and clicks a link inside |
| Drillthrough report | The separate report that opens when the link is clicked |
| Go to report | The Action-tab option that turns an item into a drillthrough link |
| Report action | A drillthrough that targets a report on the same report server |
| URL action | A drillthrough that targets a fully qualified URL instead |

## Lab

1. Design a simple parameterized report (the drillthrough target) that
   filters `Sales.SalesOrderDetail` by a `SalesOrderID` parameter.
2. In a separate summary report listing order numbers, right-click the
   `SalesOrderID` text box, open its Action tab, and set **Go to
   report** pointing at the report from step 1.
3. Add a parameter row: Name = the target report's parameter, Value =
   the `SalesOrderID` field from the summary report.
4. Publish both reports to the same folder on your Report Server, run
   the summary report, and click an order number to confirm the detail
   report opens with the matching order.

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: why is
a drillthrough report typically cheaper to run than a subreport, and
what's the single most common reason a drillthrough action fails at run
time?
