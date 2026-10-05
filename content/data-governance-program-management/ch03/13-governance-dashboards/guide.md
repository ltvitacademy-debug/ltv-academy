# Lesson 13 — Governance Dashboards

**Chapter 3 · Measuring Governance · Lesson 13 of 25**

## What you'll learn

- What a governance program dashboard needs to show, beyond a wall of numbers
- What a real scorecard/goals interface looks like, using Power BI's own Goals feature as a concrete example
- How the metrics from Lessons 11 and 12 map onto an actual screen a stakeholder would look at
- Design habits that keep a governance dashboard useful instead of ignored

## What a governance dashboard needs to show

Lessons 11 and 12 built the metric set: program health, data quality, adoption, issue resolution, each with leading and lagging versions. A dashboard is how that metric set becomes something a steering committee member — who does not want to read a spreadsheet — can understand in under a minute. A good governance dashboard answers the same core questions for the *program as a whole* that a single KPI answers for one metric:

1. **Is the program on track overall?** — a small number of headline indicators, not every metric from Lesson 11
2. **Where specifically is it off track?** — which domain, which category, which owner
3. **Is it trending the right direction?** — month over month or quarter over quarter, not just today's snapshot
4. **Who owns each item that needs attention?** — so a red status has an obvious next action

## What a real scorecard interface looks like

Most BI platforms that support dashboards also support a dedicated *scorecard/goals* interface, purpose-built to track metrics like these against a target over time. Power BI's own **Goals** feature is a useful concrete example of the pattern — it was not built for data governance specifically, but the structure (current value, target, trend, status, owner) is exactly what a governance program needs.

![Screenshot of the Power BI service's Scorecards hub, showing three recommended scorecard tiles — Profitability, Nurture Future, and Backlog Forecast — each with a current value over target, a day-over-day change, a trend sparkline, and a status pill (At risk / On track), plus a Recent list of named scorecards below.](/courses/data-governance-program-management/ch03/13-governance-dashboards/scorecards-hub.png)
*The Power BI service's Scorecards hub. Swap "Profitability" for "Governed domain coverage" and "Nurture Future" for "Critical-rule pass rate," and this is exactly the shape of screen a governance program's steering committee would look at: value, target, trend, and status for each tracked item, all at a glance.*

Opening one goal shows the fields that actually define a single tracked item:

![Screenshot of a scorecard's expanded goal row named "Profitability," showing a status summary (1 Goal, 0 Overdue, 0 Behind, 0 At risk, 0 On track) and fields for Owners, Current value (21.26%), Final target (25.00%), Status (On track), Start date, and Due date.](/courses/data-governance-program-management/ch03/13-governance-dashboards/goal-edit-pane.png)
*The fields behind one tracked goal — Owners, Current value, Final target, Status, Start date, Due date. These are exactly the fields a governance KPI needs too, whether the underlying number is a profitability percentage or a stewardship-coverage rate.*

A scorecard tool also needs a way to browse many metrics at once, organized and attributed:

![Screenshot of a scorecard list under Recent/Favorites/Shared with me/All scorecards tabs, showing two named scorecards — "Northwind goals" and "Sales & Returns scorecard" — each with Owner, Opened, Endorsement, and Sensitivity columns.](/courses/data-governance-program-management/ch03/13-governance-dashboards/goals-recent-list.png)
*Browsing multiple scorecards, each with a clear Owner column — exactly the "who acts on this" piece a governance dashboard also needs, so a steering committee isn't just looking at a number with no one attached to it.*

## Mapping the metrics onto the screen

| Lesson 11/12 concept | Where it lands on the screen |
|---|---|
| KPI's current value and target | The value-over-target numbers on each tile |
| Trend direction (leading/lagging) | The sparkline trend line on each tile |
| Status (on track / at risk / behind) | The colored status pill |
| KPI owner | The Owners field, and the Owner column on the scorecard list |

## Design habits that keep it useful

- **Keep the top level small** — five to ten headline metrics a steering committee actually cares about, not every KPI from Lesson 11, with drill-down available underneath for anyone who wants detail
- **Make status thresholds match what Lesson 9's escalation process actually uses** — a dashboard that disagrees with the thresholds people use to triage issues erodes trust fast
- **Never ship a metric without an owner attached** — an unowned red status is a dead end, not an action item
- **Refresh on a predictable cadence** — a dashboard that's stale for weeks gets ignored faster than one that was never built

## Key terms

| Term | Meaning |
|---|---|
| Scorecard / goals interface | A dashboard component purpose-built to track metrics against a target, with status and trend |
| Status pill | A colored label (on track / at risk / behind) judged against an agreed threshold |
| Headline metric | One of the small set of top-level metrics shown to a steering committee, as opposed to the full KPI list |
| Drill-down | The ability to go from a summary tile to the underlying detail behind it |

## Lab

Using the KPIs you wrote down in Lesson 11's lab, sketch a simple governance dashboard: one tile per KPI, with columns for current value, target, status, trend direction, and owner. Then write two sentences on which of your KPIs belongs at the "headline" level a steering committee sees first, and which belongs in the drill-down detail underneath.

## Check yourself

Can you name the four questions a governance dashboard needs to answer for the program as a whole? Can you explain how a scorecard interface like Power BI's Goals feature maps onto the KPI concepts from Lessons 11 and 12?
