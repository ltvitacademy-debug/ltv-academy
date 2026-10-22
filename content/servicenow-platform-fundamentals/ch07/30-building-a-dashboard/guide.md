# Lesson 30 — Building a Dashboard

**Chapter 7 · Reporting & Dashboards · Lesson 30 of 34**

## What you'll learn

- What a Dashboard is: a container of Reports and PA Widgets arranged on tabs
- How the Dashboard application differs from Report Designer and from PA itself
- The real configurable options — layout/size, refresh interval, and role-based visibility
- How a widget (a Report or a PA Widget) actually gets added to a dashboard's canvas
- Why visibility matters as much as content when a dashboard reaches a specific audience

## A dashboard is a container, not a chart

Everything in Lessons 28 and 29 produced one thing at a time: one report, one PA indicator with its widget. A **dashboard** is the layer above both — a single page that holds multiple reports and/or PA widgets side by side, organized onto one or more **tabs**, so a manager can see everything they need in one place instead of opening six separate reports one at a time. A dashboard doesn't generate any new data itself; it's purely a canvas that arranges content that already exists.

## Built in the Dashboard application

Dashboards are built in ServiceNow's **Dashboard application**, a distinct space from Report Designer. Report Designer is where you create the individual report in the first place; the Dashboard application is where you create a new dashboard, add tabs to it, and then drag existing reports and PA widgets onto its canvas. The relationship is sequential: you build the Pie chart and the Bar chart as standalone reports first, using everything from Lesson 28, and only afterward open the Dashboard application to place them together.

## Adding widgets to the canvas

Inside the Dashboard application, a blank dashboard starts as an empty canvas on a single tab. From there, an admin adds a widget — ServiceNow's term for anything placed on the canvas, whether it's a standard Report or a PA Widget from Lesson 29 — by opening the "Add Content" panel and selecting the already-built report or indicator widget by name. Multiple widgets can sit on the same tab, and multiple tabs let a single dashboard group related widgets separately — for example, an "Incidents" tab and a "Changes" tab on the same Service Desk Manager dashboard.

## Real configurable options

Once widgets are placed, three settings are what actually make a dashboard usable rather than just populated:

- **Size and layout** — each widget can be resized and repositioned on the canvas grid, so a high-priority chart gets more visual weight than a secondary one.
- **Refresh interval** — a dashboard can be configured to automatically refresh its widgets on a timer, which matters most for live operational dashboards meant to stay open on a wall monitor or a second screen all day.
- **Role-based visibility** — a dashboard can be restricted to specific roles or groups, so only the intended audience ever sees it. This is the setting that turns "a dashboard that exists" into "a dashboard that reaches the right people and no one else."

## Visibility is not an afterthought

It's tempting to treat role-based visibility as a minor permissions checkbox added at the end, but it's really a core design decision, made the same way a report's filter condition was in Lesson 28. A dashboard built for a Service Desk Manager, showing team-level performance data, is not something every end user should be able to open. Setting visibility to the Service Desk Manager role (or a specific group) at the time the dashboard is built — not as a later fix — is what keeps the right data in front of the right audience from day one.

## Key terms

| Term | Meaning |
|---|---|
| Dashboard | A container page holding multiple reports and/or PA widgets, arranged on one or more tabs |
| Dashboard application | The ServiceNow tool for creating dashboards, tabs, and placing widgets on a canvas |
| Widget (on a dashboard) | Any report or PA widget placed onto a dashboard's canvas |
| Refresh interval | How often a dashboard automatically re-pulls data for its widgets |
| Role-based visibility | A dashboard setting restricting who can see it, by role or group |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: what has to exist *before* you can open the Dashboard application and add a widget — and what setting determines who is actually allowed to see the finished dashboard?
