# Script — Project 1: Transformation and Modeling

## Segment 1 (title)

Silver conforms two differently-shaped sources — POS lines and online order events — into one unified sales_events table, at the grain fixed back in the kickoff.

## Segment 2 (code: the star schema)

Gold applies Lesson 8's star schema directly: one FactSales table at that fixed grain, surrounded by DimStore, DimProduct, and DimDate — the same shape, reused, because the modeling idea doesn't change between projects.

## Segment 3 (code: SCD Type 2 for DimStore)

Stores change region and category mix over time, so DimStore needs history — the same SCD Type 2 pattern from Lesson 8, implemented as a targeted MERGE, not a dimension rewrite.

## Segment 4 (code: why silver, not gold)

Merging channels happens once, in silver, instead of being pushed into every query at gold or dashboard time — the same "transform once, query many times" reasoning behind designing a transformation layer.

## Segment 5 (outro)

A clean FactSales table, ready to query, with store history tracked properly. Next up: building the serving layer and the actual dashboard.
