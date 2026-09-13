# Script — Staging → Warehouse → Reporting Layers

## Segment 1 (title, code: four schemas)

This lesson gives raw, staging, and business-ready their concrete schema names: raw, staging, warehouse for the star schema itself, and reporting — a fourth schema — for what a BI tool actually connects to, never the fact and dimension tables directly.

## Segment 2 (steps: what lives in each schema)

Raw holds unmodified loaded data. Staging holds typed, deduplicated, quality-checked data. Warehouse holds the star schema, built with SCD1 and SCD2 merges. Reporting holds views joining facts to dimensions, which is what a report author actually queries.

## Segment 3 (code: reporting view example)

A reporting view is usually just the join a BI report would otherwise repeat every time — and filtering for is_current equals true is exactly where Chapter 6's SCD2 pattern pays off, invisibly, to whoever writes the report.

## Segment 4 (code: one pipeline, four schemas)

One order, start to finish: COPY INTO lands it in raw, a CTAS cleans it into staging, a MERGE models it into the warehouse star schema, and a view in reporting exposes it — four schemas, one pipeline.

## Segment 5 (outro: foreshadow RBAC + capstone)

Two things this sets up: Chapter 9's RBAC scopes a role per schema — loaders write raw, transforms write staging and warehouse, reporting is read-only. And this exact four-schema shape is what Chapter 15's capstone asks you to build end-to-end.
