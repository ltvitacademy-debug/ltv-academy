# Lesson 29 — Performance Analytics: Overview

**Chapter 7 · Reporting & Dashboards · Lesson 29 of 34**

## What you'll learn

- The real question a Report answers versus the real question Performance Analytics (PA) answers
- Why a point-in-time query can't show trend, and what "snapshot" means in PA
- What a collector job is and how it captures a KPI score daily
- What a PA Indicator, a Widget, and a Breakdown are, in plain terms
- Why PA is licensed as a separate, more advanced add-on in many ServiceNow editions

## A Report answers "right now." PA answers "over time."

Everything in Lesson 28 — the Pie chart, the Bar chart, the Pivot Table — runs a live query against a table the moment you open it. That's a real strength: it's always current. It's also a real limit: a Report has no memory. Ask it "how does today's open-incident count compare to last Tuesday's," and it can't answer, because it only ever sees the table as it exists right now. The moment a record changes, the report's previous answer is gone — there was never a stored history to look back on.

Performance Analytics exists specifically to close that gap. **A Report answers "what does this look like right now." PA answers "how has this changed over time."** That distinction is the entire reason PA exists as a separate product layered on top of ordinary reporting, and it's the one idea this lesson needs you to walk away with.

## Snapshots: the mechanism that makes trend possible

PA doesn't query the live table when you look at a trend chart. Instead, it runs scheduled **collector jobs** — typically once a day — that each capture a single number at that moment and store it permanently as a **snapshot**. "Number of open incidents," captured every day at midnight, becomes 365 stored data points a year, each one frozen at the moment it was captured. A live Report could never produce that history, because by the time you ran it next Tuesday, today's exact count would already be gone. PA's value is entirely in having captured and kept that number before it changed.

With a year of daily snapshots sitting in storage, PA can finally answer the questions a Report structurally cannot: this week versus last week, this month versus the same month last year, a 90-day trend line showing whether open incidents are climbing or shrinking. None of that is a cleverer query — it's the accumulated history that only snapshotting produces.

## Indicators, widgets, and breakdowns

PA's building blocks have their own vocabulary. An **Indicator** is the KPI itself — "Number of Open Incidents," "Average Time to Resolve," "SLA Breach Rate" — the thing a collector job snapshots on a schedule. A PA **Widget** is how an indicator's history gets displayed — a trend line, a scorecard with a target, a time series chart — and widgets are what actually get placed onto dashboards. A **Breakdown** slices an indicator's history by a dimension, such as priority or assignment group, the same way a group-by field slices a report, except now each slice has its own history over time, not just a current count.

## Why PA is its own product

In many ServiceNow editions, Performance Analytics is licensed separately from the base reporting that ships with every instance. That's not an accident of packaging — it reflects real additional engineering: collector jobs that run on schedule, a dedicated snapshot data store, and a KPI/target framework that ordinary reports have no equivalent for. An org that only ever needs "what does this look like right now" can run entirely on base Reports. An org that needs to prove a KPI is trending the right direction over a quarter needs PA.

## Key terms

| Term | Meaning |
|---|---|
| Snapshot | A single captured value of a KPI, frozen at one point in time and stored permanently |
| Collector job | A scheduled PA job that runs on a recurrence (typically daily) and captures a new snapshot |
| Indicator | A KPI defined for PA to track, such as "Number of Open Incidents" |
| Widget | How an indicator's history is displayed — trend line, scorecard, time series — placed on a dashboard |
| Breakdown | A dimension (e.g. priority) used to slice an indicator's history into separate trend lines |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why can't a standard Report, no matter how well it's filtered or grouped, ever show you "this week versus last week" the way Performance Analytics can?
