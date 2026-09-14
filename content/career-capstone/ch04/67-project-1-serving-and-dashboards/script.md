# Script — Project 1: Serving and Dashboards

## Segment 1 (title)

FactSales is already a well-modeled Delta table, so this project queries it directly through a lakehouse SQL endpoint — no separate warehouse, no data copy, just a straightforward GROUP BY.

## Segment 2 (code: Direct Lake mode)

Fabric's Direct Lake mode reads the Delta table's Parquet files straight into a semantic model — no scheduled import, no per-click DirectQuery round-trip. FactSales becomes the fact, DimStore and DimProduct the dimensions.

## Segment 3 (code: freshness is inherited, not created)

The dashboard is only as fresh as the gold table underneath it. Online sales flow through in minutes; in-store sales land the next morning. That schedule lives in the pipeline, not in the dashboard.

## Segment 4 (code: a separate decision)

Choosing how something reads FactSales is a separate decision from what FactSales looks like. Getting the serving choice wrong doesn't mean redoing the modeling work — that's the whole point of keeping the layers separate.

## Segment 5 (outro)

A dashboard that inherits its freshness honestly, from a pipeline it doesn't control. Next up: hardening this whole system for production.
