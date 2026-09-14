# Script — Project 1 Kickoff: A Real-Time Retail Analytics Platform

## Segment 1 (title)

Project 1: a retail chain wants one dashboard, sales by region and category, fresh enough to catch a bad promotion the same day. Vague on purpose — scoping vague requirements is the skill.

## Segment 2 (code: functional vs non-functional)

Ingest in-store and online sales events, report by region and category. But the non-functional list is where it gets interesting: same-day freshness, survive Black Friday-scale spikes, never lose an event. That rules out nightly batch alone.

## Segment 3 (code: grain first)

Grain first, schema second, from Lesson 8. The grain here is one row per line item per sale, in-store or online — the same grain the medallion architecture carries from bronze to gold.

## Segment 4 (steps: hybrid ingestion)

Nightly POS exports are naturally batch. Online order events are continuous, so they need streaming. That's a deliberate hybrid — Lesson 6's Lambda architecture — both paths landing in the same bronze layer.

## Segment 5 (outro)

Requirements scoped, grain fixed, storage and processing model chosen. Next up: designing the ingestion layer that actually implements this hybrid.
