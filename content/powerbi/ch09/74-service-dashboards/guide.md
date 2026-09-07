# Lesson 74 — Dashboards in Power BI Service

**Chapter 9 · Power BI Service & Fabric · Lesson 8 of 8**

## What you'll learn

- What a service dashboard is, and why it's a service-only feature
- Tiles, pinning, and where a dashboard's data actually comes from
- Dashboards vs. reports — the differences that actually matter
- Who's allowed to create one, and the license it requires

## A single-page story

A **dashboard** is one page — often called a canvas — telling a
story through visualizations. Because it's limited to one page, a
well-designed dashboard shows only the highlights; anyone wanting more
detail clicks through to the underlying report.

![Screenshot of an example Power BI dashboard with several tiles.](/courses/power-bi/ch09/74-service-dashboards/power-bi-dashboard2.png)
*A dashboard: the highlights only, with every tile pointing back to a fuller report.*

Chapter 8's whole point — build the headline number first, everything
else supporting it — was preparing you for exactly this. A dashboard
*is* the executive-dashboard discipline, expressed as a Power BI
object with its own name and rules.

Dashboards are **service-only**. You never build or view one inside
Desktop, and you can't create one on a mobile device either (though
you can view and share existing ones there).

## Tiles come from somewhere else

The individual visualizations on a dashboard are called **tiles**, and
you **pin** them there from somewhere else — most often a report page,
but also from another dashboard, from Excel, or from a Q&A result.

![Diagram showing the relationship between dashboards, reports, and semantic models.](/courses/power-bi/ch09/74-service-dashboards/power-bi-diagram.png)
*A dashboard sits above one or more reports, which each sit on one semantic model — selecting a tile takes you down that chain.*

This layered relationship is why a dashboard can combine tiles pulled
from several different reports and semantic models into one
consolidated view — something no single report page could do on its
own, since a report only ever has one semantic model behind it.

## Dashboards vs. reports

| Capability | Dashboard | Report |
|---|---|---|
| Pages | One | One or more |
| Semantic models per object | One or more, combined | Exactly one |
| Filtering/slicing | No — can't filter or slice | Yes, extensively |
| Available in Desktop | No | Yes |
| Drilling down | Only if a full report page was pinned live | Yes |
| Alerts | Yes, on tiles | No |

The "no filtering" row surprises people used to reports: a dashboard
is meant to be glanced at, not interacted with the way a report is.
If you need a viewer to slice by region or date, that belongs in the
report the tile links to, not the dashboard itself.

## Who can build one

Creating a dashboard requires **edit** permissions on the underlying
report — which, in turn, requires a **Power BI Pro or Premium Per
User** license for workspaces (Lesson 68), though you can always
build one, license-free, in your personal **My Workspace**. Someone
who only *consumes* a report shared with them (rather than having
workspace edit access) generally can't pin tiles from it.

## Key terms

| Term | Meaning |
|---|---|
| Dashboard | A single-page canvas of tiles, service-only, telling a story at a glance |
| Tile | One visualization pinned onto a dashboard |
| Pin | The action of adding a tile to a dashboard, from a report, Excel, or Q&A |
| Live pin | Pinning an entire report page (rather than one visual) so it stays drillable |

## Lab

1. Open the `AdventureWorksDW2014` report you published in Lesson 70.
2. Pin two or three individual visuals as tiles to a new dashboard —
   pick the headline metric and one supporting chart, echoing
   Chapter 8's build order.
3. Try to filter the resulting dashboard the way you would a report.
   Confirm for yourself that it can't be done — that's expected, not a
   bug — and note which report you'd send someone to if they needed
   that level of detail.

## Check yourself

Chapter 9 is complete when you can trace, from memory, the full chain
from a dashboard tile down to its report, down to its semantic model —
and explain why a dashboard, unlike a report, can combine tiles from
more than one semantic model at once.

Chapter 10, **Refresh & Gateways**, picks up the thread this chapter
kept mentioning in passing: how published semantic models actually
stay current once your on-premises SQL Server data changes.
