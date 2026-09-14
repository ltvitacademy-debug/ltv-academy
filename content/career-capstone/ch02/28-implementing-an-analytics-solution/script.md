# Script — Implementing and Managing an Analytics Solution

## Segment 1 (title)

Domain 1 is everything that has to exist and be configured correctly before any data moves — workspaces, OneLake, Lakehouses, Warehouses, capacities, Git integration, and security basics.

## Segment 2 (code: the checklist)

Every item on Domain 1's checklist was drilled in Fabric Chapter 1. This lesson re-frames it as exam-answerable facts, not new material.

## Segment 3 (steps: Lakehouse vs Warehouse)

The highest-yield fact in Domain 1 is choosing Lakehouse versus Warehouse. T-SQL, strict schema, a BI tool needing a SQL endpoint — that's Warehouse. Files, Spark, flexible schema, notebooks — that's Lakehouse. Referencing data without copying it is a Shortcut.

## Segment 4 (code: OneLake trap)

OneLake is the most exam-tested gotcha — every Lakehouse and Warehouse in a tenant stores its data in the same OneLake account, in Delta or Parquet, automatically. That's what makes Shortcuts and Direct Lake Mode possible at all.

## Segment 5 (outro)

Capacities and SKUs control cost and performance ceiling; Git-integrated deployment pipelines promote content across dev, test, and prod. Next up: Domain 2 — ingesting and transforming data.
