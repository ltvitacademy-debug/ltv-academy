# Dashboard Filters

One dashboard often has to serve many audiences. The regional manager wants only her
region, the finance partner wants this fiscal quarter, and the executive wants everything.
You could build a copy of the dashboard for each of them, but there is a better answer:
a **dashboard filter**. One control at the top of the dashboard narrows every compatible
widget beneath it.

## What you'll learn

- What a dashboard filter is and how it differs from a report filter
- How to add one in the Lightning Dashboard Builder
- Why some widgets respond to a filter and others do not
- The practical limits to plan around

## Report filters versus dashboard filters

Back in the filtering chapter you learned to narrow a report with standard filters,
cross filters, and filter logic. A report filter is baked into the report, so it applies
to everyone, every time. A **dashboard filter** sits on the dashboard, and the viewer
chooses a value at view time. It narrows the data each widget displays without editing
any source report.

If you think in SOQL, a dashboard filter behaves like an extra `WHERE` condition
appended to the query behind each widget. The widget's own report filters still apply;
the dashboard filter adds one more on top.

## Adding a filter

In the Dashboard Builder, the toolbar has a **+ Filter** button beside **+ Widget**.
Choosing it opens the filter builder:

1. Pick the **field** to filter on, such as Type, Account Name, or a date field.
2. Give the filter a display name that makes sense to viewers.
3. Set the values or ranges viewers can choose from.
4. Save the dashboard.

In the screenshot for this lesson, a Sales Overview dashboard has three filters across
the top: Type, Shipping Country, and Account Name. Each widget's footer shows a small
filter icon and the fields being applied, so viewers can see what is narrowing their
numbers.

## Which widgets respond

A dashboard filter works by matching a field on the filter to the same field in each
widget's source report. That has a practical consequence: **a widget responds only if
its source report includes that field**, typically through its report type. A pipeline
report filtered by Account Name will respond; a report on a different object with no
path to Account will not, and it will keep showing everything. Lightning tables are
documented as compatible with dashboard filters, while legacy table components are
not. When a filter seems to do nothing, check the widget's source report first.

## Limits to plan around

- Lightning dashboards allow only a small number of filters per dashboard, commonly
  three. Choose fields that matter to every viewer.
- Filters change what is displayed, not what is stored. The source reports are
  untouched.
- Choose date filters carefully. A dashboard filtered on Close Date will not help a
  widget whose report is about Created Date.

## Recap

A dashboard filter lets one dashboard serve many audiences by adding a viewer-chosen
condition on top of each widget's own report filters. It only affects widgets whose
source reports contain the filtered field, and the number of filters is limited. Design
your source reports with shared fields in mind. Next, we make the dashboard personal
with dynamic dashboards.
