# CRM Analytics Dashboards

You already built dashboards in native Salesforce, where each widget was a component sourced from a report. CRM Analytics dashboards look similar on the surface, but they are built differently and they can do far more, because every widget queries a dataset rather than a report. This lesson walks through the dashboard designer and the interactivity that makes these dashboards feel different in use.

## What you'll learn

- How to start a dashboard: blank or from a template
- The main widget types and what each is for
- How the layout grid and app location work
- What faceting is, and why it makes dashboards interactive

## Starting a dashboard

In Analytics Studio you choose Create, then Dashboard. The first screenshot shows the two options offered: **Blank Dashboard**, to build from scratch, or **Dashboard from Template**, to start from a design with suggested widgets. Templates are valuable because they encode a proven layout. One catch from Salesforce's tutorial: a template can only be applied when a dashboard is created. You cannot add one to an existing dashboard afterward, so decide up front.

When you save, you name the dashboard and choose the app it lives in. A private app is a good workspace while you build. Move or share it to a shared app once it is ready, because sharing is controlled at the app level.

## Widgets

A dashboard is a canvas of widgets placed on a cell-based grid. You size a widget by the number of cells it spans, for example a title text that runs the full width and number widgets a few cells wide each. The core types:

| Widget | Use |
|---|---|
| **Number** | A single key metric, such as open pipeline |
| **Chart** | Compare values across a dimension, such as amount by sales rep |
| **Table** | Record-level detail behind the summary |
| **Filter / selector** | List, date, range, or toggle controls that viewers use to change what they see |
| **Text, image, link** | Titles, labels, branding, and navigation |

Container widgets help group related elements. The finished dashboard in the second screenshot combines several of these: filter selectors along the top, a stacked column chart, a panel of key-metric numbers, and a detail table underneath.

Every chart, number, and table is powered by a step, the query against a dataset that you met in the architecture lesson. The designer offers wizards to build these steps quickly, and you can also edit the underlying query yourself once you learn SAQL in Chapter 3.

## Faceting: the interactive part

**Faceting** is what makes CRM Analytics dashboards feel alive. When a viewer makes a selection on a chart, date, list, range, or toggle widget, that selection automatically filters the other widgets on the dashboard that use the same dataset. The third screenshot shows this: the Opportunity Owner filter is set to one person, and the chart, the key numbers, and the table all narrow to that person's records at once. Nobody edited anything or reran a report.

This is a genuine difference from a native dashboard, where filters are configured by the author and each widget is a fixed view of a report. It is also why dataset design matters: widgets can only facet against each other when they share a dataset, or when you set up the connection yourself, which Chapter 3 covers with bindings and interactions.

## Design for devices

The designer lets you optimize a dashboard for different device types, such as desktop and mobile. Check the current documentation for how layouts are configured in your release.

## Recap

- Start blank or from a template, and choose the template at creation
- Number, chart, table, and filter widgets sit on a cell grid and are powered by steps
- Sharing happens at the app level
- Faceting lets one selection filter the other widgets

## Check yourself

You click one bar in a chart and the numbers and table on the same dashboard update instantly. What is this behavior called, and what has to be true of the widgets for it to work automatically?
