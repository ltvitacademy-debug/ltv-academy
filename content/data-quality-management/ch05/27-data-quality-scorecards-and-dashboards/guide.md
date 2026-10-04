# Lesson 27 — Data Quality Scorecards and Dashboards

**Chapter 5 · Remediation and Monitoring · Lesson 27 of 30**

## What you'll learn

- What a data quality scorecard needs to show, beyond a single pass/fail
  number
- What a real KPI/scorecard interface looks like, using Power BI's own
  Goals feature as a concrete example
- The difference between a scorecard (status-at-a-glance) and a
  dashboard (status plus the detail behind it)
- Design habits that keep a quality dashboard useful instead of ignored

## What a data quality scorecard needs to show

Lesson 26's monitoring produces a stream of pass-rate history. A
**scorecard** is how that history becomes something a stakeholder — who
has never written a SQL rule and never will — can understand in five
seconds. A good data quality scorecard answers four questions for each
metric it tracks:

1. **What's the current value?** (e.g., 97.2% of orders pass
   completeness checks)
2. **Is that good or bad?** — a status, usually a simple color or label
   (on track, at risk, behind), judged against the threshold from
   Lesson 21
3. **Is it getting better or worse?** — a trend line, not just today's
   snapshot
4. **Who owns it?** — so "at risk" has an obvious next action, not just
   a red dot nobody's responsible for

## What a real scorecard interface looks like

Most BI platforms that support dashboards also support a dedicated
*scorecard/goals* interface, built specifically to track metrics like
this against a target over time. Power BI's own **Goals** feature is a
good concrete example of the pattern — the same current-value / target
/ status / trend structure described above, just built for general
business goal tracking rather than data quality specifically.

![Screenshot of the Power BI service's Scorecards hub, showing three recommended scorecard tiles each with a current value, a target, a percent-complete trend line, a status pill (On track / At risk), and a due date.](/courses/data-quality-management/ch05/27-data-quality-scorecards-and-dashboards/scorecards-hub.png)
*The Power BI service's Scorecards hub — an example of what a KPI/scorecard interface looks like: current value, target, trend, status, and due date, all visible at a glance. This is Power BI's general-purpose Goals feature, not a data-quality-specific product.*

Each tile in that hub maps cleanly onto the four questions above: the
current value and target answer "what's the value," the trend line
(the little sparkline-style area chart) answers "better or worse," and
the colored status pill answers "good or bad" at a glance.

Opening one specific goal shows the fields that actually define it:

![Screenshot of the goal-editing pane for a goal named "Profitability," showing fields for Current value (21.26%), Final target (25.00%), Status (On track), Start date, and Due date.](/courses/data-quality-management/ch05/27-data-quality-scorecards-and-dashboards/goal-edit-pane.png)
*Defining a single goal — current value, target, and status are exactly the fields a data quality scorecard needs for each metric it tracks, whether the underlying number is a profitability percentage or a completeness pass rate.*

A scorecard tool also needs a way to browse and organize many metrics
at once, not just view one:

![Screenshot of a scorecard's list of goals under "Recent," "Favorites," "Shared with me," and "All scorecards" tabs, showing two named scorecards with Owner, Opened, Endorsement, and Sensitivity columns.](/courses/data-quality-management/ch05/27-data-quality-scorecards-and-dashboards/goals-recent-list.png)
*Browsing multiple scorecards, each with a clear owner column — exactly the "who owns it" piece a data quality scorecard also needs.*

## Scorecard vs. dashboard

The terms get used loosely, but they serve slightly different purposes:

| | Scorecard | Dashboard |
|---|---|---|
| Primary question | "Are we on track?" | "What's actually happening, in detail?" |
| Audience | Executives, stakeholders who need status, not mechanics | Analysts and data owners who need to investigate |
| Typical content | A handful of metrics, status, trend | Many visuals: breakdowns by table, by rule, by owner, drill-through to failing rows |

A healthy data quality program usually has both: a scorecard for the
five-second status check, and a dashboard underneath it for anyone who
needs to go find out *why* a metric is at risk.

## Design habits that keep it useful

- **Show trend, not just today's snapshot** — a single number can't
  tell you if things are improving; Lesson 26's logged history can
- **Make status thresholds match Lesson 21's agreed tolerances** — a
  scorecard that disagrees with the thresholds people actually use to
  triage issues erodes trust fast
- **Put an owner on every tile** — an unowned red status is a dead end
- **Keep the top level small** — five to ten metrics a stakeholder
  actually cares about, not every rule in Chapter 4, with drill-down
  available for anyone who wants more

## Key terms

| Term | Meaning |
|---|---|
| Scorecard | A status-at-a-glance view: current value, target, status, trend |
| Dashboard | A more detailed view supporting investigation, built on the same data |
| Goal (Power BI) | Power BI's term for one tracked metric with a current value and target |
| Status pill | A colored label (on track / at risk / behind) judged against a threshold |

## Lab

1. Pick three data quality metrics from earlier chapters (for example:
   completeness pass rate, referential integrity violation count,
   duplicate rate) and sketch a simple scorecard for them — one row per
   metric, with columns for current value, target, status, and owner.
2. For one of the three, write the status rule in plain language (e.g.,
   "On track if pass rate ≥ 98%, At risk if 95–98%, Behind if below
   95%") using thresholds consistent with Lesson 21.
3. Write one sentence describing what a stakeholder should be able to
   click on from your scorecard to reach the underlying dashboard
   detail.

## Check yourself

Can you name the four questions a good data quality scorecard answers
for each metric? Can you explain, in your own words, the difference
between a scorecard and a dashboard, and why a mature program usually
needs both?
