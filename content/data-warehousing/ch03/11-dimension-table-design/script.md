# Script — Dimension Table Design

## Segment 1 (title)

Chapter 2 was all about fact tables. Now we flip to the other half of a star schema: how do you actually design a dimension table?

## Segment 2 (steps: four kinds of columns)

A well-designed dimension table sorts its columns into four groups. A surrogate key — its own system-generated identifier. A natural key, traceable back to the source system. Descriptive attributes — the text columns you actually filter and group by, like category or region. And, when a dimension relates to another dimension, foreign keys pointing at that other table.

## Segment 3 (steps: wide but short)

Dimension tables break the normalization rule on purpose. If a product belongs to a category, a good DimProduct stores the category name right there on the same row, instead of forcing a join. That's cheap because dimension tables are short — a few thousand rows, not millions — so the redundant storage costs almost nothing. And here's a practical trick: whenever someone says they need to analyze something "by" some property, that's the attribute your dimension table needs.

## Segment 4 (outro)

Every dimension table so far has had a surrogate key sitting quietly on it. Next lesson, we look at exactly why that key exists, and why it's never the natural key.
