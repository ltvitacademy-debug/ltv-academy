# Script — Conformed Dimensions

## Segment 1 (title)

Every dimension in this chapter has quietly assumed one fact table uses it. This lesson breaks that assumption on purpose.

## Segment 2 (screenshot: one dimension, many fact tables)

A conformed dimension is a single, governed dimension table that multiple fact tables share — even fact tables from completely different business processes. Here, straight from Microsoft's own Fabric documentation, Sales and Inventory are entirely different stars, but they both reference the exact same Date dimension and the exact same Product dimension. That's conforming.

## Segment 3 (steps: why it matters)

Why bother? Because without it, "Product" quietly means something slightly different in every team's version of it. Conforming gives you one governed definition everywhere. It makes drill-across queries possible — comparing Sales and Inventory side by side for the same product, the same date. And it means building and maintaining one dimension table instead of five near-duplicates that drift apart over time.

## Segment 4 (outro)

That closes out Chapter 3. Every dimension you've built so far has assumed its values just sit there, unchanging. Chapter 4 is entirely about what happens when they don't — Slowly Changing Dimensions, starting with the simplest version: Type 0.
