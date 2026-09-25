# Building the Executive Dashboard

You have combined leads, opportunities and cases, and you have cleaned the data. Now you build the thing the VP of Sales at Alder & Vale Systems actually asked for: one executive CRM dashboard covering leads, pipeline and service health. This lesson gives you the design decisions and a checklist, not click-by-click steps. You have built dashboards before; Project 3 is about judgment. Every figure below is illustrative.

## What you'll learn

- How to lay out an executive dashboard in four bands
- Which six KPIs earn a place at the top
- How to use dashboard filters, the running user and refresh settings sensibly
- What to check before the dashboard goes anywhere near a phone
- A hedged way to decide between native dashboards and Tableau

## Start from the VP's question

The brief is one sentence: leads, pipeline and service health on one screen. That is three stories, so the dashboard needs a clear order and very few components. Native Salesforce dashboards allow up to 20 components, and an executive view should use far fewer. If a component does not help the VP decide something, it belongs in a report, not on the dashboard.

## The four-band layout

1. **Filters.** A Lightning dashboard supports up to three filters. For Alder & Vale, a close date range, an owner (rep), and a lead source are a sensible set.
2. **KPI row.** Six single-number tiles, one idea each.
3. **Trends and breakdowns.** Two or three charts: pipeline by stage, closed won against quota by rep, cases by priority or age.
4. **Detail.** One table the VP can act on, such as the stalled deals list.

Reading order is left to right, top to bottom, so put the most important tile top left.

## The six KPIs

Illustrative values for Alder & Vale, year to date through September:

| KPI | Value | Source report |
|---|---|---|
| Closed won vs $9.0M annual quota | $5.4M (60%) | Opportunities |
| Pipeline coverage of the $3.6M gap | 2.0x ($7.2M open) | Opportunities |
| Win rate (by count) | 27% | Opportunities |
| New leads this quarter | 1,480 | Leads |
| Open case backlog | 187 | Cases |
| Cases resolved within target | 71% | Cases |

Each tile comes from one report, so any cross-object arithmetic has to live in that report as a summary formula, or outside the dashboard. That is one of the main lessons of the combining step in this chapter.

## Filters, running user and refresh

A dashboard filter only reaches components whose source report includes that field. Check every component after you add a filter; a chart that silently ignores a filter is worse than no filter. Choose the running user deliberately. A fixed running user shows every viewer that person's data, which is what an executive summary usually needs, but it also means viewers see records they may not normally access. Whether a dynamic dashboard is available, and how many you can have, depends on your Salesforce edition, so verify in your org. Schedule a refresh, and make sure the "as of" time is visible.

## Mobile check

Executives open dashboards on phones. In the Salesforce mobile app, components generally stack in a single column in reading order, so the top-left tile becomes the first thing scrolled to. Preview it there or in a narrow browser window, and confirm titles are readable and the detail table is not the first thing on the screen.

## Native or Tableau?

Treat this as a decision with trade-offs rather than a rule. Native dashboards win when the VP lives in Salesforce, the data is one report per component, and speed to ship matters. Tableau wins when you need to blend objects at row level in one view, do calculations across sources, or control the design more closely. A reasonable plan: ship the native dashboard first, then note which questions it could not answer as evidence for Tableau. Your org's licences may also make the choice for you.

## Recap

Four bands, six KPIs, at most three filters, a deliberate running user, a mobile preview, and an honest note on where native stops. Next you present the dashboard to the VP.
