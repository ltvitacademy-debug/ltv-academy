# Dashboard Interactions & Actions

In native Salesforce dashboards, interactivity means the author sets a filter and viewers change it. CRM Analytics dashboards go further: a click on one widget can reshape every other widget, and a row in a table can lead straight into a Salesforce record or action. This lesson covers the three layers of interactivity, from the automatic to the hand-built, and what to check when a dashboard stubbornly refuses to respond. Screenshots come from Salesforce's own Trailhead material, and product menus shift between releases, so treat labels as a guide.

## What you'll learn

- How faceting lets one selection filter other widgets automatically
- The query-level settings that control faceting and global filters
- When to move from faceting to selection interactions (bindings)
- What dashboard actions add, and how to troubleshoot a widget that does not respond

## Layer 1: faceting

**Faceting** is the "set it and forget it" behavior. When a viewer makes a selection on a chart, date, list, range, or toggle widget, other widgets built on the same dataset filter automatically. The first screenshot shows an Opportunity Owner selector set to one person: the stacked column and the Key Metrics numbers narrow to that owner without anyone editing a query.

Faceting works automatically because those widgets share a dataset. If two widgets query different datasets, nothing connects them by default.

## Where the switches live

Each widget's query has properties in the designer's **Query** panel, shown in the second screenshot. Three settings matter most:

- **Faceting**: a dropdown that controls how this widget reacts to other widgets' selections. Salesforce's Trailhead material describes four options: All (the default), Include, Exclude, and None. Include and Exclude let you name specific widgets, but check the current documentation for exact behavior in your release.
- **Apply global filters**: whether the widget respects filters set once at the dashboard level. In the screenshot, this box is unchecked for the highlighted number, so global filters would not touch it.
- **Broadcast selections as facets**: whether a click on this widget filters the others. Turning it off leaves a chart clickable without affecting anything else.

## Layer 2: selection interactions

Faceting only reaches widgets on the same dataset and only filters. When you need more, you use a **selection interaction**, which is a binding: the result or selection of one query changes part of another query, such as a filter, a grouping, a measure, or even a widget's displayed text. You met bindings in the previous lesson. The rule of thumb: use faceting first because it needs no code, and reach for bindings when the built-in behavior cannot express what you need, for example connecting widgets from different datasets.

## Layer 3: actions

Interactions change what the dashboard shows. **Actions** take the viewer somewhere else. Depending on the widget and your configuration, a chart or table can offer an actions menu that opens the underlying Salesforce record or launches Salesforce global actions, so an insight such as a stalled deal leads directly to the next step. Dashboards can also link to other dashboards and pages. Availability of specific actions varies by widget type and release, so check the documentation before promising a stakeholder a particular button.

## When it does not work

A short checklist:

1. Do the widgets share a dataset? If not, faceting will not connect them.
2. Is the source widget's **Broadcast selections as facets** turned on?
3. Is the target widget's **Faceting** set to something other than None?
4. Is a global filter or an initial selection quietly narrowing the results?

## Recap

- Faceting is automatic filtering between widgets on the same dataset
- Query settings for faceting, global filters, and broadcasting control it
- Bindings handle what faceting cannot
- Actions turn an insight into a next step in Salesforce
- Troubleshoot in order: dataset, broadcast, faceting mode, global filters

## Check yourself

A chart selection does not filter a table on the same dashboard. Name two query settings you would check first.
