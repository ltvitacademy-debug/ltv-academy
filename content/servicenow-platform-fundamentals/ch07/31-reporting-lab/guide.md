# Lesson 31 — Reporting Lab

**Chapter 7 · Reporting & Dashboards · Lesson 31 of 34**

## What you'll learn

- How to plan a real dashboard request from a stakeholder's plain-language ask
- How to build two different report types that answer two different questions about the same table
- How to assemble those reports onto a new dashboard, tab by tab
- How to restrict that finished dashboard to the one role it was actually built for
- How every decision in this lab traces back to a specific lesson earlier in this chapter

## The scenario

The Service Desk Manager sends a request: *"I want one place to check every morning — how bad is the current incident backlog, and which team is carrying it."* That's two separate questions, which means two separate reports, assembled onto one dashboard, visible only to the Service Desk Manager role. Nothing here is invented — it's the exact sequence Lessons 28 through 30 described, applied to one real request.

## Step 1 — Translate the ask into two reports

The manager's question splits cleanly along the line Lesson 28 drew between chart types:

- **"How bad is the current backlog" → a Pie chart of open incidents by priority.** Data source: the `incident` table. Report type: Pie chart. Group by: `Priority`. Filter: `Active is true`, so resolved and closed incidents don't dilute the picture. This answers "what does the backlog look like right now," broken into Priority 1 through Priority 4.
- **"Which team is carrying it" → a Bar chart of incidents by assignment group.** Same table, same filter (`Active is true`), but this time group by `Assignment group` instead of `Priority`, and use a Bar chart instead of a Pie chart, since the manager wants to compare groups side by side, not see a share of a whole.

Both reports run against the identical filtered population — active incidents — they just group that population by a different field and present it with a different chart type. That's the whole difference between the two reports: same table, same filter, different group-by, different chart type.

## Step 2 — Build each report in Report Designer

In Report Designer, each report is built independently, exactly as Lesson 28 walked through: pick the table, pick the type, pick the group-by field, add the filter condition, save and name the report clearly — for example, "Open Incidents by Priority" and "Open Incidents by Assignment Group" — so they're easy to find again in Step 3. Neither report references the other, and neither one is aware yet that it's headed for a dashboard. At this stage they're just two standalone reports that happen to answer the manager's two questions.

## Step 3 — Assemble both onto a new dashboard

With both reports saved, open the Dashboard application and create a new dashboard — "Service Desk Manager Overview" is a reasonable name. On its first tab, use Add Content to place "Open Incidents by Priority," then add a second widget on the same tab for "Open Incidents by Assignment Group." Resize them so both are visible without scrolling — Lesson 30's size-and-layout setting — and, if this dashboard is meant to stay open on the manager's second monitor, set a refresh interval so the counts stay current through the day without anyone manually reloading it.

## Step 4 — Restrict visibility to the role it was built for

The last step is the one it's easiest to skip, and the one Lesson 30 insisted mattered as much as the content itself: set the dashboard's visibility to the Service Desk Manager role. This is a backlog-and-staffing view, not something every end user needs to see about their own team. Setting that restriction now, at build time, is what keeps this dashboard reaching exactly the audience it was built for — no broader, no narrower.

## What this lab actually proved

Nothing in this scenario required a new concept. It required applying Lesson 28's table/type/group-by/filter sequence twice, for two different questions against the same table; applying Lesson 30's build-the-pieces-first-then-assemble order; and applying Lesson 30's visibility setting as a deliberate, final step rather than an afterthought. A real request, decomposed into the real pieces this chapter already gave you.

## Key terms

| Term | Meaning |
|---|---|
| Same table, different group-by | Two reports on `incident` can answer two different questions just by changing the group-by field and chart type |
| Report-first, dashboard-second | Reports and widgets must exist before they can be added to a dashboard's canvas |
| Backlog view | A dashboard answering "what does the current workload look like," typically Pie/Bar reports on open records |
| Role-restricted dashboard | A dashboard whose visibility is deliberately limited to the role it was built for |

## Check yourself

Walk through the whole lab from memory: what table, filter, group-by field, and chart type does each of the two reports use, and at what point in the process does the Service Desk Manager role restriction actually get applied?
