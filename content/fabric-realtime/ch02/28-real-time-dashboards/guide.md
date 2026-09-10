# Lesson 28 — Real-Time Dashboards

**Chapter 2 · Real-Time Data Engineering · Lesson 28 of 70**

## What you'll learn

- The Real-Time Dashboard item — a Fabric artifact built directly on KQL
- Tiles, base queries, and auto-refresh
- Cross-filtering between tiles — a KQL-native feature, not Power BI's
- Real-Time Dashboards vs. a Power BI Direct Lake report (Lesson 12)

## The Real-Time Dashboard item

A **Real-Time Dashboard** is its own item type in a Fabric workspace,
built directly on top of KQL queries against a KQL Database — no
Power BI, no semantic model, no Direct Lake mode involved at all.
Each tile on the dashboard is one KQL query, rendered as a chart,
table, or single stat.

```kql
RawTripEvents
| where ingestion_time() > ago(1h)
| summarize TripCount = count() by bin(ingestion_time(), 1m)
| render timechart
```

That `render timechart` line is the tile's definition — write the
query once in a KQL Queryset, pin it to a dashboard, and it becomes
a live tile.

## Auto-refresh

Every tile on a Real-Time Dashboard can auto-refresh on an interval
you set — 10 seconds, 1 minute, whatever the data's actual arrival
rate justifies. This is the genuine difference from a normal Power
BI report: Direct Lake mode (Lesson 12) still needs a refresh
trigger of some kind, while a Real-Time Dashboard tile just
re-issues its KQL query on a timer against data that's arriving
continuously underneath it.

## Base queries and parameters

A **base query** lets multiple tiles share filter logic — define a
time range or a vendor filter once, and every tile built on top of
it respects it. Dashboard-level parameters (a date-range picker, a
dropdown) let a viewer change what every tile shows without editing
any KQL themselves.

## Cross-filtering between tiles

Clicking a bar in one tile can filter every other tile on the same
dashboard — a KQL-native cross-filter, conceptually similar to
clicking a slicer in Power BI, but happening natively across tiles
whose underlying queries are all hitting the same Eventhouse.

## Real-Time Dashboards vs. Power BI Direct Lake

| | Real-Time Dashboard | Power BI Direct Lake report (Lesson 12) |
|---|---|---|
| Built on | KQL queries directly | A semantic model over Delta Parquet |
| Refresh | Tile-level auto-refresh, seconds if needed | Depends on the Direct Lake framing trigger |
| Best for | Operational, seconds-old monitoring | Business reporting, relationships, measures |

Both read live data with no separate copy step — that part is the
same principle you saw in Lesson 12. The difference is what sits
underneath: a semantic model with relationships and DAX measures,
or a KQL query hitting an Eventhouse directly.

## Key terms

| Term | Meaning |
|---|---|
| Real-Time Dashboard | A Fabric item built from pinned KQL queries, rendered as tiles |
| Base query | Shared filter logic multiple tiles inherit |
| Cross-filtering | Clicking one tile filters the others on the same dashboard |

## Check yourself

You're ready for Lesson 29 when you can explain, without looking: why
does a Real-Time Dashboard tile refresh on a simple timer, while a
Power BI Direct Lake report needs a separate refresh trigger concept?
