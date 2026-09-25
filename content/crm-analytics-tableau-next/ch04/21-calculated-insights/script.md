# Script — Calculated Insights

## Segment 1 (title)

Data is ingested, mapped, and unified. The next question is what to measure. Calculated insights are how Data Cloud stores reusable metrics, like lifetime value, so every team calculates them the same way, once.

## Segment 2 (screenshot: four options)

This is the New Calculated Insight screen, with four options. Create with Builder is a visual, node-based editor. Create with SQL is for writing expressions. Create from a Package starts from an installed insight. And Create Streaming Insights computes metrics from real-time sources.

## Segment 3 (screenshot: SQL editor)

The SQL editor gives you a field browser, an expression area, and a Check Syntax button. The template is one you know: SELECT attributes and aggregated measures, FROM a data model object, optional joins and WHERE, then GROUP BY the dimensions. Note the warning at the top: an insight built on personal data can affect privacy compliance.

## Segment 4 (code)

Here's a simplified version. A measure, the sum of order totals, grouped by a dimension, the customer. Exact naming rules for measure and dimension columns are in the current SQL guide, so check them before you build.

## Segment 5 (steps)

Measures are the aggregated values; dimensions set the grain. The result is stored as its own object, computed on a schedule, and reused in segments, Tableau Next, and CRM Analytics.

## Segment 6 (outro)

Next up: segments, which use unified profiles and insights to build audiences.
